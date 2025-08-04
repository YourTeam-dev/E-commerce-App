const Order = require("../model/Order.model")
const Product = require("../model/Product.model")

module.exports = {
  getUserLatestOrder: async (req, res) => {
    try {
      const { userId } = req.params
      const order = await Order.findOne({ userId, aproveIt: true })
        .sort({ createdAt: -1 })
        .populate("listeProduct.productId")

      if (!order) return res.status(404).json({ message: "No orders found" })

      res.json(order)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  addOrder: async (req, res) => {
    try {
      const { userId, listeProduct } = req.body
      let total = 0
      for (const elem of listeProduct) {
        const product = await Product.findById(elem.productId)
        if (!product) {
          return res.status(400).json({
            message: `Product with Id ${elem.productId} not found`
          })
        }
        total += product.price * elem.quantity
      }
      const newOrder = await Order.create({
        userId,
        listeProduct,
        totalPrice: total
      })
      res.status(201).json({ message: "order received successfully", order: newOrder })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  deleteOrder: async (req, res) => {
    try {
      const orderId = req.params.id
      await Order.findByIdAndDelete(orderId)
      res.json({ message: "order deleted" })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  validateOrder: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id).populate("listeProduct.productId")
      if (!order) {
        return res.status(404).json({ message: "order not found" })
      }

      for (let element of order.listeProduct) {
        const product = element.productId
        if (!product) {
          return res.status(400).json({ message: "product no longer exists" })
        }
        if (element.quantity > 10) {
          return res.status(400).json({ message: `Cannot order more than 10 units of ${product.title}` })
        }
        if (element.quantity > product.quantity) {
          return res.status(400).json({ message: `Not enough stock for ${product.title}` })
        }
      }

      order.aproveIt = req.body.approveIt ?? true
      await order.save()
      res.json({ message: "order updated", order })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  getOrdersWithSellerProducts: async (req, res) => {
    const { sellerId } = req.params

    if (!sellerId) {
      return res.status(400).json({ message: "sellerId is required" })
    }

    try {
      const sellerProducts = await Product.find({ sellerId }).select("_id")
      const sellerProductIds = sellerProducts.map(p => p._id)

      const orders = await Order.find({
        "listeProduct.productId": { $in: sellerProductIds }
      })
        .populate({
          path: "listeProduct.productId",
          populate: {
            path: "sellerId",
            select: "userId phoneNumber"
          }
        })
        .populate("userId", "name email")

      const filteredOrders = orders.map(order => {
        const filteredProducts = order.listeProduct.filter(item =>
          sellerProductIds.some(id => id.equals(item.productId._id))
        )
        return {
          ...order.toObject(),
          listeProduct: filteredProducts
        }
      })

      return res.status(200).json(filteredOrders)
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" })
    }
  },

  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find({})
        .sort({ createdAt: -1 })
        .populate("userId", "name email")
        .populate("listeProduct.productId")

      const filteredOrders = orders.filter(order => {
        if (!order.listeProduct || order.listeProduct.length === 0) {
          return false
        }
        const hasPendingProducts = order.listeProduct.some(p => p.status !== "validated")
        return hasPendingProducts
      })

      res.status(200).json(filteredOrders)
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message })
    }
  },

  validateProductInOrder: async (req, res) => {
    try {
      const { orderId, productId } = req.params

      const order = await Order.findById(orderId).populate("listeProduct.productId")
      if (!order) {
        return res.status(404).json({ message: "Order not found" })
      }

      const productItem = order.listeProduct.find(p =>
        p.productId._id.equals(productId)
      )
      if (!productItem) {
        return res.status(404).json({ message: "Product not found in order" })
      }

      const product = productItem.productId
      if (!product) {
        return res.status(400).json({ message: "Product no longer exists" })
      }
      if (productItem.quantity > 10) {
        return res.status(400).json({ message: `Cannot order more than 10 units of ${product.title}` })
      }
      if (productItem.quantity > product.quantity) {
        return res.status(400).json({ message: `Not enough stock for ${product.title}` })
      }

      productItem.status = "validated"
      await order.save()

      const allValidated = order.listeProduct.every(p => p.status === "validated")
      if (allValidated) {
        await Order.findByIdAndDelete(orderId)
        return res.json({ message: "All products validated, order deleted." })
      }

      res.json({ message: "Product validated", order })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  rejectProductInOrder: async (req, res) => {
    try {
      const { orderId, productId } = req.params
      const order = await Order.findById(orderId)
      if (!order) {
        return res.status(404).json({ message: "Order not found" })
      }

      order.listeProduct = order.listeProduct.filter(
        p => !p.productId.equals(productId)
      )

      await order.save()

      if (order.listeProduct.length === 0) {
        await Order.findByIdAndDelete(orderId)
        return res.json({ message: "Product rejected, order was empty and has been deleted." })
      }

      res.json({ message: "Product rejected and removed from order", order })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}
