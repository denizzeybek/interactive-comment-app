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
import { useCommentsStore } from '@/stores/comments';
import type { Comment } from '@/stores/comments';
const commentStore = useCommentsStore();
interface IProps {
  commentId?: number;
  parentCommentId?: number;
  currentUser: User;
  isSubmit: boolean;
  editData?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  isSubmit: false,
});

interface IEmits {
  (event: 'onSubmit', value: any): void;
  (event: 'onReply', value: boolean): void;
}

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

const onComment = async () => {
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
    // bu bir edittir
  } else if (props.parentCommentId) {
    console.log('props.parentCommentId ', props.parentCommentId);
    // bu bir replydir
    // parentId'si 2 olan commentin listesine push et
    // parentid si 2 olanın commentini put et
    const currentComment = await commentStore.getCommentById(props.parentCommentId);
    const { id, replies } = currentComment;
    if (replies && replies.length) {
      const commentsReplies:Comment[] = replies.slice();
      commentsReplies.push(payload);
      console.log('commentsReplies ', commentsReplies);
      payload = {...currentComment, replies: commentsReplies}
    } else {
      payload = {...currentComment, replies: [payload] }
    }
    console.log('new payload ', payload);
    emit('onReply', false)
    // commentStore.addNewReply(payload, id);
  } else {
    // bu yeni bir commentdir

    await commentStore.addNewComment(payload);
    await commentStore.fetchComments();
  }
};
</script>
