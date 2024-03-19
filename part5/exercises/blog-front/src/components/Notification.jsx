import { useState, useEffect } from "react"

const Notification = ({ message }) => {
  const [notifMessage, setNotifMessage] = useState(null)
  const [timeoutId, setTimeoutId] = useState(null)

  useEffect(() => {
    if (message) {
      setNotifMessage(message)
      const newTimeoutId = setTimeout(() => {
        setNotifMessage(null)
      }, 5000)

      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      setTimeoutId(newTimeoutId)
    }
  }, [message])

  if (!notifMessage)
    return null
  else
    return (
      <div>
        {notifMessage.type}: {notifMessage.content}
      </div>
    )
}

export default Notification
