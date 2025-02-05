const express=require("express");
const connectDB=require("./config/database")
const app=express();
var cookieParser = require('cookie-parser')
const cors=require("cors")
const path=require("path")

const allowedOrigins = ['http://localhost:5173'];
app.use(cors({
    origin: allowedOrigins,
    credentials: true, // This allows cookies and credentials to be sent
  }));
  
  // Alternatively, you can add it manually to the response:
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });

app.use(express.json())
app.use(cookieParser())
const _dirname=path.resolve();


const authRouter=require("./routers/auth")
const profileRouter=require("./routers/profile")
const requestRouter=require("./routers/requests")
const userRouter=require("./routers/user")

app.use("/",authRouter);
app.use("/",profileRouter)
app.use("/",requestRouter)
app.use("/",userRouter)

app.use(express.static(path.join(_dirname,"/Frontend/dist")))
app.get("*",(req,res)=>{
  res.sendFile(path.resolve(_dirname,"Frontend" , 'dist' ,"index.html"))
})

connectDB().then(()=>{
    console.log("Database connnection is successful")
    app.listen(7777,()=>{
        console.log("server is sccessfully running")
    });
})
.catch((err)=>{
    console.error("database can not be connected",err.message)
})
