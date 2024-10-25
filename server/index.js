const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require('cors');


app.use(cors());
app.use(express.json());

const db= mysql.createConnection({
    host: "localhost", 
    user: "root",
    password: "",
    database: "empleados_crud"

});
app.post("/create",(req,res)=>{
    const nombre = req.body.nombre;
    const edad = req.body.edad
    const correo = req.body.correo;
    const estatura = req.body.estatura; 
    const pais = req.body.pais;

    db.query('INSERT INTO empleados (nombre, edad, estatura, correo, pais) VALUES (?, ?, ?, ?, ?)', [nombre, edad, estatura,correo, pais],
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.status(201).send(result);
        }
    }
);
});
app.get("/empleados",(req,res)=>{

    db.query('SELECT * FROM empleados',
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    }
);
});
app.put("/update", (req, res) => {
    const idempleados = req.body.id; // Cambiado a "id"
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const correo = req.body.correo;
    const estatura = req.body.estatura;
    const pais = req.body.pais;

    db.query(
        'UPDATE empleados SET nombre=?, edad=?, estatura=?, correo=?, pais=? WHERE idempleados=?', // Cambiado idempleados a id
        [nombre, edad, estatura, correo, pais, idempleados],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.status(201).send(result);
            }
        }
    );
});
app.delete("/delete/:idempleados", (req, res) => {
    const idempleados = req.params.idempleados; // Corregido
    db.query("DELETE FROM empleados WHERE idempleados=?", [idempleados], 
        (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error al eliminar el empleado");
        } else {
            if (result.affectedRows > 0) {
                res.status(200).send("Empleado eliminado con éxito");
            } else {
                res.status(404).send("Empleado no encontrado");
            }
        }
    });
});
app.listen(3001,()=>{
    console.log("Corriendo el programa en el servidor 3000")
});