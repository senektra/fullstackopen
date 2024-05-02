import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { cleanup } from '@testing-library/react'

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
  test('renders title and author but not url and likes', () => {
    render(<Blog blog={blog} />)

    const div = screen.getByText(`${blog.title} ${blog.author}`)

    expect(div).toBeDefined()
    expect(div).not.toHaveTextContent(blog.url)
  })

  test('renders url and likes when view button is clicked', async () => {
    let div
    const user = userEvent.setup()
    const container = render(<Blog blog={blog} />).container

    div = container.querySelector('.blog-content')
    expect(div).toBeNull()

    const button = screen.getByText('view')
    await user.click(button)
    div = container.querySelector('.blog-content')

    expect(div).not.toBeNull()
    expect(div).toHaveTextContent(blog.url)
    expect(div).toHaveTextContent(blog.likes)
  })

  test('clicking like button registers once for each click', async () => {
    const user = userEvent.setup()
    const handleLike = vi.fn()

    render(<Blog blog={blog} onUpdate={handleLike} />)

    // Open the blog content
    const viewButton = screen.getAllByText('view')
    await user.click(viewButton[0])

    const likesButton = screen.getByText('like')
    await user.click(likesButton)
    await user.click(likesButton)

    expect(handleLike.mock.calls).toHaveLength(2)
  })
})

