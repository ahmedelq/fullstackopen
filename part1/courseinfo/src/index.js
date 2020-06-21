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
  for (var i=0; i < props.parts.length; i++)
    total += props.parts[i].exercises
  return <p>Number of exercises {total}</p>
}

const Content = (props) => {
  let elts = []
 for(var i =0; i < props.parts.length; i++){
    elts.push(<Part part={props.parts[i].name} exercises={props.parts[i].exercises} />)
 } 
 return elts 
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts} /> 
      <Total parts={course.parts}/>
      </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))