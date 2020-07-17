import React, { useState, useEffect  } from 'react'
import reqs from './restful'


const Filter = ({searchTerm, setSearchTerm}) => <>
 filter shown with <input type='text' value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
 </>

const Persons = ({persons, deletePerson}) => persons.map( 
      (person, index) => 
        <div key={person.name}>
          <span>{person.name} {person.number}</span>
          <button style={{"display":"inline-block"}}
          onClick={() => window.confirm(`Delete ${person.name} ?`) ? deletePerson(person.id) : null}>Delete</button>
        </div> )

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
const Notification = ({message, isWarning}) => {
  if (message.length === 0)
    return null;
   
   let msgStyle = {
    border : "1px solid green",
    borderRadius: "5px",
    color: "green",
    fontSize: "18px",
    backgroundColor: "#eee",
    padding: "10px"
  }
  if(isWarning){
   msgStyle = {...msgStyle, color:"red", border:"1px solid red"} 
  }
  return <div style={msgStyle}>
    <span>{message}</span>
  </div>
}
const App = () => {
  const [persons, setPersons] = useState([])
  const [ searchTerm, setSearchTerm] = useState('');
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ personsSearch, setPersonsSearch] = useState(persons);
  const [ message, setMessage] = useState('');
  const [isWarning, setIsWarning] = useState(false);
  const deletePerson = (index) => 
                                  reqs.remove('persons', index)
                                  .then(() => setPersons(persons.filter(person => person.id !== index)))
                                  .catch(() => {
                                      setPersons(persons.filter(person => person.id !== index));
                                      setMessage('This person was already removed from the server.')
                                      setIsWarning(true);
                                  });
  const formSearch = () => {
    if(searchTerm)
      setPersonsSearch(
        persons.filter(person => 
          person.name.toLowerCase().includes(searchTerm.toLowerCase())));
    else
        setPersonsSearch(persons);
    }
  

  useEffect(() => {
    reqs
    .get('persons')
      .then(response => {
        setPersons(response);
      });

      
  },[]);

  /* Moniters `persons` variable */
  useEffect(formSearch, [persons, searchTerm]);
  const getPerson = () => persons.filter(person => person.name.toLowerCase() === newName.trim().toLowerCase());
  const formProcess= (event) => {
    event.preventDefault();
    const existsPerson =  getPerson();
    if(newName.trim().length === 0)
    {
      setMessage('Please enter a valid name');
      setIsWarning(true);
      return;
    }
    if(existsPerson.length >= 1){
      const newPerson = {...existsPerson[0]};
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        newPerson['number'] = newNumber;
        reqs.put('persons', newPerson.id, newPerson);
      } 
      
      setPersons(persons.map(person => person.id === newPerson.id ? newPerson : person));
    } else {
      const newPerson = {name: newName.trim(), number: newNumber.trim()}
      reqs.post('persons', newPerson).then(res => setPersons(persons.concat(res)));
      setMessage(`${newPerson.name} has been added.`);
      setIsWarning(false);
    }

    
    setNewName('');
    setNewNumber('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isWarning={isWarning}></Notification>
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
      <Persons persons={personsSearch} deletePerson={deletePerson}></Persons>
    </div>
  )
}

export default App
