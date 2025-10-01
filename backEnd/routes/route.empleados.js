const express = require("express")
const {getEmpleados, createEmpleado, updateEmpleado, darBajaEmpleado, reactivarEmpleado, getEmpleado}=require("../controllers/empleados")
const auth = require("../middlewars/auth")

const router=express.Router()

router.get("/empleados",auth,getEmpleados)
router.get("/empleados/:id",getEmpleado)
router.post("/empleados/crear",createEmpleado)
router.put("/empleados/actualizar/:id", updateEmpleado)
router.put("/empleados/baja/:id",darBajaEmpleado)
router.put("/empleados/reactivar/:id",reactivarEmpleado)


module.exports=router