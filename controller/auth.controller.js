const db = require('../model')
const User = db.user
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/secret.config')

exports.signup = (req, res)=>{

    const userObj = {
        username : req.body.username, 
        email : req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    }

    User.create(userObj).then(user => {

        res.status(201).send({
            message : "user registered successfully"
        })
    }).catch(err =>{
        res.status(500).send({
            message : "Something Internal error",
            error : err
        })
    })
}
exports.login = (req, res) =>{

    User.findOne({
        where  : {
            email :req.body.email
        }
    }).then(user =>{

        if(!user){
            res.status(404).send({
                message : "User Not found"
            })
            return;
        }
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );


        if(!passwordIsValid){
            res.status(401).send({
                message : "Invalid Password"
            })
        }

        var token = jwt.sign({id: user.id},config.secret, {
            expiresIn : 300 // This again we could have kept in the config file
        });

        res.status(200).send({
            id : user.id,
            username : user.username,
            email : user.email,
            accessToken : token
        });
    }).catch(err=>{
        console.log(err)
        res.send(500).send({
            message :"Some internal err found",
            error :err
        })
        
    })
}