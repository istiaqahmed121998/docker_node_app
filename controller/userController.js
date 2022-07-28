const User = require('../model/userModel')
const bcrypt= require('bcryptjs');

const signUp=async(req,res)=>{
    try{
        const {username:user,password:pass}=req.body;
        const userone= await User.findOne({
            username:user
        });
        if(userone){
            return res.send('User already existed')
        }

        var salt = await bcrypt.genSaltSync(10);
        var hash = await bcrypt.hashSync(pass, salt);
        const newuser= await User.create({
            username:user,
            password:hash
        });
        req.user.session=newuser
        res.status(201).json({
            status:"success",
            datas:{
                newuser,
            },
        });
    }
    catch(e){
        res.status(400).json({
            status:"fail",
            err:{
                error:e,
            }
        });
    }
}
const login=async(req,res)=>{
    try{
        const {username,password}=req.body
        const user= await User.findOne({
            username
        }).select('+password');
        if(user){
            const isCorrect=bcrypt.compareSync(password,user.password)
            if(isCorrect){
                req.session.user=user;
                res.status(201).json({
                    status:"success",
                    datas:{
                        user,
                    },
                });
            }
            else if(!isCorrect){
                res.status(400).json({
                    status:"fail",
                    message:'pass is not correct'
                });
            }
            
        }
        else{
            res.status(404).json({
                status:"fail",
                message:'user is not found'
            });
        }
    }
    catch(e){
        res.status(400).json({
            status:"fail",
            err:{
                error:e,
            }
        })
        console.log(e)
    }
}
const alluser=async(req,res)=>{
    try{
        users=await User.find({});
        if(users){
            res.status(201).json({
                status:"success",
                datas:{
                        users,
                },
            })
        }
        else{
            res.status(404).json({
                status:"fail",
                message:'user is not found'
            });
        }
    }
    catch(e){
        res.status(400).json({
            status:"fail",
            err:{
                error:e,
            }
        })
        console.log(e)
    }

}
module.exports= {signUp,login,alluser}