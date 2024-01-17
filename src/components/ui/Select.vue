<template>
  <Form.Item
    :label="label"
    :htmlFor="name"
    :validateStatus="errorMessage ? 'error' : ''"
    :help="errorMessage"
    :labelCol="labelCol"
    class="mb-5"
  >
    <AntSelect
      v-model:value="value"
      :wrapper-col="wrapperCol"
      :options="options"
      :placeholder="placeholder"
      style="customStyle"
      v-on="validationListeners"
      @change="onSelect($event)"
    />
    <!-- v-on="validationListeners" -->
  </Form.Item>
</template>

<script lang="ts" setup>
import { useField } from 'vee-validate';
import { Form, Select as AntSelect } from 'ant-design-vue';
import type { IColType } from '@/types/common';

export interface IProps {
  options: any[];
  label?: string;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  modelValue?: string | number;
  step?: string;
  defaultValue?: string;
  labelCol?: IColType;
  wrapperCol?: IColType;
  customStyle?: any;
}

const props = withDefaults(defineProps<IProps>(), {
  disabled: false,
  labelCol: () => ({ span: 7 }),
  wrapperCol: () => ({ span: 17 }),
  customStyle: () => ({ width: '100%' }),
});

const { errorMessage, value, handleBlur, handleChange } = useField<string | number>(
  () => props.name,
  undefined,
  {
    validateOnValueUpdate: false,
    syncVModel: true,
  },
);

interface IEmits {
  (event: 'selected', value: any): void;
}
const emit = defineEmits<IEmits>();

const validationListeners = {
  blur: (e: InputEvent) => handleBlur(e, true),
  select: (e: InputEvent) => handleChange(e, !!errorMessage.value),
};

const onSelect = (e: any) => {
  emit('selected', e);
};
</script>
