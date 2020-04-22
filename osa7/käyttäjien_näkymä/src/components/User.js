import React, { useEffect } from 'react'
import { getAllUsers } from '../reducers/userInfosReducer'
import { useSelector, useDispatch  } from 'react-redux'
import { useRouteMatch, Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'


const User =  () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])
  const users = useSelector(state => state.userInfos)
  const match = useRouteMatch('/users/:id')
  const user = match
    ? users.find(user => user.id === match.params.id)
    : null
  if(!user){
    return null
  }

  return(
    <div>
      <h1>{user.name}</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Added Blogs</th>
          </tr>
        </thead>
        <tbody>
          {user.blogs.map(blog =>
            <tr key={blog.id}><td><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></td></tr>
          )}
        </tbody>
      </Table>
    </div>

  )
}

export default User