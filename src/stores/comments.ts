import { defineStore } from 'pinia';
import { EStoreNames } from '@/constants/storeNames';
import type { User } from './user';
import { comments } from '@/mocks/db.json';

export type Comment = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  replyingTo?: string;
  user: User;
  replies?: Comment[];
};

interface State {
  list: Comment[];
  comment: Comment | undefined;
}

const updateComment = (
  comments: Comment[],
  parentId: number,
  type: 'deleteComment' | 'updateContent' | 'updateScore' | 'addReply',
  value?: number | string | Comment | null,
) => {
  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];

    if (comment.id === parentId) {
      if (type === 'deleteComment') {
        // delete comment
        comments.splice(i, 1);
      } else if (type === 'updateContent') {
        // update comment content
        comment.content = value as string;
      } else if (type === 'updateScore') {
        // update comment score
        comment.score = value as number;
      } else {
        // add new reply
        if (comment.replies) comment.replies.push(value as Comment);
      }
      return true; // Reply added successfully
    }

    // Check replies recursively
    if (comment.replies && comment.replies.length > 0) {
      const updatedComment = updateComment(comment.replies, parentId, type, value);
      if (updatedComment) {
        return true; // Reply added in the replies
      }
    }
  }

  return false; // Parent comment not found
};

export const useCommentsStore = defineStore(EStoreNames.COMMENTS, {
  state: (): State => ({
    list: [],
    comment: undefined,
  }),
  actions: {
    fetchComments() {
      this.list = comments as unknown as Comment[];
    },
    addNewComment(payload: Comment) {
      this.list.push(payload);
    },
    addNewReply(parentId: number, newComment: Comment) {
      updateComment(this.list, parentId, 'addReply', newComment);
    },
    updateReply(commentId: number, content: string) {
      updateComment(this.list, commentId, 'updateContent', content);
    },
    deleteComment(commentId: number): void {
      updateComment(this.list, commentId, 'deleteComment');
    },
    updateScore(commentId: number, value: number): void {
      updateComment(this.list, commentId, 'updateScore', value);
    },
  },
});
