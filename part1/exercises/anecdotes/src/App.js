import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Anecdote = ({anecdote, votes}) => (
  <>
    <h3>{anecdote}</h3>
    <p>has {votes} votes</p>
  </>  
)
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const nextAnecdote = () => setSelected(Math.floor(Math.random() * anecdotes.length))

  const vote = () => {
    const newVotes = [...votes]
    newVotes[selected]++
    setVotes(newVotes)
  }

  const mostVoted = votes.reduce(
    (acc, curr, idx) => curr > votes[acc] ? acc = idx : acc, 
    0
  )
  
  return (
    <div>
      <div>
        <h1>Anecdote of the Day</h1>
        <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]}/>
        <Button onClick={vote} text={"vote"}></Button>
        <Button onClick={nextAnecdote} text={"next anecdote"} />
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <Anecdote anecdote={anecdotes[mostVoted]} votes={votes[mostVoted]}/>
      </div>
    </div>
  )
}

export default App
