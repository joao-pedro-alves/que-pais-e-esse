<script setup lang="ts">
import { storeToRefs } from 'pinia';
import PrimaryButton from '../buttons/PrimaryButton.vue';
import { gameStore } from '@/stores/gameStore';

const { gameState } = storeToRefs(gameStore())
const { resetRound } = gameStore()
</script>

<template>
  <div class="flex justify-center">
    <div class="w-full max-w-[400px] flex flex-col items-center gap-8">
      <h1 class="font-bold text-3xl">Resultado</h1>

      <div class="w-full">
        <div class="font-medium text-gray-500 text-center mb-2">{{ gameState.totalCountries }} países jogados</div>
  
        <div class="flex gap-1">
          <div class="item bg-green-500">
            <span class="legend">Acertos</span>
            <span class="score">{{ gameState.countriesCorrect }}</span>
          </div>
  
          <div class="item bg-red-500">
            <span class="legend">Incorretos</span>
            <span class="score">{{ gameState.countriesIncorrect }}</span>
          </div>
        </div>
      </div>

      <div class="w-full mt-10">
        <PrimaryButton
          :active="true"
          @click="() => resetRound()"
        >Jogar novamente</PrimaryButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.item {
  @apply
    rounded
    w-full
    flex
    flex-col
    items-center
    py-2
  ;
}

.item .legend {
  @apply
    text-sm
    font-medium
  ;
}

.item .score {
  @apply
    text-2xl
    font-semibold
  ;
}
</style>