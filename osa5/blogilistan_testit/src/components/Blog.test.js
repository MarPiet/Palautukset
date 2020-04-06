import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


describe('Blog Tests', () => {
  let component
  beforeEach(() => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Matti',
      url: 'www.google.com',
      likes: 4,
      user: '5e8492c56fa6e22ef48c848a'
    }
    component = render(
      <Blog blog={blog}  />
    )
  })

  test('only renders title and author on default', () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Matti',
      url: 'www.google.com',
      likes: 4
    }
    const component = render(
      <Blog blog={blog} />
    )
    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
    expect(component.container).toHaveTextContent(
      'Matti'
    )
    expect(component.container.querySelector('.togglable')).toBeNull()
  })

  test('likes and url are rendered when view button is pressed', () => {
    const button = component.getByText('view')
    fireEvent.click(button)
    expect(component.container).toHaveTextContent('www.google.com')
    expect(component.container).toHaveTextContent('4')
  })
})

test('event handler is called twice when like is pressed twice', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Matti',
    url: 'www.google.com',
    likes: 4,
    user: '5e8492c56fa6e22ef48c848a'
  }
  const like = jest.fn()

  const component = render(
    <Blog blog={blog} editLikes={like} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  const button2 = component.getByText('like')
  fireEvent.click(button2)
  fireEvent.click(button2)

  expect(like.mock.calls).toHaveLength(2)

})