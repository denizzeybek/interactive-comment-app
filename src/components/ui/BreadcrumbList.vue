<template>
  <Breadcrumb :class="customWrapperClasss">
    <BreadcrumbItem v-for="(item, index) in items" :key="index">
      <template v-if="item.to">
        <RouterLink :to="{ name: item.to }">{{ item.name }} </RouterLink>
      </template>
      <template v-else>{{ item.name }}</template>
    </BreadcrumbItem>
  </Breadcrumb>
</template>

<script lang="ts" setup>
import { ERouteNames } from '@/constants/routeNames';
import { Breadcrumb, BreadcrumbItem } from 'ant-design-vue';

interface DataObject {
  name: ERouteNames | string;
  to?: ERouteNames | string;
}

interface IProps {
  items: DataObject[];
  customWrapperClasss?: string;
}
const { items } = defineProps<IProps>();

// with defaults
// const { items: {name: 'asd'} } = defineProps<IProps>();
</script>
