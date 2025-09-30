const express= require("express")
const {getProductos,getProducto,createProducto,updateProducto,bajaProducto,activarProducto}= require("../controllers/productos")

const router=express.Router()

router.get("/productos",getProductos)
router.get("/productos/:id",getProducto)
router.post("/productos/crear",createProducto)
router.put("/productos/actualizar",updateProducto)
router.put("/productos/baja/:id",bajaProducto)
router.put("/productos/activar/:id",activarProducto)

module.exports= router