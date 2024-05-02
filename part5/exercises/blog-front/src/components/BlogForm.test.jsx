import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

const blog = {
  title: 'Component testing is done with react-testing-library',
  author: 'Test Author',
  url: 'http://test.url',
  likes: 10,
  user: {
    username: 'testuser'
  }
}

describe('Blog', () => {
  test('clicking like button registers once for each click', async () => {
    const handleCreateBlog = vi.fn()

    render(<BlogForm onNewBlog={handleCreateBlog} />)

    const titleInput = screen.getByPlaceholderText('Title')
    await userEvent.type(titleInput, blog.title)

    const authorInput = screen.getByPlaceholderText('Author')
    await userEvent.type(authorInput, blog.author)

    const urlInput = screen.getByPlaceholderText('URL')
    await userEvent.type(urlInput, blog.url)

    const createButton = screen.getByText('create')
    await userEvent.click(createButton)

    expect(handleCreateBlog.mock.calls).toHaveLength(1)
    expect(handleCreateBlog.mock.calls[0][0].title).toBe(blog.title)
    expect(handleCreateBlog.mock.calls[0][0].author).toBe(blog.author)
    expect(handleCreateBlog.mock.calls[0][0].url).toBe(blog.url)
  })
})
