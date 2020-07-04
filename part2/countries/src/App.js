import React, {useState, useEffect} from 'react';
import axios from 'axios'

 
const Weather = ({stat}) => {
  console.log(stat);
                        return stat.status ? 
                          <div>
                            <h2>Weather in {stat.location.name}</h2>
                            <p><strong>temperature:</strong> {stat.current.temperature} Celcius</p>
                            <img src={stat.current.weather_icons[0]} alt={stat.current.weather_descriptions[0]}></img>
                            <p><strong>wind:</strong> {stat.current.wind_speed} mph direction {stat.current.wind_dir}</p>
                          </div>
                          : <div><p>Fetching information</p></div>}

const Country = ({country, weather}) => 
                              <>
                              <h2>{country.name}</h2>
                              <p>capital {country.capital}</p>
                              <p>population {country.population.toLocaleString()}</p>
                              <h3>languages</h3>
                              <ul>
                                {country.languages.map(lang => 
                                    <li key={lang.iso639_1}>{lang.name}</li>)}
                              </ul>
                              <img src={country.flag} alt={country.name} width="150px"></img>
                              <Weather stat={weather}></Weather>
                              </>

const ShowCountry = ({country, setSelectedCountry}) => <div>
                                  {country.name}
                                  <button 
                                    style={{display: "inline"}} 
                                    onClick={()=> setSelectedCountry(country)}
                                  >Show</button>
                                  </div>

const CurrentCountry = ({country, stat}) => Object.keys(country).length > 0 ? 
                                        <Country weather={stat} country = {country}></Country> : <></>

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({});
  const [renderedCountries, setRenderedCountries] = useState(<></>);
  const [weatherInfo, setWeatherInfo] = useState({'status': 0});

  
useEffect(()=>{
      axios
        .get('https://restcountries.eu/rest/v2/all')
        .then((results) => {
          setCountries(results.data);
        });

  }, []);
  
  useEffect(() => {
    if (Object.keys(selectedCountry).length === 0)
      return 
    setWeatherInfo({'status': 0})
    console.log('Fetching wheather information')
    axios
      .get(`http://api.weatherstack.com/current?access_key=1579f693889e5fc1149020d550300b08&query=${selectedCountry.capital}`)
      .then(results => {
        const data = results.data
        data['status'] = 1;
        setWeatherInfo(data);
        console.log(data);
      });

  }, [selectedCountry]);

  useEffect(() => {
  setSelectedCountry({});
  setRenderedCountries(<></>);

  if (!searchTerm)
    return setRenderedCountries(<p>Please enter a search term</p>)
  
  if (countries.length === 0)
    return setRenderedCountries(<p>Loading countries...</p>)
  
  const filteredCountries = countries
              .filter(country =>
                      country.name.toLowerCase()
                      .includes(searchTerm.toLowerCase()))
  
  if (filteredCountries.length > 20)
      setRenderedCountries(<p>Too many matches, specify another filter</p>)
  else if (filteredCountries.length === 1)
  {
    setSelectedCountry(filteredCountries[0]);
  } else {
    setRenderedCountries(filteredCountries.map(country => 
      <ShowCountry setSelectedCountry={setSelectedCountry} key={country.alpha2Code} country={country}></ShowCountry>));
  }

  }, [searchTerm, countries]);


console.log(weatherInfo);
  return (
    <>
      find countries <input type='text'  
        value={searchTerm} 
        onChange={(event) => 
        setSearchTerm(event.target.value)} />
        <div>
            {renderedCountries}
            <CurrentCountry stat={weatherInfo} country={selectedCountry}></CurrentCountry>
        </div>
    </>
  );
}

export default App;
