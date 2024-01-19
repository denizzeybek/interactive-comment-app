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
    addNewReply(data: Comment, id: number) {
      return new Promise((resolve, reject) => {
        axios
          .put(`/comments/${id}`, data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    updateReply(id: number, data: Comment) {
      return new Promise((resolve, reject) => {
        axios
          .put(`/comments/${id}`, data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    deleteComment(id: number, data: Comment) {
      return new Promise((resolve, reject) => {
        axios
          .put(`/comments/${id}`, data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});
