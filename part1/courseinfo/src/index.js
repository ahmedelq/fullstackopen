import React from 'react'
import ReactDOM from 'react-dom'

const Part = (props) => {
  return (
    <p>{props.part} {props.exercises}</p>
  )
}

const Header = (props) => {
  return <h1>{props.course}</h1> 
}

const Total = (props) => {
  var total = 0
  for (var i=0; i < props.total.length; i++)
    total += props.total[i]
  return <p>Number of exercises {total}</p>
}

const Content = (props) => {
  let elts = []
 for(var i =0; i < props.parts.length; i++){
    elts.push(<Part part={props.parts[i]} exercises={props.exs[i]} />)
 } 
 return elts 
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const parts = [part1, part2, part3]
  const exs = [exercises1, exercises2, exercises3]


  return (
    <div>
      <Header course={course}/>
      <Content parts={parts} exs={exs}/> 
      <Total total={exs}/>
      </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))