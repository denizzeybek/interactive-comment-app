<template>
  <div class="flex items-start gap-4 bg-white p-3 rounded-md">
    <CommentReaction :score="comment?.score" />
    <div class="flex flex-col gap-2 flex-1">
      <CommentHeader
        :current-user="currentUser"
        :comment="comment"
        @onDelete="onDelete($event)"
        @onEdit="onEdit($event)"
        @onReply="onReply($event)"
      />
      <NewCommentEditor
        v-if="isEditing"
        :comment-id="comment.id"
        :editData="editData"
        :current-user="currentUser"
        @onSubmit="onEditSubmit($event)"
      />
      <CommentBody v-else :content="comment?.content" :replyingTo="comment.replyingTo" />
    </div>
  </div>
  <div v-for="(reply, index) in comment?.replies" :key="index" class="replies">
    <Comment v-if="comment?.replies" :comment="reply" :current-user="currentUser" />
  </div>
  <NewCommentEditor
    v-if="isReplying"
    :parent-comment-id="comment.id"
    :current-user="currentUser"
    @onSubmit="onReplySubmit($event)"
    @onReply="onReply($event)"
  />
</template>

<script lang="ts">
export default {
  name: 'Comment',
};
</script>

<script setup lang="ts">
import type { Comment } from '@/stores/comments';
import { useCommentsStore } from '@/stores/comments';
import type { User } from '@/stores/user';
import CommentReaction from './CommentReaction.vue';
import CommentHeader from './CommentHeader.vue';
import CommentBody from './CommentBody.vue';
import NewCommentEditor from '../NewCommentEditor.vue';
import { ref } from 'vue';

interface IProps {
  comment: Comment;
  currentUser: User;
}

type TReplyData = {
  id: number;
  payload: Comment;
};

type TEditData = {
  id: number;
  content: string;
};

const props = defineProps<IProps>();
const commentsStore = useCommentsStore();

const isReplying = ref(false);
const isEditing = ref(false);
const editData = ref('');

const onEdit = (val: boolean) => {
  isEditing.value = val;
  editData.value = props.comment.content;
};

const onReply = (val: boolean) => {
  isReplying.value = val;
};

const onEditSubmit = (data: TEditData) => {
  const { id, content } = data;
  commentsStore.updateReply(id, content);
  isEditing.value = false;
};

const onReplySubmit = (data: TReplyData) => {
  const { id, payload } = data;
  commentsStore.addNewReply(id, payload);
  isReplying.value = false;
};

const onDelete = (id: number) => {
  commentsStore.deleteComment(id);
};
</script>

<style scoped lang="scss">
.replies {
  gap: 16px;
  display: flex;
  flex-direction: column;
  margin-left: 72px;
  position: relative;
  margin-top: 24px;
  margin-bottom: 24px;
  &::before {
    position: absolute;
    left: -38px;
    top: -12px;
    bottom: -12px;
    content: '';
    width: 3px;
    background-color: rgb(226 232 240);
  }
  &:last-child {
    &::before {
      bottom: 0;
    }
  }
  &:first-child:last-child {
    &::before {
      top: 0;
    }
  }
}
</style>
