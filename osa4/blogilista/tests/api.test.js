const listHelper = require('../utils/list_helper')
const blogs = [ { _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0 },
  { _id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5, __v: 0 },
  { _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12, __v: 0 },
  { _id: '5a422b891b54a676234d17fa', title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', likes: 10, __v: 0 },
  { _id: '5a422ba71b54a676234d17fb', title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', likes: 0, __v: 0 },
  { _id: '5a422bc61b54a676234d17fc', title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', likes: 2, __v: 0 }]

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const oneBlogList = [
    { _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0 }
  ]
  const noLikesList = [
    { _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 0, __v: 0 }
  ]

  test('blogtest', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })

  test('test with one blog', () => {
    const result = listHelper.totalLikes(oneBlogList)
    expect(result).toBe(7)
  })

  test('test with 0 likes', () => {
    const result = listHelper.totalLikes(noLikesList)
    expect(result).toBe(0)
  })
})

describe('favorite blogs', () => {
  let testBlog = {
    title: blogs[2].title,
    author: blogs[2].author,
    likes: blogs[2].likes
  }
  test('blog with most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(testBlog)
  })
})

describe('most blogs', () => {
  let testBlog = {
    author: blogs[3].author,
    blogs: 3
  }
  test('author with most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual(testBlog)
  })
})

describe('most likes', () => {
  let testAuthor = {
    author: blogs[2].author,
    likes: 17
  }
  test('author with most likes', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual(testAuthor)
  })
})