import { defineStore } from 'pinia';
import { EStoreNames } from '@/constants/storeNames';
import type { User } from './user';
import axios from 'axios';

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

const removeCommentById = (comments: Comment[], commentId: number) => {
  for (let i = comments.length - 1; i >= 0; i--) {
    const comment = comments[i];

    if (comment.id === commentId) {
      // Remove the comment from the array
      comments.splice(i, 1);
      return true; // Comment found and removed
    }

    // Check replies recursively
    if (comment.replies && comment.replies.length > 0) {
      const commentRemoved = removeCommentById(comment.replies, commentId);
      if (commentRemoved) {
        return true; // Comment found and removed in the replies
      }
    }
  }

  return false; // Comment not found
};

const updateContentById = (comments: Comment[], commentId: number, newContent: string) => {
  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];

    if (comment.id === commentId) {
      // Replace the content of the comment
      comment.content = newContent;
      return true; // Comment found and content replaced
    }

    // Check replies recursively
    if (comment.replies && comment.replies.length > 0) {
      const commentReplaced = updateContentById(comment.replies, commentId, newContent);
      if (commentReplaced) {
        return true; // Comment found and content replaced in the replies
      }
    }
  }

  return false; // Comment not found
};

const addReplyToCommentById = (comments: Comment[], parentId: number, newReply: Comment) => {
  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];

    if (comment.id === parentId) {
      // Add the new reply to the parent comment's replies array
      console.log('comment ', comment);
      if (comment.replies) comment.replies.push(newReply);
      return true; // Reply added successfully
    }

    // Check replies recursively
    if (comment.replies && comment.replies.length > 0) {
      const replyAdded = addReplyToCommentById(comment.replies, parentId, newReply);
      if (replyAdded) {
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
      return new Promise((resolve, reject) => {
        axios
          .get<Comment[]>('/comments')
          .then((response) => {
            this.list = response.data;
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getCommentById(id: number) {
      const commentList = this.list;
      return new Promise<Comment>((resolve, reject) => {
        try {
          let res = commentList.find((comment) => comment.id === id) as Comment;
          if (!res) {
            commentList.some((comment: Comment) => {
              res = comment.replies?.find((reply) => reply.id === id) as Comment;
              return res !== undefined;
            });
          }
          resolve(res);
        } catch (error) {
          reject(error);
        }
      });
    },
    addNewComment(payload: Comment) {
      return new Promise((resolve, reject) => {
        axios
          .post('/comments', payload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    addNewReply(parentId: number, newComment: Comment) {
      addReplyToCommentById(this.list, parentId, newComment);
    },
    updateReply(id: number, content: string) {
      updateContentById(this.list, id, content);
    },
    deleteComment(commentId: number): void {
      removeCommentById(this.list, commentId);
    },
  },
});
