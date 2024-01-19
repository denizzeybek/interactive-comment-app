import { defineStore } from 'pinia';
import { EStoreNames } from '@/constants/storeNames';
import axios from 'axios';

export type User = {
  image: {
    png: string;
    webp: string;
  };
  username: string;
};

interface State {
  currentUser: User | undefined;
}

export const useUserStore = defineStore(EStoreNames.USER, {
  state: (): State => ({
    currentUser: {} as User,
  }),
  actions: {
    fetchCurrentUser() {
      return new Promise((resolve, reject) => {
        axios
          .get<User>('currentUser')
          .then((response) => {
            this.currentUser = response.data;
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});
