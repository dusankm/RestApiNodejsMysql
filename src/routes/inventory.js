const { query } = require('express');
const express =require('express');
const router = express.Router();
const mysqlConnection = require('../database');

router.get('/inventory', (req,res) =>{
    mysqlConnection.query('SELECT * FROM inventory', (err, rows, fields) => {
        if(!err){
            res.json({status:'OK', rsp:'Inventario Guardado', payload:rows});
        }else{
            console.log('Error', err)
        }
    });
});

router.post('/add-inventory', (req,res) =>{
    const{id, name, stock}= req.body;
    const query=`
        CALL inventoryAddEdit(?,?,?);
    `;
    if(req.body.id==null || req.body.name==null || req.body.stock==null){
        res.json({status:'201', rsp:'Parametros faltantes'});
    }else{
        try {
            mysqlConnection.query(query,[id,name,stock],(err, rows, fields) => {
                if(!err){
                    res.json({status:'200', rsp:'Inventario Guardado'});
                }else{
                    res.json({status:'201', rsp:'Lo sentimos intente mas tarde'});
                    console.log('Error', err)
                }
            });
        } catch (e) {
            console.error('catch questions: ', e);
            res.json({status:'500', rsp:e});
        }
    }

});

router.put('/update/:id', (req,res) =>{
    const {name,stock} = req.body;
    const {id} = req.params;
    const query= 'CALL inventoryAddEdit(?, ?,?)';
    mysqlConnection.query(query,[id,name,stock], (err, rows, fields)=>{
        if(!err){
            res.json({status:'200', rsp:'Producto actualizado'});
        }else{
            res.json({status:'201', rsp:'Lo sentimos intente mas tarde'});
            console.log('Error', err)
        }
    });

});

module.exports=router;
