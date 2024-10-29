<template>
  <div>
    <GameIntroduce v-if="gameStatus == GameStatus.Idle" />
    <GameBoard v-if="gameStatus == GameStatus.Running"></GameBoard>
  </div>
</template>

<script setup lang="ts">
import GameBoard from '@/components/game/GameBoard.vue';
import GameIntroduce from '@/components/game/GameIntroduce.vue';
import useGame from '@/composables/useGame';
import { GameStatus } from '@/types/game';

const { gameStatus } = useGame()

</script>
