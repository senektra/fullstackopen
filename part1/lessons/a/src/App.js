const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  )
}

const App = () => {
  const [name, age] = ['Peter', 10]
  const friends = ['Fred', 'Robert']

  return (
    <>
      <p>Greetings</p>
      <Hello name='Maya' age={26 + 10} />
      <Hello name={name} age={age} />
      <p>{friends}</p>
    </>
  )
}

export default App;
