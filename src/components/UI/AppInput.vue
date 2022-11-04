<template>
    <div class="input">
        <label :for="id" v-if="label" class="input_label">{{ label }}</label>
        <input :id="id"
               class="input_input"
               :class="{'input_input__invalid': !isValid}"
               :placeholder="placeholder"
               :type="type"
               :disabled="isDisabled"
               v-model="valueDisplayed">
    </div>
</template>

<script lang="ts">
export default {
    name: 'AppInput'
};
</script>
<script lang="ts" setup>

import {computed} from 'vue';
import {generateId} from '@/utils/utils';

const props = defineProps({
    value: {type: String, default: ''},
    label: {type: String, default: ''},
    placeholder: {type: String, default: ''},
    type: {
        type: String,
        default: 'text',
        validator: (val: string) => {
            const values = new Set(['text', 'password', 'email']);
            return values.has(val);
        }
    },
    isDisabled: {type: Boolean, default: false},
    isValid: {type: Boolean, default: true},
});
const emit = defineEmits(['update:value']);

const id = generateId();

const valueDisplayed = computed({
    get: (): string => props.value,
    set: (val): void => emit('update:value', val),
});


</script>

<style lang="scss" scoped>
.input {
  display: flex;
  flex-direction: column;

  &_label {
    line-height: 24px;
    letter-spacing: 0.25px;
    color: $dark;
    text-transform: capitalize;
  }

  &_input {
    border: 1.5px solid $gray-200;
    border-radius: 8px;
    padding: 16px 24px;
    background: white;
    line-height: 17px;
    color: $secondary;

    &:focus {
      box-shadow: inset 0 0 3px 0 $blue-500;
    }

    &__invalid {
      border-color: $danger;

      &:focus {
        box-shadow: inset 0 0 3px 0 $danger;
      }
    }
  }
}
</style>