const Notification = ({ notif }) => {
  if (notif.message === null) {
    return null
  } else {
    return (
      <div className={`notification-${notif.type}`}>
        {notif.message}
      </div>
    )
  }
}

export default Notification