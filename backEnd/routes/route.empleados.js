const express = require("express")
const {getEmpleados, createEmpleado, updateEmpleado, darBajaEmpleado, reactivarEmpleado, getEmpleado, permisoCrearProductoEmp, quitarCrearProductoEmp, permisoModifProducEmp, quitarModifProducEmp, permisoModifVenta, quitarModifVenta}=require("../controllers/empleados")
const auth = require("../middlewars/auth")

const router=express.Router()

router.get("/empleados",auth,getEmpleados)
router.get("/empleados/:id",getEmpleado)
router.post("/empleados/crear",createEmpleado)
router.put("/empleados/actualizar/:id", updateEmpleado)
router.put("/empleados/crearProdSi/:id", permisoCrearProductoEmp)
router.put("/empleados/crearProdNo/:id", quitarCrearProductoEmp)
router.put("/empleados/modificarProdSi/:id",permisoModifProducEmp)
router.put("/empleados/modificarProdNo/:id",quitarModifProducEmp)
router.put("/empleados/modificarVentaSi/:id",permisoModifVenta)
router.put("/empleados/modificarVentaNo/:id",quitarModifVenta)
router.put("/empleados/baja/:id",darBajaEmpleado)
router.put("/empleados/reactivar/:id",reactivarEmpleado)


module.exports=router