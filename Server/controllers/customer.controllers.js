const Customer = require('../models/customer.model')
const secret = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')

module.exports = {
    registeredCustomer: async (req,res) => {
        try {
             // Check if the email that was entered in the reg form is already in the DB
            const checkIfCustomerExist = await Customer.findOne({email:req.body.email});
            if(checkIfCustomerExist) {
                res.status(400).json('that email already exists')
            }else {
                //create the customer
                const newCustomer = await Customer.create(req.body)

                //set up a jsonwebtoken
                const customerToken = jwt.sign({_id:newCustomer._id ,email:newCustomer.email}, secret, {expiresIn:'2h'})

                //sending in back the logged in customer
                res.cookie("customerToken",customerToken, {httpOnly: true, maxAge:2*60*60*1000}).status(201).json({message:'Customer logged in', customer: newCustomer})
            }
        } catch (err) {
            res.status(400).json({ error: err })
        }
    },

    login: async (req,res) => {
        try {
            //check if the email already exists the the DB
            const checkIfCustomerExist = await Customer.findOne({email:req.body.email});
            if(checkIfCustomerExist) {
                const passwordsMatch = await bcrypt.compare(req.body.password, checkIfCustomerExist.password)
                if(passwordsMatch) {
                    const customerToken = jwt.sign({_id:checkIfCustomerExist._id ,email:checkIfCustomerExist.email}, secret, {expiresIn:'2h'})

                //sending in back the logged in customer
                res.cookie("customerToken",customerToken, {httpOnly: true, maxAge:2*60*60*1000}).status(201).json({message:'Customer logged in', customer: checkIfCustomerExist})
                }else {
                    res.status(400).json({ message: "Invalid Email/Password" })
                }
            }else {
                res.status(400).json({ message: "Invalid Email/Password" })
        } 
        }catch (err) {
            res.status(400).json({ error: err })
        }
}}