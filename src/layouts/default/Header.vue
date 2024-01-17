<template>
  <LayoutHeader class="!bg-white !px-5 flex items-center justify-between">
    <h2 class="mb-0">{{ $route.name }}</h2>
    <HeaderDropdown />
  </LayoutHeader>
</template>

<script lang="ts" setup>
import { LayoutHeader } from 'ant-design-vue'
import HeaderDropdown from './_components/HeaderDropdown.vue'
</script>
