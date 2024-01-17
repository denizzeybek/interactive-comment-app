<template>
  <div class="w-full h-full flex items-center justify-center flex-col">
    <Spin v-if="!noSpin"/>
    <Empty v-if="!noEmpty"/>
  </div>
</template>

<script lang="ts" setup>
import { Empty, Spin } from 'ant-design-vue';

interface IProps {
  noSpin?: boolean;
  noEmpty?: boolean;
}
const { noSpin, noEmpty } = defineProps<IProps>();
</script>
