const express = require("express");
const app = express();
var cors = require('cors');

const cookieParser=require("cookie-parser")
const companyRouter=require("./Router/CompanyRouter");
const path=require("path");

const _dirname=path.resolve();




//middleware func-> post, front-> json
app.use(express.json()); //global middleware 
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:5173', 'https://localhost:5173','https://linkedin-3jua.vercel.app/'], // Adjust as needed
    credentials: true,
  }));
const port=process.env.PORT || 8080;


const jobRouter=require("./Router/jobRouter");
const userRouter=require("./Router/userRouter");
const applicationRouter=require("./Router/ApplicationRouter")
app.use("/user",userRouter);
app.use("/company",companyRouter)
app.use("/job",jobRouter);
app.use("/application",applicationRouter);

app.use(express.static(path.join(_dirname, "/frontened/frontend/dist")));
app.get('*',(_,res)=>{
  res.sendFile(path.resolve(_dirname,"frontened/frontend","dist","index.html"));
})

app.listen(port,function(){
  console.log(`
      server listening on port ${port}`); 
});  


// \
//mini app
// const userRouter = require('./Router/UserRouter');
// const planRouter = require('./Router/planRouter');
// const reviewRouter = require('./Router/ReviewRouter');
// const bookingRouter=require('./Router/bookingRouter');
// //base route , router to use
// app.use("/user", userRouter);
// app.use("/plans", planRouter);
// app.use("/review", reviewRouter);
// app.use('/booking',bookingRouter);
// app.use("/auth", authRouter);



