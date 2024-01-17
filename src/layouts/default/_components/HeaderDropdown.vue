<template>
  <Dropdown placement="bottomRight" trigger="click">
    <button class="flex items-center justify-center bg-transparent border-none cursor-pointer">
      <UserIcon width="32" height="32" />
    </button>
    <template #overlay>
      <Menu class="min-w-[150px]">
        <Menu.Item class="hover:!bg-transparent">
          <a href="/#" @click.prevent.stop="" class="!cursor-auto font-semibold">Admin</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <a href="/#" @click.prevent="">Settings</a>
        </Menu.Item>
        <Menu.Item>
          <a href="/#" class="!text-red-500" @click.prevent="handleLogout">Logout</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <a href="/#" @click.prevent="">Support</a>
        </Menu.Item>
      </Menu>
    </template>
  </Dropdown>
</template>

<script setup lang="ts">
import { Dropdown, Menu } from 'ant-design-vue'
import UserIcon from '@/components/icons/common/User.vue'
import { useRouter } from 'vue-router'
import { resetStores } from '@/plugins/pinia'

const router = useRouter()

const handleLogout = () => {
  resetStores()
  // router.push({ name: ERouteNames.Login })
}

</script>
