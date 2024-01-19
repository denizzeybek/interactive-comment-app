<template>
  <div class="flex flex-col justify-center bg-slate-200 rounded-md">
    <RButton class="w-[32px] h-[32px] flex items-center justify-center">
      <PlusOutlined />
    </RButton>
    <div class="my-2 text-sm w-[32px] h-[32px] flex items-center justify-center">{{ score }}</div>
    <RButton class="w-[32px] h-[32px] flex items-center justify-center">
      <MinusOutlined />
    </RButton>
  </div>
</template>

<script setup lang="ts">
import { PlusOutlined, MinusOutlined } from '@ant-design/icons-vue';

interface IProps {
  score: number;
}

defineProps<IProps>();
</script>
