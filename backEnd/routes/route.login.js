const express = require("express")
const {loginEmp}=require("../controllers/login")

const router=express.Router()

router.post("/login/empleado",loginEmp)

module.exports=router