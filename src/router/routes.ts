import { ERouteNames } from '@/constants/routeNames';
import type { RouteRecordRaw } from 'vue-router';
import Conversation from '@/views/conversation/Conversation.vue';
// LAYOUTS
import DefaultLayout from '@/layouts/default/Index.vue';

const routes: RouteRecordRaw[] = [
  // PROTECTED/DEFAULT ROUTES
  {
    path: '',
    component: DefaultLayout,
    children: [
      {
        path: '/',
        alias: '',
        name: ERouteNames.Home,
        component: Conversation,
        meta: {
          isLayoutPadding: false,
        },
      },
    ],
  },
];

export default routes;
