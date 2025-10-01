const { conection } = require("../config/database");
const util = require("util");

const query = util.promisify(conection.query).bind(conection);

const getProductos = (req, res) => {
  const consulta = "select * from productos";

  conection.query(consulta, (error, result) => {
    if (error) {
      console.log("Error al traer los productos", error);
      return res.status(500).json({ error: "Error al traer los productos" });
    }
    res.status(200).json({ message: "Productos traidos con exito", result });
  });
};

const getProducto = (req, res) => {
  const id = req.params.id;
  const consulta = "select * from productos where idProducto =?";

  conection.query(consulta, [id], (error, result) => {
    if (error) {
      console.log("Error al traer el producto", error);
      return res.status(500).json({ error: "Error al traer el producto" });
    }
    res.status(200).json({ message: "Producto traido con exito", result });
  });
};

const createProducto = async (req, res) => {
  const { codigoProd, nombreProd, descripcionProd, creadoPor } = req.body;
  if ((!codigoProd, !nombreProd, !descripcionProd)) {
    return res.status(400).json({ error: "Alguno de los campos esta vacio" });
  }
  const consultaVerificacion = "select  * from productos where codigoProd = ?";

  const result = await query(consultaVerificacion, [codigoProd]);
  
  if (result.length === 0) {
    const consultaCrear =
      "insert into productos (codigoProd, nombreProd, descripcionProd, creadoPor) values (?,?,?,?)";
    conection.query(
      consultaCrear,
      [codigoProd, nombreProd, descripcionProd, creadoPor],
      (error, resultado) => {
        if (error) {
          console.log("Error al crear el producto:", error);
          return res.status(500).json({ error: "Error al crear el producto" });
        }
        res.status(201).json({ message: "Producto creado con exito" });
      }
    );
  }else{
    return res.status(400).json({ msg: "El producto ya se encuentra creado" });
  }
};

const updateProducto = (req, res) => {
  const { codigoProd, nombreProd, descripcionProd } = req.body;
  const id = req.params.id;
  const consulta =
    "update productos set codigoProd=?, nombreProd=?, descripcionProd=? where idProducto=?";
  conection.query(
    consulta,
    [codigoProd, nombreProd, descripcionProd, id],
    (error, result) => {
      if (error) {
        console.log("Error al actualizar el producto:", error);
        return res
          .status(500)
          .json({ error: "Error al actualizar el producto" });
      }
      res.status(201).json({ message: "Producto actualizado con exito" });
    }
  );
};

const bajaProducto = (req, res) => {
  const id = req.params.id;
  const consulta = "update productos set estado = false where idProducto = ?";
  conection.query(consulta, [id], (error, result) => {
    if (error) {
      console.log("Error al dar de baja el producto:", error);
      return res.status(500).json({ error: "Error al dar de baja producto" });
    }
    res.status(201).json({ message: "Producto dado de baja con exito" });
  });
};

const activarProducto = (req, res) => {
  const id = req.params.id;
  const consulta = "update productos set estado = true where idProducto = ?";
  conection.query(consulta, [id], (error, result) => {
    if (error) {
      console.log("Error al reactivar el producto:", error);
      return res.status(500).json({ error: "Error al reactivar producto" });
    }
    res.status(201).json({ message: "Producto reactivado con exito" });
  });
};



module.exports={
    getProductos,
    getProducto,
    createProducto,
    updateProducto,
    bajaProducto,
    activarProducto
}