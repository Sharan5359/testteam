const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const server = require('http').Server(app);
const user = require('./routes/auth.route')
const salary = require('./routes/salary.route')
const http =require('http')
const serverConfig = require('./config/server.config');

var db = require('./model');
app.use(bodyParser.json({ limit: '100mb' })); 

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use('/api/v1/user', user);
app.use('/api/v1', salary)


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next()
});


db.sequelize.sync({force:true}).then(() => {

    console.log("Table Dropped and Recreated ")

}).catch(err =>{
    console.log(err.message);
})

http.createServer(app).listen(serverConfig.PORT, ()=>{
    console.log("Server is running on '"+serverConfig.PORT+"' ")
})