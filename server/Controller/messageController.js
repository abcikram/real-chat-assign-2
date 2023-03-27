const messageModel = require("../Models/messageModel")

//createMessage:-

const createMessage = async(req,res) =>{
    try{

        const {chatId,senderId,text} = req.body

        const message = await messageModel.create({
            chatId,senderId,text
        })

        const response = await message.save()
        
        res.status(200).json(response)

    }catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

}

//getMesssage by chatId params:-

const getMesssage = async(req,res) =>{
    try{
    const {chatId} = req.params
    
    const message = await messageModel.find({chatId})
    res.status(200).json(message)

  }catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

module.exports = { createMessage,getMesssage}