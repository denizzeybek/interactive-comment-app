<template>
  <Layout class="h-screen">
    <Sidebar />
    <Layout>
      <Header />
      <LayoutContent :class="pagePadding" class="overflow-auto">
        <RouterView />
      </LayoutContent>
      <LayoutFooter class="!px-5">©2024</LayoutFooter>
    </Layout>
  </Layout>
</template>

<script lang="ts" setup>
import { Layout, LayoutContent, LayoutFooter } from 'ant-design-vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Header from './Header.vue';
import Sidebar from './Sidebar.vue';

const route = useRoute();
const pagePadding = computed(() => {
  const { isLayoutPadding } = route.meta;
  return isLayoutPadding ? 'ps-5' : 'p-5';
});
</script>
