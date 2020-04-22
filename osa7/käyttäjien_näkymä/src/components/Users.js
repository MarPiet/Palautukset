import React, { useEffect } from 'react'
import { getAllUsers } from '../reducers/userInfosReducer'
import { useSelector, useDispatch  } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'


const Users =  () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])
  const users = useSelector(state => state.userInfos)

  return(
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Users</th>
          <th>Blogs Created</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user =>
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}

export default Users