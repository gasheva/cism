import {createStore} from 'vuex';
import cism from '@/services/cism.api';
import {User} from '@/interfaces/user';
import {ActionContext} from 'vuex';

interface RequestCallback {
    callback: Function,
    params: Object,
}

interface State {
    user: User | undefined,
    isRequestProcess: boolean,
    token: string | null,
}

export default createStore({
    state: {
        user: undefined,
        isRequestProcess: false,
        token: null,
    } as State,

    getters: {
        isAuth: (state) => Boolean(state.token?.length),
        getToken: (state) => state.token,
        getIsRequestProcess: state => state.isRequestProcess,
        getUser: state => state.user,
    },

    mutations: {
        setToken(state: State, token: string) {
            state.token = token;
        },
        clearToken(state: State) {
            state.token = null;
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
            try {
                return await callback.callback(callback.params);
            } catch (error) {
                return error;
            } finally {
                context.commit('setIsRequestProcess', false);
            }
        }
    },
});
