<script setup lang="ts">
import { gameStore } from '@/stores/gameStore';
import PrimaryButton from '../buttons/PrimaryButton.vue'
import { storeToRefs } from 'pinia';

// import QuePaisEEsseAudio from '@/assets/audios/que-pais-e-esse.mp3'
import { onMounted, onUnmounted } from 'vue';

const { gameState } = storeToRefs(gameStore())
const { starRound, countryCountOptions } = gameStore()

// const introduceAudio = new Audio(QuePaisEEsseAudio)
// introduceAudio.volume = 0.05
// introduceAudio.loop = true

// function playIntroduceAudio() {
//   introduceAudio.play().catch(() => {
//     window.addEventListener('click', () => introduceAudio.play(), { once: true })
//   })
// }

// introduceAudio.addEventListener('canplaythrough', playIntroduceAudio, { once: true })

onUnmounted(() => {
    // setTimeout(() => introduceAudio.pause())
})
</script>

<template>
  <div class="flex flex-col gap-8">
    <h1 class="text-center font-semibold text-[32px] py-8 relative">
      <div class="absolute w-full flex justify-around opacity blur-xl z-0">
        <span
          v-for="(i, index) in ['gr', 'cl', 'ge', 'la', 'ls', 'ma', 'br', 'ba', 'ke', 'ws']"
          :key="i"
          :class="`fi fi-${i} fis text-[42px] animate-pulse`"
          :style="`animation-delay: calc(0.${index * 100}s + 0.25s)`"
        ></span>
      </div>
      <span class="z-10 relative">QUE PAÍS É ESSE?</span>
    </h1>

    <section class="flex-1">
      <div class="font-semibold mb-2">Número de bandeiras</div>
      <div class="flex items-center justify-between gap-2">
        <PrimaryButton
          v-for="i in countryCountOptions"
          :key="i"
          :active="gameState.totalCountries == i"
          @click="() => gameState.totalCountries = i"
        >{{ i }}</PrimaryButton>
      </div>
    </section>

    <section>
      <PrimaryButton
        class="w-full !py-4 !rounded-full"
        :active="true"
        @click="() => starRound()"
      >Bora jogar!</PrimaryButton>
    </section>
  </div>
</template>
