const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
mongoose.set('useFindAndModify', false);
const Blog = require('../models/blog')

const blogs = [ { _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0, user: '5e8492c56fa6e22ef48c848a' },
  { _id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5, __v: 0, user: '5e8492c56fa6e22ef48c848a' },
  { _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12, __v: 0, user: '5e8492c56fa6e22ef48c848a' },
  { _id: '5a422b891b54a676234d17fa', title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', likes: 10, __v: 0, user: '5e8492c56fa6e22ef48c848a' },
  { _id: '5a422ba71b54a676234d17fb', title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', likes: 0, __v: 0, user: '5e8492c56fa6e22ef48c848a' },
  { _id: '5a422bc61b54a676234d17fc', title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', likes: 2, __v: 0, user: '5e8492c56fa6e22ef48c848a' }]


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(blogs)
})

test('notes are returned as json', async () => {
  const result = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(result.body).toHaveLength(blogs.length)
})

test('fields are id', async () =>{
  const result = await api
    .get('/api/blogs')
  expect(result.body[0].id).toBeDefined()
})

test('post method works', async () => {
  const newBlog = {
    title: 'MyBlog',
    author: 'Matti',
    url: 'https://reactpatterns.com/',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1hdHRpMTIzIiwiaWQiOiI1ZTg0OTJjNTZmYTZlMjJlZjQ4Yzg0OGEiLCJpYXQiOjE1ODU3NTE4NzJ9.AVpbeK9iscwLIowBjfD82K4Ftgd3r8jc7iTzC228e2E' )
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(blogs.length + 1)
})

test('status 401 when request doesnt contain a token', async () => {
  const newBlog = {
    title: 'MyBlog',
    author: 'Matti',
    url: 'https://reactpatterns.com/',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
})

test('likes are 0 when not set', async () => {
  const newBlog = {
    title: 'MyBlog',
    author: 'Matti',
    url: 'https://reactpatterns.com/',
    likes: null
  }

  const result = await api
    .post('/api/blogs')
    .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1hdHRpMTIzIiwiaWQiOiI1ZTg0OTJjNTZmYTZlMjJlZjQ4Yzg0OGEiLCJpYXQiOjE1ODU3NTE4NzJ9.AVpbeK9iscwLIowBjfD82K4Ftgd3r8jc7iTzC228e2E' )
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(result.body.likes).toBe(0)
})

test('statuscode 400 when no title and url', async () => {
  const newBlog = {
    title: '',
    author: 'Matti',
    url: '',
    likes: null
  }

  await api
    .post('/api/blogs')
    .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1hdHRpMTIzIiwiaWQiOiI1ZTg0OTJjNTZmYTZlMjJlZjQ4Yzg0OGEiLCJpYXQiOjE1ODU3NTE4NzJ9.AVpbeK9iscwLIowBjfD82K4Ftgd3r8jc7iTzC228e2E' )
    .send(newBlog)
    .expect(400)
})

test('statuscode 400 when no title and url', async () => {
  const newBlog = {
    title: '',
    author: 'Matti',
    url: '',
    likes: null
  }

  await api
    .post('/api/blogs')
    .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1hdHRpMTIzIiwiaWQiOiI1ZTg0OTJjNTZmYTZlMjJlZjQ4Yzg0OGEiLCJpYXQiOjE1ODU3NTE4NzJ9.AVpbeK9iscwLIowBjfD82K4Ftgd3r8jc7iTzC228e2E' )
    .send(newBlog)
    .expect(400)
})

test('editing a blog', async () => {
  const blogToEdit = blogs[0]
  blogToEdit.likes = 10
  await api
    .put(`/api/blogs/${blogToEdit._id}`)
    .send(blogToEdit)
    .expect(200)

  const returnedBlog = await api.get(`/api/blogs/${blogToEdit._id}`)
  expect(returnedBlog.body.likes).toBe(10)
})

test('deleting a blog', async () => {
  const blogToDelete = blogs[0]
  await api
    .delete(`/api/blogs/${blogToDelete._id}`)
    .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1hdHRpMTIzIiwiaWQiOiI1ZTg0OTJjNTZmYTZlMjJlZjQ4Yzg0OGEiLCJpYXQiOjE1ODU3NTE4NzJ9.AVpbeK9iscwLIowBjfD82K4Ftgd3r8jc7iTzC228e2E' )
    .expect(204)

  const returnedBlogs = await api.get('/api/blogs')
  expect(returnedBlogs.body).toHaveLength(blogs.length-1)
  expect(returnedBlogs.body).not.toContain(blogToDelete)
})


afterAll(() => {
  mongoose.connection.close()
})