import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Header = ({text}) => <h1>{text}</h1>
const Display = ({text}) => <p>{text}</p>
const DisplayAnecdoteAndVote = ({text, vote}) => {
  return (
    <div>
      <Display text={text} />
      <Display text={'has ' + vote + ' votes'} />
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const arr = Array(anecdotes.length).fill(0);
  const [voted, setVote] = useState(arr)

  const handleNext = () => {
    let randomItem = Math.floor(Math.random() * anecdotes.length);
    if (randomItem === selected) {
      randomItem = (selected + 1) % anecdotes.length
    }
    setSelected(randomItem)
  }

  const addVote = () => {
    const copy = [ ...voted ]
    copy[selected] += 1
    setVote(copy)
  }

  const maxIndex = voted.indexOf(Math.max(...voted))

  return (
    <div>
      <Header text='Anecdote of the day' />
      <DisplayAnecdoteAndVote text={anecdotes[selected]} vote={voted[selected]} />
      <Button handleClick={addVote} text='vote' />
      <Button handleClick={handleNext} text='next anecdote' />
      <Header text='Anecdote with most votes' />
      <DisplayAnecdoteAndVote text={anecdotes[maxIndex]} vote={voted[maxIndex]} />
    </div>
  )
}

export default App