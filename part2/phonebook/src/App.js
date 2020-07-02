import React, { useState, useEffect  } from 'react'
import axios from 'axios'


const Filter = ({searchTerm, setSearchTerm}) => <>
 filter shown with <input type='text' value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
 </>
const Persons = ({persons}) => persons.map( (person) => <p key={person.name}>{person.name} {person.number}</p> )

const PersonForm = ({formProcess, newName, newNumber, setNewName, setNewNumber}) => <>
      <form onSubmit={ (event)=>formProcess(event) }>
        <div>
          name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
        </div>
        <div>
          number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
</>

const App = () => {
  const [persons, setPersons] = useState([])
  const [ searchTerm, setSearchTerm] = useState('');
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ personsSearch, setPersonsSearch] = useState(persons);

  const formSearch = () => {
    if(searchTerm)
      setPersonsSearch(
        persons.filter(person => 
          person.name.toLowerCase().includes(searchTerm.toLowerCase())));
    else
        setPersonsSearch(persons);
    }
  

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      });

      
  },[]);

  /* Moniters `persons` variable */
  useEffect(formSearch, [persons, searchTerm]);
  const isAdded = (name) => persons.map((person) => person.name.toLowerCase()).indexOf(name.toLowerCase()) !== -1

  const formProcess= (event) => {
    event.preventDefault();
    if(isAdded(newName))
      return alert(`${newName} is already added to phonebook`);
    let newPersons = persons.concat({name: newName, number: newNumber});
    setPersons(newPersons);
    setNewName('');
    setNewNumber('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm}></Filter>
      <h3>add a new</h3>
      <PersonForm
            setNewName = {setNewName}
            setNewNumber = {setNewNumber}
            formProcess = {formProcess}
            newName = {newName}
            newNumber = {newNumber}
      ></PersonForm>
      <h3>Numbers</h3>
      <Persons persons={personsSearch}></Persons>
    </div>
  )
}

export default App
