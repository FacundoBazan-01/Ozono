const { conection } = require("../config/database")
const bcryptjs = require("bcryptjs")

const getEmpleados = (req,res) =>{
    const consulta = "select * from empleados"

    conection.query(consulta,(err, result)=>{
         if (err) {
            console.error('Error al traer los empleados:', err);
            return res.status(500).json({ error: 'Error al traer los empleados' });
        }
        res.status(200).json({ message: 'Empleados traidos con exito', result});
    })
}

const createEmpleado = async (req,res)=>{
    const {nombreEmp, apellidoEmp, contraEmp, rolEmpleado} = req.body

    let salt = await bcryptjs.genSalt(10);
    let contraEncrip = await bcryptjs.hash(contraEmp, salt);

    const consulta = "insert  into empleados (nombreEmp, apellidoEmp, contraEmp, rolEmpleado) values (?,?,?,?)"

    conection.query(consulta,[nombreEmp,apellidoEmp,contraEncrip,rolEmpleado],(err,result)=>{
        if(err){
            console.log("Error al crear empleado:", err)
            return res.status(500).json({error:"Error al crear el empleado"})
        }
        res.status(201).json({message: "Empleado creado con exito"})
    })

}

const updateEmpleado = async (req,res)=>{
    const {nombreEmp, apellidoEmp, contraEmp, rolEmpleado} = req.body
    const id = req.params.id
    let salt = await bcryptjs.genSalt(10);
    let contraEncrip = await bcryptjs.hash(contraEmp, salt);

    const consulta = "update empleados set nombreEmp=?, apellidoEmp=?, contraEmp=?, rolEmpleado=? where idEmpleado =?"

    conection.query(consulta,[nombreEmp,apellidoEmp,contraEncrip,rolEmpleado,id],(err,result)=>{
        if(err){
            console.log("Error al actualizar empleado:", err)
            return res.status(500).json({error:"Error al actualizar el empleado"})
        }
        res.status(201).json({message: "Empleado actualizado con exito"})
    })
}


const darBajaEmpleado = (req,res)=>{
    const id = req.params.id
    const consulta = "update empleados set activo = false where idEmpleado=?"
    
    conection.query(consulta,[id],(err,result)=>{
        if (err) {
            console.log("Error al eliminar/dar de baja al empleado:", err)
            return res.status(500).json({error:"Error al eliminar/dar de baja al empleado"})
        }
        res.status(201).json({message: "Empleado dado de baja/eliminado con exito"})
    })
}

const reactivarEmpleado = (req,res)=>{
    const id = req.params.id
    const consulta = "update empleados set activo = true where idEmpleado=?"

     conection.query(consulta,[id],(err,result)=>{
        if (err) {
            console.log("Error al reactivar al empleado:", err)
            return res.status(500).json({error:"Error al reactivar al empleado"})
        }
        res.status(201).json({message: "Empleado reactivado con exito"})
    })
}

module.exports={
    getEmpleados,
    createEmpleado,
    updateEmpleado,
    darBajaEmpleado,
    reactivarEmpleado
}