const Part = ({ name, exercises }) =>
  <p>{name} {exercises}</p>

const Header = ({ title }) => <h1>{title}</h1>

const Content = ({ parts }) => 
  <div>
    {parts.map(part =>
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    )}
  </div>

const Total = ({ parts }) =>
  <p>
    <b>
      total of {parts.reduce((sum, curr) => sum + curr.exercises, 0)} exercises
    </b>
  </p>

const Course = ({ course }) => {
  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course