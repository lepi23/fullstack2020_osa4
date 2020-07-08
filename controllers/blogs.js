const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')





//kaikkien blogien haku
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)    
})

  
blogsRouter.post('/', async (request, response) => {
    const body = request.body
    if (!request.token) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    //verify ei toimi ilman tyhjää tai jotain muuta stringiä alussa
    const decodedToken = jwt.verify(request.token, ''+process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user.id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (!request.token) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    console.log(blog.user.toString())
    const decodedToken = jwt.verify(request.token, ''+process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    if (blog.user.toString() !== decodedToken.id.toString()){
        return response.status(400).json({error: 'blogs can only be removed by the adder of the blog'})
    }

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})
blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog.toJSON())
})


module.exports = blogsRouter