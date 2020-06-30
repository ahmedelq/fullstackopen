import React, { useState } from 'react'



const Filter = ({searchTerm, searchFunc, persons}) => <>
 filter shown with <input type='text' value={searchTerm} onChange={(event) => searchFunc(event.target.value, persons)} />
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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ personsSearch, setPersonsSearch] = useState(persons);
  const [ searchTerm, setSearchTerm] = useState('');

  const formSearch = (searchTerm, list) => {
    setSearchTerm(searchTerm);
    if(searchTerm)
      setPersonsSearch(
        list.filter(person => 
          person.name.toLowerCase().includes(searchTerm.toLowerCase())));
    else
      setPersonsSearch(persons);
  }

  const isAdded = (name) => persons.map((person) => person.name.toLowerCase()).indexOf(name.toLowerCase()) !== -1

  const formProcess= (event) => {
    event.preventDefault();
    if(isAdded(newName))
      return alert(`${newName} is already added to phonebook`);
    let newPersons = persons.concat({name: newName, number: newNumber});
    setPersons(newPersons);
    setNewName('');
    setNewNumber('');
    formSearch(searchTerm, newPersons);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} searchFunc={formSearch} persons={persons}></Filter>
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
