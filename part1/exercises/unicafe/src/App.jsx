import { useState } from 'react'

const Header = ({ title }) => <h1>{title}</h1>

const Button = ({ handleClick, text }) =>
  <button onClick={handleClick}>{text}</button>

const StatisticRow = ({ type, value }) =>
  <tr>
    <th scope="row">{type}</th>
    <td>{value}</td>
  </tr>

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad

  if (total === 0) {
    return (
      <div>No feedback given</div>
    )
  }

  const average = ((good + (-bad))/total).toFixed(1)
  const positive = (good / total * 100).toFixed(1)

  return (
    <table>
      <tbody>
        <StatisticRow type='good' value={good} />
        <StatisticRow type='neutral' value={neutral} />
        <StatisticRow type='bad' value={bad} />
        <StatisticRow type='all' value={total} />
        <StatisticRow type='average' value={average} />
        <StatisticRow type='positive' value={positive + '%'} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickRating = (ratingSetter, newValue)  => () =>
    ratingSetter(newValue)

  return (
    <div>
      <Header title='give feedback' />
      <Button handleClick={handleClickRating(setGood, good + 1)} text='good' />
      <Button handleClick={handleClickRating(setNeutral, neutral + 1)} text='neutral' />
      <Button handleClick={handleClickRating(setBad, bad + 1)} text='bad' />
      <Header title='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
