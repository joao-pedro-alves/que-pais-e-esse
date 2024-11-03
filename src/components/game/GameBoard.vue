<script setup lang="ts">
import GameSelectCountryButton from '../buttons/GameSelectCountryButton.vue'
import { computed } from 'vue'
import instantWinAudio from '@/assets/audios/instant-win.wav'
import failAudio from '@/assets/audios/fail.wav'
import GameNextCountryButton from '../buttons/GameNextCountryButton.vue';
import { storeToRefs } from 'pinia';
import { gameStore } from '@/stores/gameStore';
import GameScoreBar from './GameScoreBar.vue';

const { gameState } = storeToRefs(gameStore())
const { attemptGuessCountry, loadNextCountry, getCurrentCountry } = gameStore()

const defineSelectButtonVariant = computed(() => {
  return (countryCode: string) => {
    if (countryCode == gameState.value.selectedCountryCode && getCurrentCountry().code != countryCode) {
      return 'incorrect'
    }
    
    if (gameState.value.selectedCountryCode && countryCode == getCurrentCountry().code) {
      return 'correct'
    }

    return null
  }
})

function handleGuessCountry(countryCode: string) {
  if (gameState.value.selectedCountryCode) return
  
  const { isCorrect } = attemptGuessCountry(countryCode)

  if (isCorrect) {
    const audio = new Audio(instantWinAudio)
    audio.volume = 0.15
    audio.play()
  } else {
    const audio = new Audio(failAudio)
    audio.volume = 0.15
    audio.play()
  }
}

</script>

<template>
  <div class="flex flex-col gap-6">
    <GameScoreBar />
    
    <div class="max-w-[400px] w-full self-center">
      <div
        class="fib w-full !bg-cover aspect-[4/3]"
        :class="`fi-${gameState.currentCountry?.code}`"
      ></div>
    </div>

    <div class="flex flex-col gap-2">
      <GameSelectCountryButton
        v-for="option in gameState.countrySelectOptions"
        :key="option.country.code"
        :option-key="option.key"
        :variant="defineSelectButtonVariant(option.country.code)"
        @click="() => handleGuessCountry(option.country.code)"
      >{{ option.country.name }}</GameSelectCountryButton>
    </div>

    <GameNextCountryButton
      v-if="gameState.selectedCountryCode"
      @click="() => loadNextCountry()"
    >Próximo</GameNextCountryButton>
  </div>
</template>