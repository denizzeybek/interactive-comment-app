<template>
  <div class="text-sm">
    <span v-if="replyingTo" class="font-bold text-indigo-500"> {{ `@${replyingTo} ` }}</span> {{ content }}
  </div>
</template>

<script setup lang="ts">
interface IProps {
  content: string;
  replyingTo?: string;
}

defineProps<IProps>();
</script>
