const { Server } = require("socket.io");


const io = new Server({cors: "http://127.0.0.1:5173/"})

//add online users :-
let onlineUsers = []
io.on("connection", (socket) => {
    console.log("new conncetion",socket.id);

    //listen to connection 
    socket.on("addNewUser",(userId) =>{
        !onlineUsers.some((user) => user.userId === userId) &&
        onlineUsers.push({
            userId,
            socketId:socket.id
        })
        console.log("onlineUser",onlineUsers)
        io.emit("getonlineUsers", onlineUsers);
    })

    //add message :-
    socket.io("sendMessage", (message) =>{
        const user = onlineUsers.find(usr = user.userId === message.respiendId)
        if(user) {
            io.to(user.socketId).emit("getMessage",message);
        }
    })
    socket.on("disconnet", () => {
        onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id)

        io.emit("getOnlineUsers", onlineUsers);
    })
    
  });


  
io.listen(3000)