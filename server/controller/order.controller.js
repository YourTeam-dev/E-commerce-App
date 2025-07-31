const {Order}= require("../model/Order.model")
const Product = require("../model/Product.model")

module.exports = {
    addOrder : async(req,res)=>{
        try {
            const {userId , listeProduct} = req.body
            let total = 0 
            for (const elem of listProduct){
                const product = await Product.findById(elem.productId)
                total += product.price * elem.quantity
            }
            const newOrder = await Order.create({
                userId,
                listeProduct,
                totalPrice : total,
            })
            res.status(201).json({message: "order recieved successfuly",order: newOrder})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },
    deleteOrder : async (req,res)=>{
        try {
            const orderId = req.params.userId
            await Order.findByIdAndDelete(orderId)
            res.json({message : "order deleted"})
        } catch (error) {
            res.status(500).json({error:error.message})
        }
    },
    validateOrder : async (req,res)=>{
        try {
    const order = await Order.findById(req.params.id)
            if (!order) {
  return res.status(404).json({message:"order not found"})
}
for (let element of order.listeProduct) {
    const product = await Product.findById(element.productId)
if (!product) {
    return res.status(400).json({message: "one of the products in the order no longer exists"})
}
if (item.quantity>10) {
    return res.status(400).json({message :`you can not order more than 10 units of ${product.title}`})
}
if (product.stock && item.quantity > product.stock) {
    return res.status(400).json({message: `not enough stock for ${product.title}`})
}

}
       order.aproveIt = true
       await order.save()
res.json({message:"order validated", order})   
            
        } catch (error) {
            res.status(500).json({error : error.message})
        }
    }
}