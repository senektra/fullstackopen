import { useState } from 'react'

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

// The Clicks example app
const Clicks = () => {
  const [clicks, setClicks] = useState({
    left: 0, right: 0
  })

  const [allClicks, setAll] = useState([])
  // const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    const newLeftClicks = clicks.left + 1
    setClicks({left: newLeftClicks, right: clicks.right})
    // setTotal(newLeftClicks + clicks.right)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    const newRightClicks = clicks.right + 1
    setClicks({left: clicks.left, right: newRightClicks})
    // setTotal(clicks.left + newRightClicks)
  }

  return (
    <div>
      {clicks.left}
      <Button handleClick={handleLeftClick} text='Left' />
      <Button handleClick={handleRightClick} text='Right' />
      {clicks.right}
      <History allClicks={allClicks} />
    </div>
  )
}

// The value example app
const SetValue = () => {
  const [value, setValue] = useState(10)
  
  const setToValue = (newValue) => () => {
    console.log('value now', newValue)  // print the new value to console
    setValue(newValue)
  }
  
  return (
    <div>
      {value}
      <Button handleClick={setToValue(1000)} text={'thousand'} />
      <Button handleClick={setToValue(0)} text={'reset'} />
      <Button handleClick={setToValue(value + 1)} text={'increment'} />
    </div>
  )
}

const App = () => {
  return (
    <>
      <Clicks />
      <SetValue />
    </>
  )
}

export default App