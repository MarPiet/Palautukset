import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Blog = ({ blog }) => {


  return(
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Blog</th>
          <th>Author</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ width: '50%' }}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></td>
          <td>{blog.author}</td>
        </tr>
      </tbody>
    </Table>

  )
}

export default Blog

