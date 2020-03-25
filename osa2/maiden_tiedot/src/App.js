import React , {useState, useEffect} from 'react';
import axios from 'axios'

const Filter = (props) => {
  return(
      <div>find countries <input value={props.value} onChange={props.onChange}/></div>
  )
}


const Content = (props) => {
  if(props.countriesToShow.length > 10){
    return <h3>Too many matches, specify another filter</h3>
  }
  if(props.countriesToShow.length !== 1 && props.countriesToShow.length <= 10){
    return( 
      props.countriesToShow.map((country, i)=>
      <div key={i}>
      {country.name}
      <button onClick={ () =>  props.setNewFilter(country.name)}>show</button>
      </div>)
    )
  }
  else{
    return(
      <OneCountry country={props.countriesToShow}/>
    )
  }
}

const OneCountry = ({country}) =>{
  const [ countryData, setCountryData ] = useState({})
  useEffect(() => {
    let mounted = true
    axios
    .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country[0].capital}`).then(response => {
        if(mounted)
          setCountryData(response.data.current)
    })
    return () => mounted = false
  }, [country])


  return(
    <div>
        <h3>{country[0].name}</h3>
        <p>capital {country[0].capital}</p>
        <p>population {country[0].population}</p>
        <h3>languages</h3>
        <ul>
          {country[0].languages.map((language, i)=>
          <li key={language.name}>{language.name}</li>)}
        </ul>
        <img src={country[0].flag} style={{maxWidth: "100px"}} alt="picturetext"></img>
        <h2>Weather in {country[0].capital}</h2>
        <h3>temperature: {countryData.temperature} Celcius</h3>
        <img src={countryData.weather_icons} alt="picturetext"></img>
          <h3>wind: {countryData.wind_speed} mph direction {countryData.wind_dir}</h3>
    </div>
  )
}

function App() {
  const [ newFilter, setNewFilter ] = useState('')
  const [ countries, setCountries ] = useState([])

  const handleFilterChange = (event)  => setNewFilter(event.target.value)
  const countriesToShow =  countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))
  
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all').then(response => {
        setCountries(response.data)
      })
  }, [])    

return(
  <div>
    <Filter value={newFilter} onChange={handleFilterChange}/>
    <Content countriesToShow={countriesToShow} setNewFilter={setNewFilter}/>
  </div>
)

}

export default App;
