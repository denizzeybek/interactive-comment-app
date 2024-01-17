<template>
  <div class="p-2">
    <Input
      :id="id"
      ref="searchInputRef"
      :placeholder="`Search ${column.title}`"
      :value="selectedKeys[0]"
      class="w-[188px] mb-2"
      @change="(e) => $emit('update:selectedKeys', e.target.value ? [e.target.value] : [])"
      @pressEnter="$emit('confirm')"
    />
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
import { Input, Button } from 'ant-design-vue'
import { ref } from 'vue'

const searchInputRef = ref()

defineExpose({
  focus: () => {
    searchInputRef.value.focus()
  }
})

interface IProps {
  column: any
  selectedKeys: any[]
  id: string
}

defineProps<IProps>()

interface IEmits {
  (event: 'confirm'): void
  (event: 'clearFilters', payload: any): void
  (event: 'update:selectedKeys', selectedKeys: any): void
}

defineEmits<IEmits>()
</script>
