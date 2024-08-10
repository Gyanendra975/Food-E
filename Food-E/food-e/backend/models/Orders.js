const mongoose = require("mongoose");

const {Schema} = mongoose;
const orderSchema = new Schema({
    email :{
        type : String,
        require : true
    },
    orders :{
        type : Array,
        require :true
    },
})

const Orders = mongoose.model("orders", orderSchema);

module.exports = Orders;