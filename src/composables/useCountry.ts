import countries from '@/db/countries.json'
import { Country } from '@/types/country'
import { shuffleArray } from '@/utils'
import { computed } from 'vue'

const countryCodes = computed(() => {
  return countries.map((country) => country.code)
})

function getRandomCountry(): Country {
  return countries[Math.floor(Math.random() * countries.length)]
}

function getCountrySelectOptions(currentCountryCode: string): Country[] {
  const otherCountries = countries.filter(country => country.code != currentCountryCode)
  return shuffleArray(otherCountries).slice(0, 3)
}

export default function useCountry() {
  return {
    getCountrySelectOptions,
    getRandomCountry,
    countryCodes,
  }
}