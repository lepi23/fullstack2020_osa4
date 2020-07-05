const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

//funktio post metodejen testausta varten
const postTest = (testName, newUser) => {
    test(testName, async () => {
      
        await api
            .post('/api/Users')
            .send(newUser)
            .expect(400)      
    })
}

describe('posting users with bad values', () => {

    beforeEach(async () => {
        await User.deleteMany({})
        console.log('cleared')
    })  

    const newUser1 = {
        username: 's',
        name: 'Yoda',
        password: 'password123',
    }
    postTest('user with too short username',newUser1)

    const newUser2 = {
        username: 'forcemaster01',
        name: 'Yoda',
        password: 's',
    }
    postTest('user with too short password',newUser2)
    
    const newUser3 = {
        username: 'forcemaster01',
        name: 'Yoda',
    }
    postTest('user defined without password',newUser3)
        
})




afterAll(() => {
    mongoose.connection.close()
})