import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import personService from './services/person'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [infoMessage, setInfoMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService.getAll()
    .then(response => {
      setPersons(response.data)
      console.log(response)
    })
  }, [setPersons])

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const filterer = persons.find(person => person.name === newName)
    if(filterer) {
      if(window.confirm(`${newName} is already added in the phonebook. Change the number?`)) {
        const person = persons.find(p => p.id === filterer.id)
        console.log(person)
        const changedNumber = {...person, number: newNumber}
        personService.editPerson(changedNumber, person.id)
        .then(response => {
          setPersons(persons.map(p => p.id !== person.id ? p : response.data))
          setInfoMessage(`${newName} number changed`)
        })
        .catch(error => {
          setErrorMessage(`${newName} has already removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== id))
        })
      }
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
      }
      personService.addNew(nameObject)
      .then(createdPerson => {
        console.log(createdPerson)
        personService.getAll()
        .then(response => {
          setPersons(response.data)
          console.log(response)
        })

        setInfoMessage(`${newName} added`)
        console.log(nameObject)
      })
      .catch(error => {
        console.log(error.response.data.error)
        setErrorMessage(error.response.data.error)
      })
    }
    setNewName('')
    setNewNumber('')
    setTimeout(() => {
      setInfoMessage(null)
      setErrorMessage(null)
    }, 5000)
  }

  const handleName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    console.log(event.target.value)
    setFilteredName(event.target.value)
    const filterer = persons.filter(person => person.name.includes(event.target.value))
    if(filterer) {
      setShowAll(false)
    }
  }

  const handleDelete = (id) => {
    const name = persons.find(person => person.id === id)
    if(window.confirm(`Poistetaanko ${name.name}?`)) {
      personService.removePerson(id)
      console.log(id)
      setPersons(persons.filter(person => person.id !== id))
      setInfoMessage(`${name.name} deleted`)
      setTimeout(() => {
        setInfoMessage(null)
      }, 5000)
    }
  }

  const personsToShow = showAll ? persons : persons.filter(person => person.name.includes(filteredName))

  return (
    <>
    <div>
      <h2>Phonebook</h2>
      <Notification message={infoMessage}/>
      <Error message={errorMessage}/>
      <Filter filteredName={filteredName} handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm 
        newName={newName}
        handleName={handleName}
        newNumber={newNumber}
        handleNumber={handleNumber} 
        handleSubmit={handleSubmit}
        />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
      </div>
    </>
  )

}

export default App