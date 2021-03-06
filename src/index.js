const { json } = require('express');
const express = require('express');
const app = express();
//Settings
app.set('port', process.env.PORT || 3000);

//Middleware
app.use(express.json());

//Routes
app.use(require('./routes/inventory'));
app.use(require('./routes/user'));


//Starting server
app.listen(app.get('port'), () =>{
    console.log('server on port', app.get('port'));
});