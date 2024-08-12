const cart = require("../models/cartModel");
const Productmodel = require("../models/productModel")


exports.createcart = async (req,res) => {
    const { user_id } = req.user;
    const { product_id, quantity } = req.body;
    try{
        let Cart = await cart.findOne({ user_id }); 
        
    if(!Cart) {
        Cart = new cart({
            user_id,
            products:[
                {    
                    product_id,
                    quantity,
                },
            ],
        });
    } else {
    const productIndex = Cart.products.findIndex(
        (prod) => prod.product_id===product_id
    );
    if(productIndex === -1){
        Cart.products.push({product_id, quantity});
    } else{
        Cart.products[productIndex].quantity = quantity;
    }
    }
    await Cart.save();
    res.status(200).json({ message: "Product added/updated in cart", Cart});
    }
    catch(e){
        console.log(e);
    }   
};


exports.getcart = async (req,res) => {
    const { user_id } = req.user;
    const Cart = await cart.findOne({ user_id });
    if(!Cart){
        return res.status(404).json("Cart not found for the user");
    }
    try{
         let subtotal = 0;

        const cartItems  = await Promise.all(
            Cart.products.map(async (product) => {
                const productDetails = await Productmodel.findOne({id:product.product_id});
                subtotal += productDetails.price * product.quantity;
                
                return {
                    product_id: productDetails.id,
                    title: productDetails.title,
                    description: productDetails.description,
                    price: productDetails.price,
                    image: productDetails.image,
                    quantity: product.quantity
                };
            })
        )
        res.status(200).json({ cartItems:cartItems ,subtotal});
    }
    catch(err){
        console.log("err",err);
        res.status(500).json({message: "server Error", err});
    }
}


exports.deletecart = async (req,res) => {
    const {user_id} = req.user;
    const { product_id } = req.params; 

    try{
        const Cart = await cart.findOne({user_id}); 
        if(!Cart){
            return res.status(404).json({ message:"Cart Not Found" });
        }

        const isproductvalid = Cart.products.find((product) => product_id === product.product_id);
        if(!isproductvalid){
            return res.status(404).json('Product not found');
        }

        if (Cart.products.length <= 1){
            await Cart.deleteOne({user_id});
            return res.status(200).json({message: "Cart Deleted successfully" });
        } else {
            Cart.products = Cart.products.filter((prod) => product_id  != prod.product_id);
            await Cart.save();
            return res.status(200).json({message: "Product deleted successfully" });
        }

    } catch (err){
        console.log(err);
        res.status(500).send('Server error');
    }
}