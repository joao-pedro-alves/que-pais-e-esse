import useCountry from "@/composables/useCountry"
import countries from '@/db/countries.json'

test('increase counter on call', () => {
  const algo = countries.filter(country => !country.capital)
  console.log(algo)
})