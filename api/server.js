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
server.get("/api/users/:id", (req, res) => {
    const idVar = req.params.id;
    Users.findById(idVar)
        .then(user => {
            if(!user) {
                res.status(404).json('User not found. Please check the User ID')
            } else {
                res.status(200).json(user)
            }
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
})


// [POST] - /api/users - create new user
server.post("/api/users", (req, res) => {
    const newUser = req.body;
    if (!newUser.name || !newUser.bio) {
        res.status(422).json('Name and Bio are required')
    } else {
        Users.insert(newUser)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                res.status(500).json({message: err.message})
            })
    }
})

// [PUT] - /api/users/:id - update user and return modified user
server.put("/api/users/:id", (req, res) => {
    const {id} = req.params;
    const changes = req.body;
    if (!changes.name || !changes.bio) {
        res.status(422).json("Name and Bio required")
    } else {
        Users.update(id, changes)
            .then(user => {
                if (!user) {
                    res.status(422).json("User does not exist")
                } else {
                    res.status(201).json(user)
                }
            })
            .catch(err => {
                res.status(500).json({message: err.message})
            })
    }
})

// [DELETE] - /api/users/:id - remove user by id and return deleted user

module.exports = server; // EXPORT YOUR SERVER instead of {}
