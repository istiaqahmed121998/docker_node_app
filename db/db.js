const mongoose=require('mongoose');
const {MONGO_IP,MONGO_PORT,MONGO_USER,MONGO_PASSWORD}= require('../config')
const connectWithRetry=()=>{
    mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`)
    .then(()=>console.log("Successfully connected to mongo"))
    .catch((e)=>{
        console.log(e);
        setTimeout(connectWithRetry,5000);
    });
}
module.exports={connectWithRetry}
