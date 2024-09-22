const express=require("express")
const app=express();
const http=require("http");
const path=require("path");
const {Server}=require("socket.io");

const server=http.createServer(app);
app.use(express.static(path.resolve("/public"))) // 
server.listen(9000,()=> console.log(`server started at ${server}`))
const io=new Server(server)
app.get("/",(req,res)=>{
    return res.sendFile('public/index.html');
});

io.on("connection",(socket)=>{
    console.log()


})