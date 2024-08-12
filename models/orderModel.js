const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    customerId : {type:String,required : [true,"Customer Id is required"]},
    customerName : {type : String, required : [true,"customer Name is required"]},
    customerPhoneNo : {type : Number, required : [true,"customer Phone number is required"]},
    customerAddress : {type : String, required : [true,"customer Address is required"]},
    customerMail : {type : String, required : [true,"customer customer Mail is required"]},
    orderDate : {type: Date,default : Date.now},
    estimateDeliveryDate : {type:Date, default : ()=> Date.now() + 10 * 24 * 60 * 60 * 100},
    products : [{
        productId : {type : String,required : [true,"Product ID is required"]},
        productName : {type : String,required : [true,"Product ame is required"]},
        productQuantity : {type : Number,required : [true,"Product Quantity is required"]},
        productPrice : {type : Number,required : [true,"Product Price is required"]},
        productCategory : {type:String,require : [true,"Product catgory is required"]}
        }]
});

const orderModel = mongoose.model('orders',orderSchema);

module.exports = orderModel;