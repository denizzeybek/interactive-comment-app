<template>
  <ConfigProvider>
    <LayoutSider v-model:collapsed="collapsed" collapsible breakpoint="lg" theme="light">
      <RouterLink
        :to="{ name: ERouteNames.Home }"
        class="flex items-center justify-center h-20 cursor-pointer"
      >
        <CodeSandboxOutlined class="text-3xl" />
      </RouterLink>
      <Divider class="!min-w-0 w-auto mx-4 mb-5 mt-0 bg-gray-600" />
      <Menu
        theme="light"
        mode="inline"
        :selectedKeys="selectedNavItem"
        :openKeys="openedSubMenu"
        @openChange="handleSubMenuToggle"
      >
        <SidebarMenuItem v-for="item in navItems" :key="item.routeName" :item="item" />
      </Menu>
    </LayoutSider>
  </ConfigProvider>
</template>

<script lang="ts" setup>
import { Divider, LayoutSider, Menu, ConfigProvider } from 'ant-design-vue';
import { ERouteNames } from '@/constants/routeNames';
import { ref } from 'vue';
import { CodeSandboxOutlined, HomeOutlined } from '@ant-design/icons-vue';
import SidebarMenuItem from './_components/SidebarMenuItem.vue';
import type { Key } from 'ant-design-vue/es/_util/type';

const navItems = [
  {
    icon: HomeOutlined,
    routeName: ERouteNames.Home,
  },
];

const collapsed = ref(false);
const selectedNavItem = ref<Key[]>([]);
const openedSubMenu = ref<Key[]>([]);

const handleSubMenuToggle = (keys: Key[]) => {
  if (keys.length) {
    openedSubMenu.value = keys.slice(-1);
  } else {
    openedSubMenu.value = [];
  }
};
</script>
