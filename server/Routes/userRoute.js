const express = require("express")
const {registerUser,loginUser,findUser,getUsers} = require("../Controller/userController")

const router = express.Router();

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/:id",findUser)
router.get("/",getUsers)

module.exports = router