<template>
  <button
    class="outline-none border-none bg- cursor-pointer inline-flex items-center gap-2"
    :class="{
      'text-gray-800 bg-transparent': variant === 'ghost',
      'text-red-600 bg-transparent': variant === 'danger',
      'text-white bg-indigo-500 rounded-md py-2 px- uppercase': variant === 'primary',
      'text-white bg- rounded-md py-2 px- uppercase': variant === 'secondary',
    }"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
interface IProps {
  variant?: 'ghost' | 'danger' | 'primary' | 'secondary';
}
withDefaults(defineProps<IProps>(), {
  variant: 'ghost',
});
</script>

<style scoped></style>
