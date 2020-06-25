import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote  = ({text, vote}) => <> {text}<br/>
has {vote} votes </>

const App = (props) => {
  const genRandInt = () => Math.floor(Math.random() * props.anecdotes.length)
  const [selected, setSelected] = useState(genRandInt())
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0))
  const topVoteIndex = votes.indexOf(Math.max(...votes));
  console.log(topVoteIndex);
  const updateVote = () => {
    console.log('clicked');
    const currentVote = votes[selected] + 1;
    const newVotes = [...votes];
    newVotes[selected] = currentVote;
    setVotes(newVotes);
  }
  return (
    <div>
      <h2>Anecdote of the day</h2>
       <Anecdote text={props.anecdotes[selected]} vote={votes[selected]}></Anecdote>
        <div>
          <button onClick={() => updateVote()}>vote</button>
          <button onClick={() => setSelected(genRandInt())}>next anecdote</button>
        </div>
      <div>
        <h2>Anecdote with most votes</h2>
       <Anecdote text={props.anecdotes[topVoteIndex]} vote={votes[topVoteIndex]}></Anecdote>

      </div>
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