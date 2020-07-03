var _ = require('lodash');
// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
    return 1
}
//laskee blogi arrayn tykkäyksien määrän ja palauttaa määrän lukuna
const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.reduce(reducer,0)
}
// palauttaa blogin, jolla on eniten tykkäyksiä
const favoriteBlog = (blogs) => {
    if(blogs.length === 0){
        return {}
    }
    return blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)
}

const mostBlogs = (blogs) => {
    if(blogs.length === 0){
        return {}
    }
    const result = {}
    const authors = blogs.map(blog => blog.author)
    console.log(authors)

    var resultName = _.head(_(authors)
    .countBy()
    .entries()
    .maxBy(_.last));

    var resultBlogs = authors.filter(authorName => authorName===resultName).length
    
    result.author = resultName
    result.blogs = resultBlogs
    console.log(result);

    return result
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs
}