<script setup>
import { gameStore } from '@/stores/gameStore';
import { storeToRefs } from 'pinia';

const { gameState } = storeToRefs(gameStore())
</script>

<template>
  <div class="flex justify-center">
    <div class="flex flex-col items-center gap-1">
      <div class="flex text-[11px] font-semibold gap-1 text-gray-500 bg-gray-800 rounded-full py-1 px-2">
        <div class="text-white">{{ gameState.countriesCorrect + gameState.countriesIncorrect }}</div>
        <div>de</div>
        <div>{{ gameState.totalCountries }}</div>
      </div>
  
      <div class="inline-flex gap-1 items-center justify-center">
        <div class="item bg-green-600">{{ gameState.countriesCorrect }}</div>
        <div class="font-bold text-[12px] text-gray-800">/</div>
        <div class="item bg-red-600">{{ gameState.countriesIncorrect }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.item {
  @apply
    w-8
    h-8
    rounded-full
    flex
    items-center
    justify-center
    font-semibold
    text-[12px]
  ;
}
</style>