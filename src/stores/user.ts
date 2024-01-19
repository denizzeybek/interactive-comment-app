import { defineStore } from 'pinia';
import { EStoreNames } from '@/constants/storeNames';
import { currentUser } from '@/mocks/db.json';

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
      this.currentUser = currentUser;
    },
  },
});
