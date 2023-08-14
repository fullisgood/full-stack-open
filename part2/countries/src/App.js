import { useState, useEffect } from 'react'
import axios from 'axios'
import CountriesView from './components/CountriesView'
import Filter from './components/Filter'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [countriesToShow, setCountriesToShow] = useState([])
  const handleFilterChange = (event) => {
    const newFilter = event.target.value
    setFilter(newFilter)
    setCountriesToShow(countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase())))
  }

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <Filter value={filter} onChange={handleFilterChange} />
      <CountriesView countriesToShow={countriesToShow} setCountriesToShow={setCountriesToShow} />
    </div>
  );
}

export default App;
