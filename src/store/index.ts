import {Action, createStore} from 'vuex';
import cism from '@/services/cism.api';
import {User} from '@/interfaces/user';
import {ActionContext} from 'vuex';

const LS_TOKEN_FIELD_NAME = 'cism_token';

interface RequestCallback {
    callback: Function,
    params: Object,
}

interface State {
    user: User | undefined,
    isRequestProcess: boolean,
}

export default createStore({
    state: {
        user: undefined,
        isRequestProcess: false,
    } as State,

    getters: {
        isAuth: (_: State, getters: any) => Boolean(getters.getToken?.length),
        getToken: () => localStorage.getItem(LS_TOKEN_FIELD_NAME),
        getIsRequestProcess: state => state.isRequestProcess,
        getUser: state => state.user,
    },

    mutations: {
        setToken(state: State, token: string) {
            localStorage.setItem(LS_TOKEN_FIELD_NAME, token);
        },
        clearToken() {
            localStorage.removeItem(LS_TOKEN_FIELD_NAME);
        },
        setIsRequestProcess(state: State, isRequestProcess: boolean) {
            state.isRequestProcess = isRequestProcess;
        },
        setUser(state: State, user: User) {
            state.user = user;
        },
    },

    actions: {
        async login({commit, dispatch}: ActionContext<State, State>, credits: User): Promise<void> {
            const login = async (_credits: User) => {
                const resp = await cism.post('/user/auth', _credits);
                commit('setUser', _credits);
                commit('setToken', resp.data.token);
            };

            return await dispatch('requestWrapper', {callback: login, params: credits});
        },

        logout({commit}: { commit: Function }): void {
            commit('clearToken');
        },

        async requestWrapper(context: ActionContext<State, State>, callback: RequestCallback): Promise<any> {
            context.commit('setIsRequestProcess', true);
            try{
                return await callback.callback(callback.params);
            } catch(error){
                return error;
            } finally {
                context.commit('setIsRequestProcess', false);
            }
        }
    },
});
