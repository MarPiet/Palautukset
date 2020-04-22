import React from 'react'
import { useDispatch  } from 'react-redux'
import { likeBlog, commentBlog } from '../reducers/blogReducer'
import { Form, Table, Button } from 'react-bootstrap'

const SingleBlog = ({ blog, deleteBlog, username }) => {
  const dispatch = useDispatch()

  const handleLike = (blog) => {
    dispatch(likeBlog(blog))
  }
  const clickRemove = () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
      deleteBlog(blog.id)
  }
  if(!blog) {
    return null
  }

  const addComment = (e) => {
    e.preventDefault()
    dispatch(commentBlog(blog.id, e.target[0].value))
    e.target[0].value = ''
  }

  return(
    <div>
      <h1>{blog.title}</h1>
      {blog.likes} Likes
      <Button style={{ marginLeft:'20px' }} onClick={() => handleLike(blog)}> <span aria-labelledby="jsx-a11y/accessible-emoji" role="img">&#128077;</span></Button>
      <br/>
      Added By {blog.user.name}
      <br/>
      {blog.user.username === username
        ?<Button variant="danger" onClick={() => clickRemove()} >Remove</Button>
        :null}
      <br/>
      <br/>
      <Form onSubmit={addComment}>
        <Form.Label>Add a Comment</Form.Label>
        <Form.Control placeholder="Comment" />
        <Button style={{ marginTop:'5px', marginBottom:'15px' }} type="submit">Comment</Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {blog.comments.map((comment, index) =>
            <tr key={index}>
              <td>{comment.comment}</td>
            </tr>
          )}
        </tbody>
      </Table>

    </div>
  )
}

export default SingleBlog