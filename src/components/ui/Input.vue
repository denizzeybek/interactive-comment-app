<template>
  <Form.Item
    :label="label"
    :htmlFor="name"
    :validateStatus="errorMessage ? 'error' : ''"
    :help="errorMessage"
    :labelCol="labelCol"
    class="mb-5"
    
  >
    <component
      :wrapper-col="wrapperCol"
      :is="type === 'password' ? InputPassword : Input"
      :id="name"
      :name="name"
      v-on="validationListeners"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      :disabled="disabled"
      :autocomplete="autocomplete"
      :addon-after="addonAfter"
      :step="step"
      :allowClear="allowClear"
    />
  </Form.Item>
</template>

<script lang="ts" setup>
import { type InputHTMLAttributes } from 'vue';
import { useField } from 'vee-validate';
import { Form, Input, type InputProps, InputPassword } from 'ant-design-vue';
import type { IColType } from '@/types/common';


export interface IProps {
  label?: string;
  name: string;
  placeholder?: string;
  type?: InputProps['type'];
  disabled?: boolean;
  autocomplete?: InputHTMLAttributes['autocomplete'];
  modelValue?: string | number;
  step?: string;
  addonAfter?: string;
  allowClear?: boolean;
  labelCol?: IColType;
  wrapperCol?: IColType;
}

const props = withDefaults(defineProps<IProps>(), {
  type: 'text',
  disabled: false,
  allowClear: false,
  labelCol: () => ({ span: 7 }),
  wrapperCol: () => ({ span: 17 }),
});

const { errorMessage, value, handleBlur, handleChange } = useField<string | number>(
  () => props.name,
  undefined,
  {
    validateOnValueUpdate: false,
    syncVModel: true,
  },
);

const validationListeners = {
  blur: (e: InputEvent) => handleBlur(e, true),
  change: handleChange,
  input: (e: InputEvent) => handleChange(e, !!errorMessage.value),
};
</script>
