const express =require('express');
const router = express.Router();
const mysqlConnection = require('../database');

router.get('/', (req,res) =>{
    mysqlConnection.query('SELECT * FROM inventory', (err, rows, fields) => {
        if(!err){
            res.json(rows);
        }else{
            console.log('Error', err)
        }
    });
});

module.exports=router;
