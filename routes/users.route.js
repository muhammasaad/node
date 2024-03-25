const express = require('express');
const router = express.Router()
const usersCRUD = require('../controllers/users.controller')
const jwt = require('jsonwebtoken')
const model = require('../model/user.schema');
const ResponseHanding = require('../response.handling');
const { AuthGuard } = require('../middlewares/authGuard')

router
    .get('/:id', AuthGuard, usersCRUD.getUser)

exports.router = router