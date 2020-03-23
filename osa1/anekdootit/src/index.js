import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([])
  
    const newAnecdote = () =>{
        setSelected(Math.round(Math.random() * (anecdotes.length-1)))
    }

    const voteAnecdote = () =>{
        let copy = new Uint8Array(anecdotes.length); 
        if(votes.length === anecdotes.length)
            copy = [...votes]

        copy[selected] += 1
        setVotes(copy)
    }

  return (
    <div>
        <h1>Anecdote of the day</h1>
        {props.anecdotes[selected]}
        <br></br>
        has {votes[selected]} votes
        <button onClick={() => voteAnecdote()}>vote</button>
        <button onClick={() => newAnecdote()}>next anecdote</button>
        <h1>Anecdote with most votes</h1>
        {anecdotes[votes.indexOf(Math.max(...votes))]}
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)