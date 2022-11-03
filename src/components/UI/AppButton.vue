<template>
    <button class="button" @click="click">{{ label }}</button>
</template>

<script lang="ts">
export default {
    name: 'AppButton'
};
</script>
<script lang="ts" setup>
const props = defineProps({
    label: {type: String, default: ''},
    isDisabled: {type: Boolean, default: false},
});

const emit = defineEmits(['click']);

const click = () => !props.isDisabled && emit('click');
</script>

<style lang="scss" scoped>
.button {
  width: 100%;
  padding: 20px 32px;
  border: 1px solid #0D6EFD;
  border-radius: 8px;

  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: $blue-500;
  text-transform: capitalize;
}
</style>