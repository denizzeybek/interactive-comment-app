<template>
  <div class="flex items-start gap-4 bg-white p-3 rounded-md">
    <div class="flex flex-col justify-center items-center h-full mt-10">
      <RButton v-if="comment?.replies?.length" @click="toggleReplies" variant="primary">
        <UpOutlined class="button-icon" :class="[showReplies ? 'active' : '']" />
      </RButton>
      <div v-else class="w-[26px] h-[30px]"></div>
    </div>
    <CommentReaction :comment-id="comment.id" :score="comment?.score" />
    <div class="flex flex-col gap-2 flex-1">
      <CommentHeader
        :current-user="currentUser"
        :comment="comment"
        @on-delete="onDelete($event)"
        @on-edit="onEdit($event)"
        @on-reply="onReply($event)"
      />
      <NewCommentEditor
        v-if="isEditing"
        :comment-id="comment.id"
        :edit-data="editData"
        :current-user="currentUser"
        @on-submit="onEditSubmit($event)"
      />
      <CommentBody v-else :content="comment?.content" :replying-to="comment.replyingTo" />
    </div>
  </div>
  <TransitionGroup name="fade-in" mode="out-in">
    <template v-if="showReplies">
      <div v-for="(reply, index) in comment?.replies" :key="index" class="replies">
        <Comment v-if="comment?.replies" :comment="reply" :current-user="currentUser" />
      </div>
    </template>
  </TransitionGroup>
  <NewCommentEditor
    v-if="isReplying"
    :parent-comment-id="comment.id"
    :current-user="currentUser"
    @onSubmit="onReplySubmit($event)"
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
import { UpOutlined } from '@ant-design/icons-vue';

interface IProps {
  comment: Comment;
  currentUser: User;
}

const props = defineProps<IProps>();
const commentsStore = useCommentsStore();

const isReplying = ref(false);
const isEditing = ref(false);
const editData = ref('');
const showReplies = ref(true);

const onEdit = (val: boolean) => {
  isEditing.value = val;
  editData.value = props.comment.content;
};

const onReply = (val: boolean) => {
  isReplying.value = val;
};

const onEditSubmit = (data: { id: number; content: string }) => {
  const { id, content } = data;
  commentsStore.updateReply(id, content);
  isEditing.value = false;
};

const onReplySubmit = (data: { id: number; payload: Comment }) => {
  const { id, payload } = data;
  commentsStore.addNewReply(id, payload);
  isReplying.value = false;
};

const onDelete = (id: number) => {
  commentsStore.deleteComment(id);
};

const toggleReplies = () => {
  showReplies.value = !showReplies.value;
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

@media (max-width: 768px) {
  .replies {
    gap: 16px;
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    position: relative;
    margin-top: 24px;
    margin-bottom: 24px;
    &::before {
      position: absolute;
      left: -10px;
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
}

.button-icon {
  transition: transform 0.3s ease;
  &.active {
    transform: rotate(180deg);
  }
}

.fade-in-enter-active {
  transition: all 0.3s ease;
}

.fade-in-leave-active {
  transition: all 0.3s ease;
}

.fade-in-enter,
.fade-in-leave-to {
  opacity: 0;
}
</style>
