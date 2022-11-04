<template>
    <form @click.prevent class="sign-form">
        <h2 class="sign-form_header logo">авторизация</h2>
        <app-input class="sign-form_input" label="email" type="email"
                   :is-valid="emailValid"
                   :is-disabled="isRequestProcess"
                   v-model:value="email"/>
        <app-input class="sign-form_input" label="пароль" type="password"
                   :is-valid="passwordValid"
                   :is-disabled="isRequestProcess"
                   v-model:value="password"/>
        <span class="sign-form_error">{{ error }}</span>
        <app-button v-show="!isRequestProcess" class="sign-form_button" type="submit" label="войти"
                    :is-disabled="isRequestProcess"
                    bold
                    @click="sign"/>
        <app-spinner class="sign-form_spinner" v-show="isRequestProcess"/>
    </form>
</template>

<script lang="ts">
export default {
    name: 'AppSign'
};
</script>
<script lang="ts" setup>
import {useStore} from 'vuex';
import AppInput from '@/components/UI/AppInput.vue';
import {computed, ref, unref, watch} from 'vue';
import AppButton from '@/components/UI/AppButton.vue';
import {useRouter} from 'vue-router';
import AppSpinner from '@/components/UI/AppSpinner.vue';
import {RejectedRequest} from '@/interfaces/rejectedRequest';

const store = useStore();
const router = useRouter();

const isRequestProcess = computed(() => {
    return store.getters.getIsRequestProcess;
});
const email = ref<string>('');
const emailValid = ref<boolean>(true);
const password = ref<string>('');
const passwordValid = ref<boolean>(true);
const error = ref<string>('');

watch([email, password], () => {
    const clearError = () => {
        error.value = '';
        emailValid.value = passwordValid.value = true;
    };
    clearError();
});


const sign = async () => {
    const res: RejectedRequest | undefined = await store.dispatch('login', {email: unref(email), password: unref(password)});
    if (res?.failed) {
        error.value = res.error;
        emailValid.value = passwordValid.value = false;
    }
    await router.push({name: 'home'});
};


</script>


<style lang="scss" scoped>
@import "src/assets/scss/_mixins.scss";

.sign-form {
  @include form-border;
  width: 548px;
  height: 414px;
  padding: 28px;

  &_header {
    margin-bottom: 38px;
  }

  &_input {
    margin-bottom: 10px;
  }

  &_error {
    display: block;
    margin-top: 15px;
    font-weight: 400;
    line-height: 24px;
    height: 24px;
    letter-spacing: 0.25px;
    color: $danger;
  }

  &_button {
    height: 50px;
    margin-top: 36px;
  }

  &_spinner {
    margin: auto;
  }
}
</style>