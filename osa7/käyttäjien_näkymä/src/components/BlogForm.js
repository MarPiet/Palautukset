import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
      likes: 0
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <div>
      <h2>Create a New Blog</h2>
      <Form onSubmit={addBlog}>
        <Form.Label>Title</Form.Label>
        <Form.Control placeholder="Enter Title" onChange={handleTitleChange} />
        <Form.Label>Author</Form.Label>
        <Form.Control placeholder="Enter Author" onChange={handleAuthorChange}/>
        <Form.Label>Url</Form.Label>
        <Form.Control placeholder="Enter Url" onChange={handleUrlChange}/>
        <Button variant="primary" type="submit"> Create </Button>
      </Form>
    </div>
  )
}

export default BlogForm