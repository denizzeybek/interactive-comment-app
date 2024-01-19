<template>
  <div class="mb-6" v-for="comment in commentsStore.list" :key="comment.id">
    <Comment :comment="comment" :current-user="currentUser" />
  </div>
  <NewCommentEditor @onSubmit="onNewSubmit($event)" :current-user="currentUser" :isSubmit="true"/>
</template>

<script setup lang="ts">
import NewCommentEditor from './NewCommentEditor.vue';
import Comment from './Comment/Comment.vue';
import { onMounted, computed } from 'vue';
import { useCommentsStore } from '@/stores/comments';
import { useUserStore } from '@/stores/user';
import type { User } from '@/stores/user';

const commentsStore = useCommentsStore();
const userStore = useUserStore();
onMounted(() => {
  commentsStore.fetchComments();
  userStore.fetchCurrentUser();
});

const currentUser = computed(() => userStore.currentUser as User);

const onNewSubmit = (val: string) => {
  console.log('val ', val);
};
</script>
