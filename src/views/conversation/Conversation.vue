<template>
  <div class="mb-6" v-for="comment in commentsStore.list" :key="comment.id">
    <Comment :comment="comment" :current-user="currentUser" />
  </div>
  <NewCommentEditor :current-user="currentUser" :isSubmit="true" @onSubmit="onNewSubmit($event)" />
</template>

<script setup lang="ts">
import NewCommentEditor from './_components/NewCommentEditor.vue';
import Comment from './_components/comment/Comment.vue';
import { onMounted, computed } from 'vue';
import { useCommentsStore } from '@/stores/comments';
import { useUserStore } from '@/stores/user';
import type { User } from '@/stores/user';
import type { Comment as TComment } from '@/stores/comments';

const commentsStore = useCommentsStore();
const userStore = useUserStore();

onMounted(() => {
  commentsStore.fetchComments();
  userStore.fetchCurrentUser();
});

const currentUser = computed(() => userStore.currentUser as User);

const onNewSubmit = (payload: TComment) => {
  commentsStore.addNewComment(payload);
};
</script>
