const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const testBlogs = require('./testBlogs')

const initialBlogs = testBlogs.blogs

//console.log(initialBlogs) 
beforeEach(async () => {
    await Blog.deleteMany({})
    console.log('cleared')
    await Blog.insertMany(initialBlogs)

/*
    var i
    for (i = 0; i < initialBlogs.length; i++) {
        let blogObject = new Blog(initialBlogs[i])
        await blogObject.save()
    }  */ 
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    //console.log(response.body)
    expect(response.body).toHaveLength(initialBlogs.length)
})

test('all blog identifiers are called "id" ', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach((blog) => { 
        expect(blog.id).toBeDefined()
    })
})
test('a valid blog can be added ', async () => {
    const newBlog = {
        title: 'test we must',
        author: 'Yoda',
        url: 'http//:www.yodaguru.net',
        likes: 90
    }
  
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const title = response.body.map(r => r.title)
  
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(title).toContain(
        'test we must'
    )
})
test('if likes are not defined its value is 0', async () => {
    const newBlog = {
        title: 'no body likes me ):',
        author: 'leevi',
        url: 'http//:www.loner.net'
    }
    await api
        .post('/api/blogs')
        .send(newBlog)

    const response = await api.get('/api/blogs')
    const likes = response.body[response.body.length-1].likes
    //console.log(likes)
    expect(likes).toEqual(0)
})

test('if posted blog is missing title OR url a bad request(400) is responded', async () => {
    const newBlog = {
        author: 'leevi'
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400) 
})
afterAll(() => {
    mongoose.connection.close()
})