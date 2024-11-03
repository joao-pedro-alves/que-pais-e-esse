<template>
  <div>
    <GameIntroduce v-if="gameState.status == GameStatus.Idle" />

    <GameBoard v-if="gameState.status == GameStatus.Running" />

    <GameFinalScore v-if="gameState.status == GameStatus.Finished" />
  </div>
</template>

<script setup lang="ts">
import GameBoard from '@/components/game/GameBoard.vue';
import GameFinalScore from '@/components/game/GameFinalScore.vue';
import GameIntroduce from '@/components/game/GameIntroduce.vue';
import { gameStore } from '@/stores/gameStore';
import { GameStatus } from '@/types/game';
import { storeToRefs } from 'pinia';

const { gameState } = storeToRefs(gameStore())

</script>
