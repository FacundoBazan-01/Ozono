const util = require("util");
const bcryptjs = require("bcryptjs")    
const jwt = require("jsonwebtoken");
const { conection } = require("../config/database");

const query = util.promisify(conection.query).bind(conection);

const loginEmp = async (req, res)=>{
    try {
     const {emailEmp, contraEmp} = req.body
     if(!emailEmp, !contraEmp){
        return res.status(400).json({ error: 'El email y/o contrasenia son incorrectas' });
     }
     const consultaEmpleado = "select idEmpleado, nombreEmp, emailEmp, contraEmp, rolEmpleado from Empleados where emailEmp =?"
     const result = await query (consultaEmpleado,[emailEmp])
      if (result.length === 0) {
            return res.status(400).json({ msg: "Usuario y/o contraseña incorrectos" });
        }

        const Empleado = result[0];
        const passCheck = await bcryptjs.compare(contraEmp, Empleado.contraEmp);

        if (!passCheck) {
            return res.status(400).json({ msg: "Usuario y/o contraseña incorrectos" });
        }

        const payload = {
            id: Empleado.idEmpleado,
            role: Empleado.rolEmpleado
        };

        const token = jwt.sign(payload, process.env.SECRET_KEY);

        return res.status(200).json({ msg: "Logueado", token });
    } catch (error) {
        console.error("Error en loginEmp:", error);
        res.status(500).json({mensaje:"Server error",error})  
    }
}

module.exports={loginEmp}