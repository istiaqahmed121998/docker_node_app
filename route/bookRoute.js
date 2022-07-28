const express= require('express')
const {getAllbooks,createBook,getOneBook,updateOneBook,deleteOneBook}= require('../controller/bookController')
const route = express.Router()

route.route('/').get(getAllbooks).post(createBook)

module.exports = route