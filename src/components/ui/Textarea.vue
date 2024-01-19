<template>
  <Form.Item
    :label="label"
    :htmlFor="name"
    :validateStatus="errorMessage ? 'error' : ''"
    :help="errorMessage"
    :labelCol="labelCol"
    class="mb-5"
    
  >
    <Textarea
      :wrapper-col="wrapperCol"
      :id="name"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      :rows="rows"
      :disabled="disabled"
      :autocomplete="autocomplete"
      :allowClear="allowClear"
      v-on="validationListeners"
      />
  </Form.Item>
</template>

<script lang="ts" setup>
import { type InputHTMLAttributes } from 'vue';
import { useField } from 'vee-validate';
import { Form, type InputProps, Textarea } from 'ant-design-vue';
import type { IColType } from '@/types/common';


export interface IProps {
  label?: string;
  name: string;
  placeholder?: string;
  type?: InputProps['type'];
  disabled?: boolean;
  rows?: number;
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
  rows: 4,
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
  change: handleChange,
  input: (e: InputEvent) => handleChange(e, !!errorMessage.value),
};
</script>
