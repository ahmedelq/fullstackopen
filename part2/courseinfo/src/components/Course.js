import React from 'react'

const Part = (props) => {
    return (
      <p>{props.part} {props.exercises}</p>
    )
  }
  
  const Header = ({course}) => {
    return <h1>{course}</h1> 
  }
  
  const Total = ({parts}) => 
  <strong>total of {parts.reduce(
    (a,b) => a + b.exercises, 0)} exercises</strong>
  
  
  const Content = ({parts}) => 
    parts.map(part => 
    <Part key={part.id} part={part.name} exercises={part.exercises} />);
  
  
  const Course = ({course}) => {
    return <>
      <div>
        <Header course={course.name}/>
        <Content parts={course.parts} /> 
        <Total parts={course.parts}/>
      </div>
    </>
  }
  
  export default Course