const chatModel = require("../Models/chatModel")

//createChat :-

const createChat = async(req,res) =>{
    try{
    const {firstId,secondId}= req.body   //this is two user having conversation
    
    const chat = await chatModel.findOne({
        members:{$all :[firstId,secondId]}  //members contain firstId and secondId
        
    })
    console.log(chat)
    if(chat) return res.status(200).json(chat) // if chat already exist we do not create newone
    
    //if chat is not exist then create newChat
    const newChat = new chatModel({
        members:[firstId,secondId]
    })
   
    const response = await newChat.save() //save databse

    res.status(200).json(response)

  }catch(error){
    console.log(error)
    res.status(500).json(error)
  }
};

//findUserChat :-

const findUserChat = async(req,res) => {
    try{
    const userId = req.params.userId
    
    //if the ID exists in any of the members then let's return at
    const chats = await chatModel.find({
        members:{$in:[userId]}
    })

    res.status(200).json(chats)
}catch(error){
    console.log(error)
    res.status(500).json(error)
  }
}

//findChat :-

const findChat = async(req,res) => {
    try{
    // extracts firstId and secondId  from params    
    const {firstId,secondId} = req.params
    
    //In members Array we find contain firstId and secondId
    const chat = await chatModel.findOne({
        members:{$all :[firstId,secondId]}
    })

    res.status(200).json(chat)
}catch(error){
    console.log(error)
    res.status(500).json(error)
  }
}

module.exports = {createChat,findUserChat,findChat}
