const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt  = require("jsonwebtoken");
const Orders = require("../models/Orders");
const secretKey = "g@y@@@n@u@9@7@5@";

router.post("/create", async (req, res) => {

    const salt = await bcrypt.genSalt(10);
    let securePassword = await bcrypt.hash(req.body.password, salt);
    try {

        const user = await User.create({
            FullName: req.body.name,
            location: req.body.location,
            email: req.body.email,
            password: securePassword,
    
        })

        if(!user){
            return res.status(400).json({errors : "please SignUp with valid credentials"})  
        }

        console.log(user);
        res.status(200).json({ success: true });
        
    } catch (error) {
        res.status(500).json({ success: false });
        console.log(error);
    }



})

router.post("/login", async(req, res)=>{
    try {
        
        const reqUser = await User.findOne({email:req.body.email});
        const passwordCompare = await bcrypt.compare(req.body.password, reqUser.password);
    if(!passwordCompare){
        return res.status(400).json({errors : "please login with valid credentials"})
    }
    const payload = {
        user : {
            email : reqUser.email
        }
    }
    const authToken = jwt.sign(payload, secretKey);
    res.status(200).json({ message: "Login successful", authToken : authToken, user: reqUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ errors: "Server error" });
    }
   
})

router.post("/orders", async(req, res)=>{
    const email = req.body.email;
    const data = req.body.orders;
    data.splice(0,0,{Order_date:req.body.Order_date})
    const emailId = await Orders.findOne({email})
    if(emailId === null){
        try {
            await Orders.create({
                email : email,
                orders : [data]
            })
            res.status(200).json({success : true});
            
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
    else{
        try {
            await Orders.findOneAndUpdate({email},
            { $push : {orders : [data]}}
        );
            res.status(200).json({success : true});
            
            
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
})



router.post('/myorders', async (req, res) => {
    const { email } = req.body;
    console.log('Received email:', email);

    try {
        const user = await Orders.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Flatten all levels of nested arrays
        const flattenArray = (arr) => arr.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenArray(val)) : acc.concat(val), []);
        const orders = flattenArray(user.orders);

        console.log('Orders:', orders);

        res.json(orders);
    } catch (err) {
        console.error('Error:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router