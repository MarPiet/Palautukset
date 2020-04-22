import React, { useState } from 'react'

const BlogForm = ({ createBlog, user }) => {
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
      <h2>create a new blog</h2>

      <form onSubmit={addBlog}>
                title: <input id='title' value={title} onChange={handleTitleChange}/> <br></br>
                author: <input id='author' value={author} onChange={handleAuthorChange}/><br></br>
                url: <input id='url' value={url} onChange={handleUrlChange}/><br></br>
        <button id='submit' type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm