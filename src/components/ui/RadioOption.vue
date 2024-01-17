<template>
  <Radio :id="id" :name="name" :value="value" @change="handleChange" :checked="checked">{{
    label
  }}</Radio>
</template>

<script setup lang="ts">
import { Radio } from 'ant-design-vue';
import { useField } from 'vee-validate';

export interface IProps {
  id: string;
  name: string;
  label: string;
  value: string | number | boolean;
}

const { id, name, label, value } = defineProps<IProps>();

const { checked, handleChange } = useField(() => name, undefined, {
  type: 'radio',
  checkedValue: value
});
</script>
