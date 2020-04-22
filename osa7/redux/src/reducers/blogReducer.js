import blogService from '../services/blogs'


export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}
export const createBlog = (blog, user) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    newBlog.user = user
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.deleteBlog(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: id
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const newBlog = blog
    newBlog.likes = newBlog.likes + 1
    const response = await blogService.likeBlog(newBlog)
    dispatch({
      type: 'LIKE_BLOG',
      data:  response
    })
  }
}

const sortFunc = (blogs) => {
  return blogs.sort(function(a,b){
    return b.likes - a.likes
  })
}

const reducer = (state = [], action) => {
  switch(action.type){
  case 'INIT_BLOGS':{
    let arrangedBlogs = action.data
    return sortFunc(arrangedBlogs)
  }
  case 'NEW_BLOG':
    return[...state, action.data]
  case 'LIKE_BLOG':{
    const blogToVote = state.find(a => a.id === action.data.id)
    let newState = state.map(blog =>
      blog.id !== action.data.id ? blog : blogToVote )
    return sortFunc(newState)
  }
  case 'DELETE_BLOG':{
    let newState = state.filter(blog => blog.id !== action.data)
    return newState
  }
  default:
    return state
  }
}

export default reducer