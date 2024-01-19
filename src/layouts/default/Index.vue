<template>
  <Layout class="h-screen">
    <Layout>
      <Header />
      <div class="container mx-auto overflow-y-auto">
        <LayoutContent :class="pagePadding" class="overflow-auto">
          <RouterView />
        </LayoutContent>
      </div>
      <LayoutFooter class="!px-5">©2024</LayoutFooter>
    </Layout>
  </Layout>
</template>

<script lang="ts" setup>
import { Layout, LayoutContent, LayoutFooter } from 'ant-design-vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Header from './Header.vue';

const route = useRoute();
const pagePadding = computed(() => {
  const { isLayoutPadding } = route.meta;
  return isLayoutPadding ? 'ps-5' : 'p-5';
});
</script>
