<template>
    <button class="button"
            :class="[ bold?'button__bold':'', `button__${buttonType}`]"
            @click="click">{{ label }}</button>
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
    bold: {type: Boolean, default: false},
    buttonType: {
        type: String, default: 'info',
        validator: (val: string) => {
            const values = new Set(['info', 'danger']);
            return values.has(val);
        }
    }
});

const emit = defineEmits(['click']);

const click = () => !props.isDisabled && emit('click');
</script>

<style lang="scss" scoped>
.button {
  width: 100%;
  border: 1px solid #0D6EFD;
  border-radius: 8px;

  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: $blue-500;
  text-transform: capitalize;

  &:hover{
    background: #0D6EFD;
    color: white;
  }

  &__bold {
    font-weight: 700;
  }

  &__danger{
    border-color: $danger;
    color: $danger;

    &:hover{
      background: $danger;
      color: white;
    }
  }
}
</style>