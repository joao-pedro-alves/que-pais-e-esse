<script setup lang="ts">
import { withDefaults, defineProps } from 'vue'

const props = withDefaults(defineProps<{
  active?: boolean
}>(), {
  active: false
})
</script>

<template>
  <button
    class="button"
    :class="{ active: props.active }"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
.button {
  @apply
    w-full
    py-2
    flex-1
    bg-gray-800
    text-white
    font-semibold
    border-b-4
    border-gray-700
    rounded-xl
  ;
}

.button:not(.no-hover) {
  @apply
    hover:bg-amber-600
    hover:border-amber-500
    transition-all
  ;
}

.button.active {
  @apply
    bg-amber-600
    border-amber-500
  ;
}
</style>