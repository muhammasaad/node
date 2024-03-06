const express = require('express');
const router = express.Router()
const usersCRUD = require('../controllers/users.controller')

router.post('/', usersCRUD.createUser)

exports.router = router