const Notification = ({ msg }) => {
  if (!msg.text) return

  return (
    <div className={`notif-${msg.color}`}>
      {msg.text}
    </div>
  )
}

export default Notification
