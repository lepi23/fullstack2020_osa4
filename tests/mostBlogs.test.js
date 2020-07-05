const listHelper = require('../utils/list_helper')
const testBlogs = require('./testBlogs')

describe('most blogs', () => {
    test('when list has only one blog equals the author of that blog and blog count to be 1', () => {
        const result = listHelper.mostBlogs(testBlogs.listWithOneBlog)
        expect(result).toEqual({author: 'Edsger W. Dijkstra',blogs: 1})
    })
    test('of empty list is an empty object', () => {
        const result = listHelper.mostBlogs([])
        expect(result).toEqual({})
    })
    test('of a bigger list is chosen right', () => {
        const result = listHelper.mostBlogs(testBlogs.blogs)
        expect(result).toEqual({author: 'Robert C. Martin', blogs: 3})
    })
})