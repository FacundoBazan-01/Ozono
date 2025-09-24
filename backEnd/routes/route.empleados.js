const express = require("express")
const {getEmpleados}=require("../controllers/empleados")

const router=express.Router()

router.get("/empleados",getEmpleados)


module.exports=router