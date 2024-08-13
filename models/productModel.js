const mongoose = require('mongoose')

const productschema = new mongoose.Schema({
    id : String,
    name : String,
    description : String,
    price: Number,
    category : String,
    image_url : String,
    rating:[{
        rate: Number,
        count:Number
    }]
})

const Product = new mongoose.model('Product',productschema)

module.exports = Product;