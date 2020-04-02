const  _lodash = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) =>{
  const likeArr = blogs.map(blog => blog.likes)

  function sumLikes(total, num){
    return total + num
  }
  return likeArr.reduce(sumLikes)
}

const favoriteBlog = (blogs) => {
  const likeArr = blogs.map(blog => blog.likes)
  const blog = blogs[likeArr.indexOf(Math.max(...likeArr))]

  let returnBlog = {
    title: blog.title,
    author: blog.author,
    likes: blog.likes
  }

  return returnBlog
}

const mostBlogs = (blogs) => {
  let tempVal = 0
  let tempStr = ''
  const authorArr = blogs.map(blog => blog.author)
  const result = _lodash.pick(_lodash.countBy(blogs, 'author'), authorArr)

  authorArr.forEach((author) => {
    if(result[author] > tempVal){
      tempVal = result[author]
      tempStr = author
    }
  })

  let returnAuthor = {
    author: tempStr,
    blogs: tempVal
  }
  return(returnAuthor)
}

const mostLikes = (blogs) => {
  let returnVal = 0
  let returnStr = ''
  let tempVal = 0

  blogs.forEach((i) => {
    blogs.filter(blog => blog.author === i.author).forEach((bloglikes) => {
      tempVal += bloglikes.likes
    })
    if(returnVal < tempVal){
      returnVal = tempVal
      returnStr = i.author
    }
    tempVal = 0
  })

  let returnAuthor = {
    author: returnStr,
    likes: returnVal
  }
  return(returnAuthor)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}

