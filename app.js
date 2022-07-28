const express = require('express')
const bodyParser = require('body-parser');
const {connectWithRetry}=require('./db/db');
const {REDIS_URL,REDIS_PORT,REDIS_SECRET} = require('./config');
const cors=require('cors');
const app = express();
const redis = require('ioredis');
const session = require('express-session');
let RedisStore = require('connect-redis')(session);

let redisClient= redis.createClient({ host: REDIS_URL, port: REDIS_PORT });
redisClient.on("connect", () => console.log("connected to redis"));

const bookRoute = require('./route/bookRoute')
const userRoute = require('./route/userRoute')
connectWithRetry()

app.use(bodyParser.urlencoded({ extended: false }))
// app.use(cors())
// parse application/json
app.use(bodyParser.json())
app.set("trust proxy", true); 
app.use(session({
    store: new RedisStore({ client : redisClient }),
    secret:REDIS_SECRET,
    cookie:
    { 
        resave: false,
        saveUninitialized: false,
        httpOnly: true, 
        secure: false, 
        maxAge: 30000
    }
}))

app.get("/api/v1",(req,res)=>{
    console.log(req)
    res.send("<h1>Hi there.</h1><br><p>My name is jhony</p>");
});
app.get('/api',(req,res)=>{
    console.log('jhony')
    res.send("jhony");
})

app.use('/api/v1/books',bookRoute)
app.use('/api/v1/users',userRoute)


const port = process.env.PORT || 8000
app.listen(port,()=>{
    console.log(`connected to this ${port}`)
});