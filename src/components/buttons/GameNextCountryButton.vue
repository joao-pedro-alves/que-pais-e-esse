<script setup lang="ts">
import PrimaryButton from './PrimaryButton.vue';
import { defineEmits, onMounted } from 'vue'

const emit = defineEmits<{
  click: []
}>()

onMounted(() => {
  window.addEventListener('keydown', (event) => {
    if ([' ', 'Enter'].includes(event.key)) emit('click')
  })
})
</script>

<template>
  <PrimaryButton
      class="w-full !py-4 !rounded-full"
      :active="true"
      @click="() => emit('click')"
    >
      <slot></slot>
    </PrimaryButton>
</template>