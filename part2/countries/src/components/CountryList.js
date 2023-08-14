import Button from "./Button"

const CountryList = ({ country, setCountriesToShow }) => {
    return (
        <div>
            <span>{country.name.common}<Button onClick={() => { setCountriesToShow([country]) }} text='show' /></span>
        </div>
    )
}

export default CountryList