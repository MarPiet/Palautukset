import React, { useState, useEffect } from 'react'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import User from './components/User'
import SingleBlog from './components/SingleBlog'
import { useSelector, useDispatch  } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, removeBlog } from './reducers/blogReducer'
import { setUser, logOut, initLogin } from './reducers/userReducer'
import { Navbar, Nav, Button } from 'react-bootstrap'


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
    <Togglable buttonLabel = 'Create New Blog' ref = {blogFormRef}>
      <BlogForm createBlog={addBlog} user={user}/>
    </Togglable>
  )
  const match = useRouteMatch('/blogs/:id')
  const blog = match
    ? blogs.find(anecdote => anecdote.id === match.params.id)
    : null

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
    <div className="container">
      <Navbar bg="dark" variant="dark">
        <Nav><Link to="/" style={{ margin: '5px' }}>Blogs</Link></Nav>
        <Nav><Link to="/users"  style={{ margin: '5px' }}>Users</Link></Nav>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text style={{ marginRight:'10px', color:'white' }}>
            Signed in as: {user.name}
          </Navbar.Text>
        </Navbar.Collapse>

        <Button variant="danger" onClick={() => handleLogout()}>Logout</Button>


      </Navbar>
      <Notification message={notificationMessage} />
      <Switch>
        <Route path="/users/:id">
          <User/>
        </Route>
        <Route path="/users">
          <Users/>
        </Route>
        <Route path="/blogs/:id">
          <SingleBlog blog={blog} deleteBlog={deleteBlog} username={user.username}/>
        </Route>
        <Route path="/">
          <div>
            <h2>Blog App</h2>
            {blogForm()}
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} username={user.username} deleteBlog={deleteBlog}/>
            )}
          </div>

        </Route>

      </Switch>
    </div>

  )

}

export default App