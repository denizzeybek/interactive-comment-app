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
        <component
          :is="item.children?.length ? SidebarSubMenu : SidebarMenuItem"
          v-for="item in navItems"
          :key="item.routeName"
          :item="item"
        />
      </Menu>
    </LayoutSider>
  </ConfigProvider>
</template>

<script lang="ts" setup>
import { Divider, LayoutSider, Menu, ConfigProvider } from 'ant-design-vue';
import { ERouteNames } from '@/constants/routeNames';
import { watch, ref } from 'vue';
import {
  CodeSandboxOutlined,
  HomeOutlined,
  FileProtectOutlined,
} from '@ant-design/icons-vue';
import SidebarMenuItem from './_components/SidebarMenuItem.vue';
import SidebarSubMenu from './_components/SidebarSubMenu.vue';
import type { Key } from 'ant-design-vue/es/_util/type';
import { useRoute } from 'vue-router';

const route = useRoute();

const navItems = [
  {
    icon: HomeOutlined,
    routeName: ERouteNames.Home,
  },
  {
    icon: FileProtectOutlined,
    routeName: ERouteNames.SecondaryTitle,
    children: [ERouteNames.Secondary],
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

watch(
  () => route.name,
  (routeName) => {
    const navItem = navItems.find((item) => {
      if (item.children) {
        return item.children.includes(routeName as ERouteNames);
      }
      return item.routeName === routeName;
    });

    if (navItem) {
      if (navItem.children) {
        openedSubMenu.value = [navItem.routeName];
        const childItem = navItem.children.find((child) => child === routeName);
        if (childItem) {
          selectedNavItem.value = [childItem];
        }
      } else {
        selectedNavItem.value = [navItem.routeName];
        openedSubMenu.value = [];
      }
    }
  },
  { immediate: true },
);
</script>
