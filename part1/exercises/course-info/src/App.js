const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <>
      <p>{props.part} {props.exercise}</p>
    </>
  )
}

const Content = (props) => {
  console.log(props)

  const {name: name1, exercises: exercises1} = props.part1
  const {name: name2, exercises: exercises2} = props.part2
  const {name: name3, exercises: exercises3} = props.part3

  return (
    <>
      <Part part={name1} exercise={exercises1} />
      <Part part={name2} exercise={exercises2} />
      <Part part={name3} exercise={exercises3} />
    </>
  )
}

const Total = (props) => {
  console.log(props)

  return (
    <>
      <p>Number of exercises {props.total}</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course}/>
      <Content part1={part1} part2={part2} part3={part3} />
      <Total total={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

export default App
