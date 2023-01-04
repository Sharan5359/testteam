const db = require('../model')

const Salary  = db.salary



exports.create = (req, res)=>{

    const salarydetails = {

        name : req.body.name, 
        salary : req.body.salary, 
        currency : req.body.currency,
        on_contract : req.body.on_contract,
        department : req.body.department,
        sub_department : req.body.sub_department
    }
    Salary.create(salarydetails).then(salary => {

        res.status(201).send(salary)
    }).catch(err=> {
        res.status(500).send({
            message : "some inertnal error found",
            error : err
        })
    })
}