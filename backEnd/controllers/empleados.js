const { conection } = require("../config/database")

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

module.exports={getEmpleados}