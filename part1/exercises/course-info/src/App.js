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

  const {name: name1, exercises: exercises1} = props.parts[0]
  const {name: name2, exercises: exercises2} = props.parts[1]
  const {name: name3, exercises: exercises3} = props.parts[2]

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
  const {parts} = props

  return (
    <>
      <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
    </>
  )
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
      <Total parts={course.parts} />
    </div>
  )
}

export default App
