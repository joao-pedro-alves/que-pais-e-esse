<script setup lang="ts">
import PrimaryButton from './PrimaryButton.vue'
import { defineProps, onMounted, withDefaults, defineEmits } from 'vue'

const props = withDefaults(defineProps<{
  optionKey: string
  variant?: 'correct'|'incorrect'|null
}>(), {
  variant: null,
})

const emit = defineEmits<{
  click: []
}>()

onMounted(() => {
  window.addEventListener('keydown', (event) => {
    if (event.key == props.optionKey) emit('click')
  })
})
</script>

<template>
  <PrimaryButton
    class="!rounded-md button"
    :class="`${props.variant} ${props.variant ? 'no-hover' : ''}`"
    @click="() => emit('click')"
  >
    <span class="flex items-center">
      <span class="ml-2 mr-auto w-[28px] h-[28px] flex flex-col items-center justify-center rounded-lg bg-[color:var(--border-color)] text-white shadow-lg transition-all">
        <span>{{ optionKey }}</span>
      </span>

      <span class="mr-auto -ml-[28px]">
        <slot></slot>
      </span>
    </span>
  </PrimaryButton>
</template>

<style scoped>
.button {
  --border-color: theme('colors.gray.700');
}

.button:hover {
  --border-color: theme('colors.amber.500');
  --bg-color: theme('colors.amber.600');
}

.correct,
.incorrect,
.correct:hover,
.incorrect:hover {
  @apply
    bg-[color:var(--bg-color)]
    border-[color:var(--border-color)]
  ;
}

.correct {
  --bg-color: theme('colors.green.600') !important;
  --border-color: theme('colors.green.500') !important;
}

.incorrect {
  --bg-color: theme('colors.red.600') !important;
  --border-color: theme('colors.red.500') !important;
}
</style>