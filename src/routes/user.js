
const express =require('express');
const jwt= require('jsonwebtoken');
const router = express.Router();
const mysqlConnection = require('../database');

router.get('/inventorys',ensureToken, (req,res) =>{
    jwt.verify(req.token, 'my_secret_key',(err, data)=>{
        if(err){
            res.sendStatus(403);
        }else{
            mysqlConnection.query('SELECT * FROM inventory', (err, rows, fields) => {
                if(!err){
                    res.json({status:'OK', rsp:'Inventario Guardado', payload:rows});
                }else{
                    console.log('Error', err)
                }
            });
        }
    });
});

function ensureToken(req, res, next){
    const bearerHeader = req.headers['authorization'];
    console.log(bearerHeader);
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token=bearerToken;
        next();
    }else{
        res.sendStatus(403)
    }
}

router.post('/login', (req,res) =>{
    const user = {id: 3};
    const token = jwt.sign({user}, 'my_secret_key')
    res.json({
        token
    });

});


module.exports=router;
