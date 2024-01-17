<!-- eslint-disable vue/no-deprecated-filter -->
<template>
  <Form.Item
    :label="label"
    :htmlFor="name"
    :validateStatus="errorMessage ? 'error' : ''"
    :help="errorMessage"
    :labelCol="labelCol"
    class="mb-5"
  >
    <RangePicker
      class="w-full"
      :wrapper-col="wrapperCol"
      :value="rangePickerValue as unknown as [Dayjs, Dayjs] | undefined"
      :disabled="disabled"
      @update:value="(v) => $emit('update:value', v)"
      @blur="(e) => handleBlur(e, true)"
      @change="(e) => handleChange(e, true)"
    />
  </Form.Item>
</template>

<script lang="ts" setup>
import { useField } from 'vee-validate';
import { Form, RangePicker } from 'ant-design-vue';
import { computed } from 'vue';
import type { Dayjs } from 'dayjs';
import type { IColType } from '@/types/common';
import dayjs from 'dayjs';

interface IProps {
  // value: any;
  label?: string;
  name: string;
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
const emit = defineEmits<IEmits>();

const { errorMessage, value, handleBlur, handleChange } = useField(() => props.name, undefined, {
  validateOnValueUpdate: false,
  syncVModel: true,
});
const dateFormat = 'YYYY-MM-DD';

const rangePickerValue = computed({
  get: () => {
    if (value.value) {
      return dayjs(value.value as string, dateFormat);
    }
    return [];
  },
  set: (newValue) => {
    console.log('newValue ', newValue);
    emit('update:value', newValue);
  },
});
</script>
