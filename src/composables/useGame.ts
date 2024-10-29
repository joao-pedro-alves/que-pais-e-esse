import { GameStatus } from "@/types/game";
import { computed, reactive, ref } from "vue";
import useCountry from "./useCountry";
import { type Country } from "@/types/country";
import { shuffleArray } from "@/utils";

const {
  getRandomCountry,
  getCountrySelectOptions,
} = useCountry()

const settings = reactive({
  flagsCount: getFlagsCountValues()[0],
})

const gameStatus = ref<GameStatus>(GameStatus.Idle)

const roundDataset = reactive<{
  currentCountry: Country|null,
  countrySelectOptions: Array<{key: string, country: Country}>,
  selectedCountryCode: string,
  countriesPlayed: number,
  countriesLimit: number,
}>({
  selectedCountryCode: '',
  currentCountry: null,
  countrySelectOptions: [],
  countriesPlayed: 0,
  countriesLimit: 0,
})

const currentRoundCountry = computed(() => {
  if (roundDataset.currentCountry === null) {
    throw new Error('currentCountry is not set')
  }

  return roundDataset.currentCountry
})

function startGame() {
  gameStatus.value = GameStatus.Running

  roundDataset.countriesLimit = settings.flagsCount

  loadNextCountry()
}

function guessRoundCountry(countryCode: string) {
  roundDataset.selectedCountryCode = countryCode

  return {
    isCorrect: countryCode == currentRoundCountry.value.code,
    currentCountryCode: currentRoundCountry.value.code,
  }
}

function loadNextCountry() {
  roundDataset.selectedCountryCode = ''
  roundDataset.countrySelectOptions = []
  roundDataset.countriesPlayed++

  chooseNextRoundCountry()
  generateRoundCountrySelectOptions()
}

function chooseNextRoundCountry() {
  const country = getRandomCountry()
  roundDataset.currentCountry = country
}

function generateRoundCountrySelectOptions() {
  const countries = getCountrySelectOptions(currentRoundCountry.value.code)
  countries.push(currentRoundCountry.value)

  roundDataset.countrySelectOptions = shuffleArray(countries).map((country, key) => ({
    key: (key + 1).toString(),
    country,
  }))
}

function getFlagsCountValues() {
  return [10, 25, 50, 100, 200];
}

function setSettingsFlagsCount(count: number) {
  settings.flagsCount = count
}

export default function useGame() {
  return {
    roundDataset,
    gameStatus,
    settings, 
    currentRoundCountry,
    startGame,
    getFlagsCountValues,
    setSettingsFlagsCount,
    guessRoundCountry,
    loadNextCountry,
  }
}