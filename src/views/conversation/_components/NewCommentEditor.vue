<template>
  <div
    :class="[props.editData ? '' : 'mt-6']"
    class="flex items-start gap-4 bg-white p-3 rounded-md"
  >
    <div v-if="!editData">
      <img :src="currentUser.image?.png" :alt="currentUser.username" />
    </div>
    <RTextarea name="editor" v-model="localText" placeholder="Add a comment..." class="grow" />
    <RButton @click="onComment" variant="primary">{{ buttonText }}</RButton>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { User } from '@/stores/user';
import type { Comment } from '@/stores/comments';

interface IProps {
  commentId?: number;
  parentCommentId?: number;
  currentUser: User;
  isSubmit: boolean;
  editData?: string;
}

interface IEmits {
  (event: 'onSubmit', value: any): void;
  (event: 'onReply', value: boolean): void;
}

const props = withDefaults(defineProps<IProps>(), {
  isSubmit: false,
});
const emit = defineEmits<IEmits>();

const localText = ref(props?.editData || '');

const buttonText = computed(() => {
  if (props.isSubmit) {
    return 'Submit';
  } else if (props.editData) {
    return 'Update';
  }
  return 'Reply';
});

const onComment = () => {
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  let payload: Comment = {
    id: Math.floor(Math.random() * 1000),
    content: localText.value,
    createdAt: today.toDateString(),
    score: 0,
    user: props.currentUser,
    replies: [],
  };

  if (props.commentId) {
    // this is edit
    emit('onSubmit', { id: props.commentId, content: localText.value });
  } else if (props.parentCommentId) {
    // this is reply
    emit('onSubmit', { id: props.parentCommentId, payload: payload });
  } else {
    // this is new comment
    emit('onSubmit', payload);
  }
  localText.value = '';
};
</script>
