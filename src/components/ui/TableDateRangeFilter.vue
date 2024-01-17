<template>
  <div class="flex flex-col gap-2 p-2">
    <RangePicker :value="selectedKeys" @update:value="(v) => $emit('update:selectedKeys', v)" />
    <div class="flex items-center justify-between gap-3">
      <Button type="primary" size="small" @click="$emit('confirm')" class="w-full">
        <SearchOutlined />
        Search
      </Button>
      <Button size="small" @click="$emit('clearFilters', { confirm: true })" class="w-full">
        Reset
      </Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SearchOutlined } from '@ant-design/icons-vue'
import { RangePicker, Button } from 'ant-design-vue'

interface IProps {
  column: any
  selectedKeys: any
}
defineProps<IProps>()

interface IEmits {
  (event: 'confirm'): void
  (event: 'clearFilters', payload: any): void
  (event: 'update:selectedKeys', selectedKeys: any): void
}
defineEmits<IEmits>()
</script>
