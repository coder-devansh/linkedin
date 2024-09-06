const express = require("express");
const app = express();
var cors = require('cors');
app.use(cors()) ;



//middleware func-> post, front-> json
app.use(express.json()); //global middleware 
const port=process.env.PORT || 3000;
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



