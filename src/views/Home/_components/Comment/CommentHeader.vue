<template>
  <div class="flex items-center justify-between gap-2">
    <div class="flex items-center gap-2">
      <img
        :src="userComment.image.png"
        class="object-cover object-center w-[36px] h-[36px] overflow-hidden rounded-full"
      />
      <span class="text-lg font-semibold">{{ userComment.username }}</span>
      <span class="text-lg font-semibold">{{ comment.id }}</span>
      <span v-if="owner" class="text-sm p-1 rounded-md text-white bg-indigo-500">you</span>
      <span class="text-sm text-slate-600">{{ comment.createdAt }}</span>
    </div>
    <div class="flex items-center gap-2">
      <template  v-if="owner">
        <RButton @click="$emit('onDelete', comment.id)" variant="danger"> <DeleteOutlined />Delete </RButton>
        <RButton  @click="$emit('onEdit', true)" > <EditOutlined /> Edit </RButton>
      </template>
      <RButton v-else @click="$emit('onReply', true)"> <RollbackOutlined /> Reply </RButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DeleteOutlined, EditOutlined, RollbackOutlined } from '@ant-design/icons-vue';
import type { User } from '@/stores/user';
import type { Comment } from '@/stores/comments';
import { computed } from 'vue';

interface IProps {
  comment: Comment;
  currentUser: User;
}

const props = defineProps<IProps>();

const userComment = computed(() => props.comment.user)
const owner = computed(() => userComment.value.username === props.currentUser.username);

</script>
