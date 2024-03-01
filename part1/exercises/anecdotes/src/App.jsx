import { useState } from 'react'

const Button = ({ handleClick, text }) => 
  <button onClick={handleClick}>{text}</button>

const MostVoted = ({ mostVoted }) => {
  if (mostVoted === null) {
    return (
      <h1>No votes yet</h1>
    )
  }
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{mostVoted}</p>
    </div>

  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [selected, setSelected] = useState(0)
  const [mostVoted, setMostVoted] = useState(-1)

  const handleClick = () => {
    let rand = selected
    while ((rand = Math.floor(Math.random() * anecdotes.length)) === selected);
    setSelected(rand)
  }

  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected]++
    setVotes(newVotes)

    if (newVotes[selected] > votes[mostVoted] || mostVoted === -1) {
      setMostVoted(selected)
    }
  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button handleClick={handleClick} text='next' />
      <Button handleClick={handleVote} text='vote' />
      <MostVoted mostVoted={mostVoted === -1 ? null : anecdotes[mostVoted]}/>
    </div>
  )
}

export default App
