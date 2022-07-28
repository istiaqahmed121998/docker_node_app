const express= require('express')
const {signUp,login,alluser}= require('../controller/userController')
const auth = require('../middleware/authmiddleware')
const route = express.Router()

route.post('/signup',signUp)
route.post('/login',login)
route.get('/',auth,alluser)

module.exports = route