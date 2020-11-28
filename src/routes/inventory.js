const { query } = require('express');
const express =require('express');
const router = express.Router();
const mysqlConnection = require('../database');

router.get('/inventory', (req,res) =>{
    mysqlConnection.query('SELECT * FROM inventory', (err, rows, fields) => {
        if(!err){
            res.json(rows);
        }else{
            console.log('Error', err)
        }
    });
});

router.get('/add-inventory', (req,res) =>{
    const{id, name, stock}= req.body;
    const query=`
        SET @id =?;
        SET @name =?;
        SET @stock =?;

        CALL inventoryAddEdit(@id, @name, @stock);
    `;
    mysqlConnection.query(query,[id,name,salary],(err, rows, fields) => {
        if(!err){
            res.json({Stutus:'OK', RSP:'Inventario Guardado'});
        }else{
            console.log('Error', err)
        }
    });
});

module.exports=router;
