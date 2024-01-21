<template>
  <div class="flex flex-col justify-center bg-slate-200 rounded-md">
    <RButton @click="onClickReaction(1)" class="w-[32px] h-[32px] flex items-center justify-center">
      <PlusOutlined />
    </RButton>
    <div class="my-2 text-sm w-[32px] h-[32px] flex items-center justify-center">{{ score }}</div>
    <RButton
      @click="onClickReaction(-1)"
      class="w-[32px] h-[32px] flex items-center justify-center"
    >
      <MinusOutlined />
    </RButton>
  </div>
</template>

<script setup lang="ts">
import { PlusOutlined, MinusOutlined } from '@ant-design/icons-vue';
import { useCommentsStore } from '@/stores/comments';

const commentsStore = useCommentsStore();

interface IProps {
  score: number;
  commentId: number;
}

const props = defineProps<IProps>();

const onClickReaction = (value: number) => {
  commentsStore.updateScore(props.commentId, props.score + value);
};
</script>
