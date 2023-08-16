import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personsService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [message, setMessage] = useState(null)

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleNameFilterChange = (event) => setNameFilter(event.target.value);

  useEffect(() => {
    personsService.getAll().then(persons => setPersons(persons))
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null)
    }, 5000);
    return () => {
      clearTimeout(timer)
    }
  }, [message])

  const addPerson = (event) => {
    event.preventDefault()
    if (newName.length === 0) {
      return
    }

    const oldPerson = persons.find(person => person.name === newName)
    if (oldPerson) {
      if (!window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        return
      }

      const id = oldPerson.id
      const person = {
        ...oldPerson,
        number: newNumber
      }
      personsService.modify(id, person)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
          setMessage(`Modified ${person.name}'s number`)
        })
        .catch(error => {
          setMessage(`error:${error.response.data.error}`)
          console.log(error.response.data)
        })
      return
    }

    const person = {
      name: newName,
      number: newNumber,
    }

    personsService.create(person)
      .then(person => {
        setPersons(persons.concat(person))
        setMessage(`Added ${person.name} to phonebook`)
      })
      .catch(error => {
        setMessage(`error:${error.response.data.error}`)
        console.log(error.response.data)
      })
    setNewName('')
    setNewNumber('')
  }

  const removePerson = id => {
    const person = persons.find(item => item.id === id)
    if (!person) {
      setMessage(`error:${person.name} was already deleted from server`)
      return
    } else if (!window.confirm(`Delete ${person.name}?`)) {
        return
    }

    personsService.remove(id)
    .catch(error => { setMessage(`error:${person.name} was already deleted from server`) })
    setPersons(persons.filter(p => p.id !== id))
    setMessage(`Removed ${person.name} from phonebook`)
  }

  const personsToShow = nameFilter ? persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase())) : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter value={nameFilter} onChange={handleNameFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} removePerson={removePerson} />
    </div>
  )
}

export default App