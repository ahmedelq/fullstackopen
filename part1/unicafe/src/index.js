import React, {useState} from 'react';
import ReactDOM from 'react-dom';



const Button = ({action, name}) => 
      <button onClick={action}>{name}</button>
const Statistic  = ({text, value}) => 
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>


const Statistics = ({ratings}) => {
  let total = Object.values(ratings).reduce((x,y) => x + y, 0);
  const {good, neutral, bad} = ratings;
  if (total === 0)
    return <> <h2>statistics</h2> <p>No feedback given</p> </>
 


    return <>
    <h2>statistics</h2>
    <table>
      <tbody>
    <Statistic  text='good' value={good} ></Statistic>
    <Statistic  text='neutral' value={neutral}></Statistic>
    <Statistic  text='bad' value={bad}></Statistic>
    <Statistic  text='all' value={total}></Statistic>
    <Statistic  text='average'  value={(good / total) * 100 + '%'}></Statistic>
      </tbody>
    </table>
    </>
} 
      const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const makeFunc = (func, val) => () => func(val + 1);
  return (
    <div>
      <h1>give feedback</h1>
      <Button action={makeFunc(setGood, good)} name='good'></Button>
      <Button action={makeFunc(setNeutral, neutral)} name='neutral'></Button>
      <Button action={makeFunc(setBad, bad)} name='bad'></Button>
      <Statistics  ratings={{good, neutral, bad}}></Statistics>
    </div>
  )
}


ReactDOM.render(<App />, 
  document.getElementById('root')
)