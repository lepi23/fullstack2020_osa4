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

module.exports = {
    dummy, totalLikes, favoriteBlog
}