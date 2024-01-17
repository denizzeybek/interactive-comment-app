<template>
  <Dropdown placement="bottomRight" trigger="click">
    <Button @click.prevent class="cursor-pointer"> Actions </Button>
    <template #overlay>
      <Menu class="min-w-[150px]">
        <template v-for="(elementArray, index) in actionMenuItems" :key="index">
          <Menu.Item
            v-for="(element, index) in elementArray"
            :key="element.id"
            class="hover:!bg-transparent"
            @click="element.method && element.method()"
          >
            <span
              :id="`${index.toString()}-btn`"
              :class="[
                element?.isBold ? 'font-semibold' : '',
                element?.isTitle ? 'font-semibold' : 'ml-4 cursor-pointer font-light',
                element?.isDanger ? '!text-red-500' : 'text-black',
              ]"
              >{{ element?.text }}
            </span>
          </Menu.Item>
          <Menu.Divider v-if="index < actionMenuItems.length - 1" />
        </template>
      </Menu>
    </template>
  </Dropdown>
</template>
<script lang="ts" setup>
import { Button, Dropdown, Menu } from 'ant-design-vue';

export interface IProps {
  actionMenuItems: any[];
}

const { actionMenuItems } = defineProps<IProps>();
</script>
