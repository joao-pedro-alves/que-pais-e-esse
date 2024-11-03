import useCountry from "@/composables/useCountry";
import { Country } from "@/types/country";
import { GameStatus } from "@/types/game";
import { shuffleArray } from "@/utils";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const gameStore = defineStore('gameStore', () => {
  const {
    getRandomCountry,
    getCountrySelectOptions,
    totalCountries,
  } = useCountry()
  
  const countryCountOptions = [10, 25, 50, 100, totalCountries.value]

  function initialGameState() {
    return {
      selectedCountryCode: '',
      currentCountry: null,
      countrySelectOptions: [],
      countriesCorrect: 0,
      countriesIncorrect: 0,
      totalCountries: countryCountOptions[0],
      status: GameStatus.Idle,
      pastSelectedCountriesCode: []
    }
  }

  const gameState = reactive<{
    currentCountry: Country | null,
    countrySelectOptions: Array<{ key: string, country: Country }>,
    selectedCountryCode: string,
    countriesCorrect: number,
    countriesIncorrect: number,
    totalCountries: number,
    status: GameStatus,
    pastSelectedCountriesCode: string[],
  }>(initialGameState())

  function getCurrentCountry() {
    if (gameState.currentCountry === null) {
      throw new Error('currentCountry is not set')
    }

    return gameState.currentCountry
  }

  function starRound() {
    gameState.status = GameStatus.Running

    loadNextCountry()
  }

  function resetRound() {
    Object.assign(gameState, initialGameState())
  }

  function loadNextCountry() {
    gameState.selectedCountryCode = ''
    gameState.countrySelectOptions = []

    chooseNextCountry()
    generateRoundCountrySelectOptions()
  }

  function chooseNextCountry() {
    if (gameState.pastSelectedCountriesCode.length == totalCountries.value) {
      throw 'Max countries possibility reached'
    }

    if (gameState.pastSelectedCountriesCode.length == gameState.totalCountries) {
      gameState.status = GameStatus.Finished
    }

    let country: Country

    do {
      country = getRandomCountry()
    } while (gameState.pastSelectedCountriesCode.includes(country.code));

    gameState.currentCountry = country
    gameState.pastSelectedCountriesCode.push(country.code)
  }

  function generateRoundCountrySelectOptions() {
    const countries = getCountrySelectOptions(getCurrentCountry().code)
    countries.push(getCurrentCountry())

    gameState.countrySelectOptions = shuffleArray(countries).map((country, key) => ({
      key: (key + 1).toString(),
      country,
    }))
  }

  function attemptGuessCountry(countryCode: string) {
    const isCorrect = countryCode == getCurrentCountry().code

    gameState.selectedCountryCode = countryCode
    
    if (isCorrect) {
      gameState.countriesCorrect++
    } else {
      gameState.countriesIncorrect++
    }

    return {
      isCorrect,
      currentCountryCode: getCurrentCountry().code,
    }
  }

  return {
    gameState,
    countryCountOptions,
    getCurrentCountry,
    starRound,
    resetRound,
    loadNextCountry,
    attemptGuessCountry,
  }
})