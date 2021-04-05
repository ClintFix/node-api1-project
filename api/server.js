// BUILD YOUR SERVER HERE
const express = require('express')
const Users = require('./users/model')

const server = express();
server.use(express.json());

// ENDPOINTS

// [GET] - /api/users - get all users
server.get("/api/users", (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
})

// [GET] - /api/users/:id - get user by id

// [POST] - /api/users - create new user

// [PUT] - /api/users/:id - update user and return modified user

// [DELETE] - /api/users/:id - remove user by id and return deleted user

module.exports = server; // EXPORT YOUR SERVER instead of {}
