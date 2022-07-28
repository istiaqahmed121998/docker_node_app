const Book = require('../model/bookModel')

const getAllbooks=async(req,res,next)=>{
    try{
        const books= await Book.find();
        res.status(200).json({
            status:"success",
            results:books.length,
            datas:{
                books,
            },
        });
    }
    catch(e){
        res.status(400).json({
            status:"fail",
            err:{
                error:e,
            }
        })
    }
}
const getOneBook=async(req,res,next)=>{
    try{
        const books= await Book.findById(req.params.id);
        res.status(200).json({
            status:"success",
            results:books.length,
            datas:{
                books,
            },
        });
    }
    catch(e){
        res.status(400).json({
            status:"fail",
            err:{
                error:e,
            }
        })
    }
}

const createBook=async(req,res,next)=>{
    try{
        const book= await Book.create(req.body);
        res.status(200).json({
            status:"success",
            results:book.length,
            datas:{
                book,
            },
        });
    }
    catch(e){
        res.status(400).json({
            status:"fail",
            err:{
                error:e,
            }
        })
    }
}

const updateOneBook=async(req,res,next)=>{
    try{
        const books= await Book.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).json({
            status:"success",
            datas:{
                books,
            },
        });
    }
    catch(e){
        res.status(400).json({
            status:"fail",
            err:{
                error:e,
            }
        })
    }
}

const deleteOneBook=async(req,res,next)=>{
    try{
        const books= await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status:"success",
        });
    }
    catch(e){
        res.status(400).json({
            status:"fail",
            err:{
                error:e,
            }
        })
    }
}

module.exports= {getAllbooks,createBook,getOneBook,updateOneBook,deleteOneBook}