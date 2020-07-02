const listHelper = require('../utils/list_helper')
const testBlogs = require('./testBlogs')

describe('favorite blog', () => {
    test('when list has only one blog equals that blog', () => {
        const result = listHelper.favoriteBlog(testBlogs.listWithOneBlog)
        expect(result).toEqual(testBlogs.listWithOneBlog[0])
    })
    test('of empty list is an empty object', () => {
        const result = listHelper.favoriteBlog([])
        expect(result).toEqual({})
    })
    test('of a bigger list is chosen right', () => {
        const result = listHelper.favoriteBlog(testBlogs.blogs)
        expect(result).toEqual(testBlogs.blogs[2])
    })
})