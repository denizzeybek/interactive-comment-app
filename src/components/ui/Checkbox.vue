<!-- eslint-disable vue/no-deprecated-filter -->
<template>
  <Form.Item
    :htmlFor="name"
    :validateStatus="errorMessage ? 'error' : ''"
    :help="errorMessage"
    :labelCol="labelCol"
  >
    <Checkbox
      :wrapper-col="wrapperCol"
      :value="value"
      :disabled="disabled"
      :id="name"
      :name="name"
      @update:value="(v) => $emit('update:value', v)"
      @blur="(e) => handleBlur(e, true)"
      @change="(e) => handleChange(e, true)"
    >
      {{ label }}
    </Checkbox>
  </Form.Item>
</template>

<script lang="ts" setup>
import { useField } from 'vee-validate';
import { Form, Checkbox } from 'ant-design-vue';
import type { IColType } from '@/types/common';

interface IProps {
  // value: boolean;
  label?: string;
  name?: string;
  modelValue?: any;
  disabled?: boolean;
  defaultValue?: string;
  labelCol?: IColType;
  wrapperCol?: IColType;
}

interface IEmits {
  (event: 'update:value', value: any): void;
}

const props = withDefaults(defineProps<IProps>(), {
  labelCol: () => ({ span: 7 }),
  wrapperCol: () => ({ span: 17 }),
});

defineEmits<IEmits>();

const { errorMessage, value, handleBlur, handleChange } = useField(
  () => props.name || '',
  undefined,
  {
    validateOnValueUpdate: false,
    syncVModel: true,
  },
);
</script>
