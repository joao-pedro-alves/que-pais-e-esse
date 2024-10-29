<script setup lang="ts">
import useGame from '@/composables/useGame';
import GameSelectCountryButton from '../buttons/GameSelectCountryButton.vue'
import { computed } from 'vue'
import PrimaryButton from '../buttons/PrimaryButton.vue';

import instantWinAudio from '@/assets/audios/instant-win.wav'
import failAudio from '@/assets/audios/fail.wav'
import GameNextCountryButton from '../buttons/GameNextCountryButton.vue';

const {
  roundDataset,
  guessRoundCountry,
  currentRoundCountry,
  loadNextCountry,
} = useGame()

const defineSelectButtonVariant = computed(() => {
  return (countryCode: string) => {
    if (countryCode == roundDataset.selectedCountryCode && currentRoundCountry.value.code != countryCode) {
      return 'incorrect'
    }
    
    if (roundDataset.selectedCountryCode && countryCode == currentRoundCountry.value.code) {
      return 'correct'
    }

    return null
  }
})

function handleGuessCountry(countryCode: string) {
  if (roundDataset.selectedCountryCode) return
  
  const { isCorrect } = guessRoundCountry(countryCode)

  if (isCorrect) {
    const audio = new Audio(instantWinAudio)
    audio.play()
  } else {
    const audio = new Audio(failAudio)
    audio.play()
  }
}

</script>

<template>
  <div class="flex flex-col gap-6">
    <div>
      {{ roundDataset.countriesPlayed }} / {{ roundDataset.countriesLimit }}
    </div>
    
    <div class="max-w-[400px] w-full self-center">
      <div
        class="fib w-full !bg-cover aspect-[4/3]"
        :class="`fi-${roundDataset.currentCountry?.code}`"
      ></div>
    </div>

    <div class="flex flex-col gap-2">
      <GameSelectCountryButton
        v-for="option in roundDataset.countrySelectOptions"
        :key="option.country.code"
        :option-key="option.key"
        :variant="defineSelectButtonVariant(option.country.code)"
        @click="() => handleGuessCountry(option.country.code)"
      >{{ option.country.name }}</GameSelectCountryButton>
    </div>

    <GameNextCountryButton
      v-if="roundDataset.selectedCountryCode"
      @click="() => loadNextCountry()"
    >Próximo</GameNextCountryButton>
  </div>
</template>