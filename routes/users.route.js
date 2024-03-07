const express = require('express');
const router = express.Router()
const usersCRUD = require('../controllers/users.controller')

router
.post('/', usersCRUD.createUser)
.get('/getAll', usersCRUD.getUsers)
.get('/:email', usersCRUD.getUser) 
.patch('/:id', usersCRUD.updateUser)
.delete('/:id', usersCRUD.deleteUser)

exports.router = router