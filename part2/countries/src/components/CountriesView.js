import CountryDetail from "./CountryDetail";
import CountryList from "./CountryList";

const CountriesView = ({ countriesToShow, setCountriesToShow }) => {
    if (countriesToShow.length > 10) {
        return <p>Too many matches, specify another filter</p>
    } else if (countriesToShow.length > 1) {
        return countriesToShow.map(country => <CountryList key={country.cca3} country={country} setCountriesToShow={setCountriesToShow} />)
    } else if (countriesToShow.length === 1) {
        return <CountryDetail country={countriesToShow[0]} />
    } else {
        return <p>No one matches, specify another filter</p>
    }
}

export default CountriesView