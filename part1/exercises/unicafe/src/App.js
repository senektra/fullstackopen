import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({text, stat}) => (
  <tr>
    <td>{text}</td>
    <td>{stat}</td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const average = (good + -bad) / total || 0
  const positive = (good / total) * 100 || 0

  if (!total) {
    return <p>No feedback given</p>
  }

  return (
    <table>
      <tbody>
        <StatisticLine text={"Good"} stat={good} />
        <StatisticLine text={"Neutral"} stat={neutral} />
        <StatisticLine text={"Bad"} stat={bad} />
        <StatisticLine text={"Average"} stat={average} />
        <StatisticLine text={"Positive"} stat={`${positive} %`} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text={"Good"} />
      <Button onClick={handleNeutralClick} text={"Neutral"} />
      <Button onClick={handleBadClick} text={"Bad"} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App