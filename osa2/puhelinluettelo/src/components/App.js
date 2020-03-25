import React, { useState, useEffect } from 'react'
import personService from '../services/persons'

const Filter = (props) => {
        return(
            <div>filter shown with: <input value={props.value} onChange={props.onChange}/></div>
        )
}

const PersonForm = (props) => {
    return(
        <form onSubmit={props.addName}>
            <div>name: <input value={props.newName} onChange={props.handleNameChange} /></div>
            <div>number: <input value={props.newNumber} onChange={props.handleNumberChange} /></div>
            <div><button type="submit">add</button></div>
        </form>
    )
}

const Persons = (props) =>{
  return(
      props.personsToShow.map((person, i)=>
      <Person person={person} key={person.name} setPersons={props.setPersons} persons={props.persons}setNewMessage={props.setNewMessage}/>)
  ) 
}

const Person = (props) =>{
    const handleDelete = deletePerson =>{
      if(window.confirm(`Delete ${deletePerson.name} ?`)){
          personService.deleteNumber(deletePerson.id)
          props.setPersons(props.persons.filter(person => person.id !== deletePerson.id))
          props.setNewMessage(
            `Deleted ${deletePerson.name}`
          )
          setTimeout(() => {
            props.setNewMessage(null)
          }, 2000)
      }
    }

    return(
      <div>
        {props.person.name} {props.person.number}
        <button onClick= {() => handleDelete(props.person)}>delete</button>
      </div>
    )
}

const App = () => {
  const [ persons, setPersons] = useState([
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ newMessage, setNewMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll('http://localhost:3001/persons')
      .then(persons => {
        setPersons(persons)
      })
  }, [])


  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="error">
        {message}
      </div>
    )
  }

  const addName = (event) =>{
    const nameObject = {
      name: newName,
      number: newNumber
    } 
      event.preventDefault()
      if(persons.filter(person => person.name === newName).length > 0)
      {
        if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
            personService
            .replaceNumber({...nameObject, id: persons.filter(person => person.name === newName)[0].id})
            .then(newPerson =>{
              setPersons(persons.map(person => person.id === newPerson.id ? newPerson : person)) 
              setNewMessage(
                `Changed ${newName}'s number`
              )
              setTimeout(() => {
                setNewMessage(null)
              }, 2000)
            })
            .catch(error =>{
              setNewMessage( `Person '${newName}' was already removed from server`)
              setTimeout(() => {
                setNewMessage(null)
              }, 2000)
            })
        
            return
        }
        else{
          setNewName('')  
          return
        } 
      }
    
      personService
      .create(nameObject)
      .then(response =>{
        setPersons(persons.concat(response))
        setNewMessage(
          `Added ${newName}`
        )
        setTimeout(() => {
          setNewMessage(null)
        }, 2000)
        setNewName('')
        setNewNumber('')
      })
  }

  const handleNameChange = (event)  =>
    setNewName(event.target.value)
  
  const handleNumberChange = (event)  =>
    setNewNumber(event.target.value)
  
  const handleFilterChange = (event)  =>
    setNewFilter(event.target.value)
  
  const personsToShow =  persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newMessage} />
      <Filter value={newFilter} onChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} setPersons={setPersons} persons={persons} setNewMessage={setNewMessage}/>
    </div>
  )

}

export default App