<template>
    <div>sign

        <button @click="sign">sign</button>
    </div>
</template>

<script lang="ts">
export default {
    name: "SignView"
}
</script>
<script lang="ts" setup>
import {useStore} from 'vuex';

const store = useStore();
const sign = async ()=>{
    const mockUser = {email: 'test@test.com', password: '123456'};
    await store.dispatch('login', mockUser)
}
</script>

<style scoped>

</style>