<template>
  <a v-if="canEdit" @click="$emit('handleEdit', record)">Edit</a>
  <Divider v-if="canDelete && canEdit" type="vertical" />
  <Popconfirm v-if="canDelete" title="Sure to delete?" ok-text="Yes" @confirm="$emit('handleDelete', record)">
    <a class="text-red-600 hover:text-red-400">Delete</a>
  </Popconfirm>
</template>

<script setup lang="ts">
import { Divider, Popconfirm } from 'ant-design-vue';

interface IProps {
  record: any;
  canDelete?: boolean;
  canEdit?: boolean;
}

const { record } = withDefaults(defineProps<IProps>(), {
  canDelete: true,
  canEdit: true,
});

</script>

<style scoped></style>
