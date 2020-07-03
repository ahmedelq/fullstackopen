import React, {useState, useEffect} from 'react';
import axios from 'axios'

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(()=>{
      axios
        .get('https://restcountries.eu/rest/v2/all')
        .then((results) => {
          console.log(results);
          setCountries(results.data);
        });

  }, []);
  
  const renderCountries = () => {
    if (!searchTerm)
      return <p>Please enter a search term</p>
    if (countries === 0)
      return <p>Loading countries...</p>
    const filteredCountries = countries
                .filter(country =>
                        country.name.toLowerCase()
                        .includes(searchTerm.toLowerCase()))
    if (filteredCountries.length > 20)
        return <p>Too many matches, specify another filter</p>
    if (filteredCountries.length === 1)
    {
      const result = filteredCountries[0];
      return (
      <>
      <h2>{result.name}</h2>
      <p>capital {result.capital}</p>
      <p>population {result.population.toLocaleString()}</p>
      <h3>languages</h3>
      <ul>
        {result.languages.map(lang => 
            <li key={lang.iso639_1}>{lang.name}</li>)}
      </ul>
      <img src={result.flag} alt={result.name} width="150px"></img>
      </>)
    }
    return filteredCountries.map(country => <p key={country.alpha2Code}>{country.name}</p>);
  };

  return (
    <>
      find countries <input type='text'  
        value={searchTerm} 
        onChange={(event) => 
        setSearchTerm(event.target.value)} />
        <div>
            {renderCountries()}
        </div>
    </>
  );
}

export default App;
