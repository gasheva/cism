<template>
    <form @click.prevent class="sign-form">
        <h2 class="sign-form_header">авторизация</h2>
        <app-input class="sign-form_input" label="email" type="email" v-model:value="email"/>
        <app-input class="sign-form_input" label="пароль" type="password" v-model:value="password"/>
        <span class="sign-form_error">{{ error }}</span>
        <app-button class="sign-form_button" type="submit" label="войти" @click="sign">sign</app-button>
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
import {ref} from 'vue';
import AppButton from '@/components/UI/AppButton.vue';

const store = useStore();

const email = ref<string>('');
const password = ref<string>('');
const error = ref<string>('');


const sign = async () => {
    const mockUser = {email: 'test@test.com', password: '123456'};
    await store.dispatch('login', mockUser);
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
    font-weight: 600;
    font-size: $font-bg;
    line-height: 140%;
    text-transform: uppercase;
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
    margin-top: 36px;
  }
}
</style>