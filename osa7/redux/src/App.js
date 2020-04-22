import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { useSelector, useDispatch  } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, removeBlog } from './reducers/blogReducer'
import { setUser, logOut, initLogin } from './reducers/userReducer'

const App = () => {
  const blogs = useSelector(state => state.blog)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector(state => state.user)
  const notificationMessage = useSelector(state => state.notification)
  const dispatch = useDispatch()

  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initLogin())
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      dispatch(setUser(username, password))
      setUsername('')
      setPassword('')
    }
    catch(exception){
      dispatch(setNotification('wrong username or password', 5))

    }
    console.log(notificationMessage)
  }

  const handleLogout = () => {
    dispatch(logOut())
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try{
      dispatch(createBlog(blogObject, user))
      dispatch(setNotification( `a new blog ${blogObject.title} by ${blogObject.author} added`, 5))
    }
    catch(exception){
      dispatch(setNotification('error', 5))
    }
  }

  const deleteBlog = (id) => {
    dispatch(removeBlog(id))
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
      <BlogForm createBlog={addBlog} user={user}/>
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
        <Blog key={blog.id} blog={blog} username={user.username} deleteBlog={deleteBlog}/>
      )}
    </div>
  )

}

export default App