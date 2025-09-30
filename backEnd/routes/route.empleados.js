const express = require("express")
const {getEmpleados, createEmpleado, updateEmpleado, darBajaEmpleado, reactivarEmpleado}=require("../controllers/empleados")
const auth = require("../middlewars/auth")

const router=express.Router()

router.get("/empleados",auth,getEmpleados)
router.post("/empleados/crear",createEmpleado)
router.put("/empleados/actualizar/:id", updateEmpleado)
router.put("/empleados/baja/:id",darBajaEmpleado)
router.put("/empleados/reactivar/:id",reactivarEmpleado)


module.exports=router