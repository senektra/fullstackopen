const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.name} {props.exercises}</p>
    </>
  )
}

const Content = ({ parts }) => (
  <>
    {parts.map(part => (
      <div key={part.id}>
         <Part name={part.name} exercises={part.exercises} /> 
      </div>
    ))}
  </>
)

const Total = (props) => {
  const {parts} = props

  return (
    <>
      <p>
        <strong>total of {parts.reduce((sum, val) => sum += val.exercises, 0)} exercises</strong>
      </p>
    </>
  )
}

const Course = ({ courses }) => (
  <>
    {courses.map((course) => (
      <div key={course.id}>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    ))}
  </>
)

export default Course