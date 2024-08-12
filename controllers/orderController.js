const orderModel = require('../models/orderModel');
const cartModel = require('../models/cartModel');
const productModel = require('../models/productModel');

exports.createOrder = async (req,res) => {
    const {user_id,email} = req.user;
    console.log(req.user);
    console.log(user_id);
    console.log(email);
    if(!user_id){
        return res.status(500).json("user not found");
    }
    const {customerName , customerPhoneNo , customerAddress } = req.body;
    console.log(req.body);

    try{
        const userCart = await cartModel.findOne({user_id});
        if(!userCart){
            return res.status(500).json("Cart is not available for the user");
        }
        console.log(userCart);
        
        const userCartProducts = await Promise.all(userCart.products.map(async(product)=> {
            const productQuantity = product.quantity;
            const {id,title,price,category}  = await productModel.findOne({id :product.productId});
            return {id,title,price,category,productQuantity}
        }));
        console.log(userCartProducts);
        
        const newOrder = new orderModel({
            customerId : user_id,
            customerMail : email,
            customerName,
            customerPhoneNo,
            customerAddress,
            products :  userCartProducts.map((product)=>
                     {  return{
                         productId :product.id,
                         productName : product.title,
                         productQuantity : product.productQuantity,
                         productPrice : product.price,
                         productCategory : product.category
                     }})
        });
                
         console.log(newOrder);
         await newOrder.save();
         return res.status(200).json("Order is Placed successfully");

    }catch(err)
    {
        res.status(500).json(err);
    }
}