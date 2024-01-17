<template>
  <SubMenu :key="item.routeName">
    <template #title>
      <component :is="item.icon" />
      <span>{{ item.routeName }}</span>
    </template>
    <Menu.Item v-for="child in item.children" :key="child">
      <RouterLink :to="{ name: child }" @click="resetPagination">
        <span>{{ child }}</span>
      </RouterLink>
    </Menu.Item>
  </SubMenu>
</template>

<script lang="ts" setup>
import type { ERouteNames } from '@/constants/routeNames'
import { Menu, SubMenu } from 'ant-design-vue'
import { useCommonStore } from '@/stores/common'

interface IProps {
  item: {
    icon: any
    routeName: ERouteNames | string
    children?: ERouteNames[]
  }
}

defineProps<IProps>()

const commonStore = useCommonStore()
const resetPagination = () => {
  commonStore.setCurrentPage(1)
}
</script>
