import React, { useState } from 'react'

const Blog = ({ blog, editLikes, deleteBlog, username }) => {
  const [showAll, setShowAll] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenVisible = { display: showAll ? 'none' : '' }
  const showWhenVisible = { display: showAll ? '' : 'none' }

  const handleClick = () => {
    setShowAll(!showAll)
  }

  const handleLike = () => {
    editLikes({
      id: blog.id,
      user: blog.user.id,
      likes: likes+1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    })
    setLikes(likes+1)
  }

  const clickRemove = () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
      deleteBlog(blog.id)
  }

  return(
    <div style={blogStyle}>
      {blog.title} {blog.author}
      {!showAll
        ?<button style={hideWhenVisible} onClick = {() => handleClick()}>view</button>
        :<>
          <button style={showWhenVisible} onClick = {() => handleClick()}>hide</button>
          <br />
          {blog.url}
          <br />
        likes {likes}  <button onClick={() => handleLike()}>like</button>
          <br />
          {blog.user.name}
          <br />
          {blog.user.username === username
            ?<button onClick={() => clickRemove()} style={{ backgroundColor:'lightblue' }}>remove</button>
            :null}
        </>}
    </div>
  )
}

export default Blog
