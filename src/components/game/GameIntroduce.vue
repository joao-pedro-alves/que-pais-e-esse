<script setup lang="ts">
import PrimaryButton from '../buttons/PrimaryButton.vue'
import useGame from '@/composables/useGame'

const {
  startGame,
  getFlagsCountValues,
  setSettingsFlagsCount,
  settings,
} = useGame()

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
          v-for="i in getFlagsCountValues()"
          :key="i"
          :active="settings.flagsCount == i"
          @click="() => setSettingsFlagsCount(i)"
        >{{ i }}</PrimaryButton>
      </div>
    </section>

    <section>
      <PrimaryButton
        class="w-full !py-4 !rounded-full"
        :active="true"
        @click="() => startGame()"
      >Bora jogar!</PrimaryButton>
    </section>
  </div>
</template>
