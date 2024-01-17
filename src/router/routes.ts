import { ERouteNames } from '@/constants/routeNames';
import type { RouteRecordRaw } from 'vue-router';

// LAYOUTS
import DefaultLayout from '@/layouts/default/Index.vue';

import Home from '@/views/Home.vue';

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
        component: Home,
        meta: {
          isLayoutPadding: false,
        },
      },
    ],
  },
];

export default routes;
