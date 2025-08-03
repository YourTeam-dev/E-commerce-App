const Order= require("../model/Order.model")
const Product = require("../model/Product.model")

module.exports = {
     getUserLatestOrder: async (req, res) => {
    try {
      const { userId } = req.params;
      const order = await Order.findOne({ userId, aproveIt: true })
        .sort({ createdAt: -1 })
        .populate("listeProduct.productId")

      if (!order) return res.status(404).json({ message: "No orders found" })

      res.json(order)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
    addOrder : async(req,res)=>{
        try {
            const {userId , listeProduct} = req.body
            let total = 0 
            for (const elem of listeProduct){
                const product = await Product.findById(elem.productId)
                if (!product){
                    return res.status(400).json({
                        message : `Product with Id ${elem.productId} not found`
                    })
                }
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
            const orderId = req.params.id
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
if (element.quantity>10) {
    return res.status(400).json({message :`you can not order more than 10 units of ${product.title}`})
}
 if (typeof product.quantity !== "number" || product.quantity < element.quantity) {
    return res.status(400).json({
      message: `Not enough stock for ${product.title}. Only ${product.quantity || 0} left.`
    })
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