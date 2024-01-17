<template>
  <Menu.Item :key="item.routeName">
    <RouterLink :to="{ name: item.routeName }" @click="resetPagination">
      <component :is="item.icon" />
      <span>{{ item.routeName }}</span>
    </RouterLink>
  </Menu.Item>
</template>

<script lang="ts" setup>
import type { ERouteNames } from '@/constants/routeNames'
import { Menu } from 'ant-design-vue'
import { useCommonStore } from '@/stores/common'

interface IProps {
  item: {
    icon: any
    routeName: ERouteNames
  }
}

defineProps<IProps>()

const commonStore = useCommonStore()
const resetPagination = () => {
  commonStore.setCurrentPage(1)
}
</script>
