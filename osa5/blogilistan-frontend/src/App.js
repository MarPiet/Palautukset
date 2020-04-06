import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll()
      .then(blogs => blogs.sort(function(a,b){
        return b.likes - a.likes})
      )
      .then(blogs =>
        setBlogs(blogs)
      )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch(exception){
      setNotificationMessage('wrong username or password')
      setTimeout(() => {
        setNotificationMessage(null)
      }, (5000))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try{
      await blogService.create(blogObject)
      const returnedBlogs = await blogService.getAll()
      setBlogs(returnedBlogs)
      setNotificationMessage(
        `a new blog ${blogObject.title} by ${blogObject.author} added`
      )
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
    catch(exception){
      setNotificationMessage('error')
      setTimeout(() => {
        setNotificationMessage(null)
      }, (5000))
    }
  }

  const editLikes = async (blogObject) => {
    const newBlogs = [...blogs]
    const i = newBlogs.findIndex(blog => blog.id === blogObject.id)
    newBlogs[i].likes = newBlogs[i].likes + 1
    setBlogs(newBlogs)
    console.log(newBlogs)
    await blogService.likeBlog(blogObject)

    setBlogs(blogs.sort(function(a,b){
      return b.likes - a.likes}))
  }

  const deleteBlog = (id) => {
    blogService.deleteBlog(id)
    setBlogs(blogs.filter(blog => blog.id !== id))
  }

  const loginForm = () => (
    <Togglable buttonLabel = 'login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel = 'create new blog' ref = {blogFormRef}>
      <BlogForm createBlog={addBlog}/>
    </Togglable>
  )

  if(user === null){
    return(
      <div>
        <h2>Log in to application</h2>
        <Notification message={notificationMessage} />
        {loginForm()}
      </div>
    )
  }
  return(
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} />
      {user.name} has logged in <button onClick={() => handleLogout()}>logout</button>
      <h2>create new</h2>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} editLikes={editLikes} username={user.username} deleteBlog={deleteBlog}/>
      )}
    </div>
  )

}

export default App