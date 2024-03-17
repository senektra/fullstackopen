const Note = ({ note, toggleImportant }) => {
  const label = note.important
    ? 'make not important' : 'make important'
  
  return (
    <li className='note'>
      {note.content}<span> </span>
      <button onClick={toggleImportant}>{label}</button>
    </li>
  )
}

export default Note