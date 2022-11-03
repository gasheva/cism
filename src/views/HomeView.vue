<template>
    <div class="home-page">
        <header class="home-page_header">
            <h1 class="home-page_username logo">{{ appName }}</h1>
            <span class="home-page_username">{{ userName }}</span>
        </header>
        <app-home/>
    </div>
</template>

<script lang="ts">
export default {
    name: 'HomeView'
};
</script>
<script setup lang="ts">
import AppHome from '@/components/AppHome.vue';
import {useStore} from 'vuex';

const store = useStore();

const appName = process.env.VUE_APP_NAME;
const userName = store.getters.getUser.email;

</script>

<style lang="scss" scoped>
.home-page {
  &_header {
    display: flex;
    justify-content: space-between;
  }
}
</style>