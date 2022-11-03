<template>
    <div class="sign-page">
        <h1 class="sign-page_header">{{ appName }}</h1>
        <app-sign/>
    </div>
</template>

<script lang="ts">
export default {
    name: 'SignView'
};
</script>
<script lang="ts" setup>
import AppSign from '@/components/AppSign.vue';

const appName = process.env.VUE_APP_NAME;

</script>

<style lang="scss" scoped>
.sign-page {
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  padding-top: 84px;

  &_header {
    margin-bottom: 45px;
    font-weight: 700;
    font-size: 32px;
    line-height: 39px;
  }
}
</style>