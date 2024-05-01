import { render, screen } from '@testing-library/react'
import NoteForm from './NoteForm'
import userEvent from '@testing-library/user-event'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  // Mock function that gets passed to NoteForm component
  const createNote = vi.fn()
  // Setup up user session
  const user = userEvent.setup()

  // Render the NoteForm component
  render(<NoteForm createNote={createNote} />)

  // Get the input field and the button
  const input = screen.getByPlaceholderText('write note content here')
  const sendButton = screen.getByText('save')

  // Type into the input field and click the button
  await user.type(input, 'testing a form...')
  await user.click(sendButton)

  // Check that the form is submitted correctly
  expect(createNote.mock.calls).toHaveLength(1)
  // Check that the content of the note is correct
  expect(createNote.mock.calls[0][0].content).toBe('testing a form...')

  // Additional text methods worth noting:
  // 1. screen.getByText('save', { exact: false } - matches partial text
  // 2. screen.getByText('save', { selector: 'button' }) - matches button elements
  // 3. screen.findByText('save') - matches partially and asynchronously
  // 4. screen.queryByText('save') - matches partially and returns null if not found
})
