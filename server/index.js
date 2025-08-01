const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT
console.log("port:",  port)
require('./model')

// Import user router
const userRouter = require('./router/user.router');



// Routes import

app.use("/api/sellerproduct/",require('./router/sellerProductRoutes'))
// app.use('api/',require('./router/comment.router'))

// Use user router
app.use('/api/users', userRouter);

app.use('/api/category/',require('./router/category.router'))
app.use('/api/products/',require('./router/fetchProduct.router'))
app.use('/api/hero/',require('./router/hero.router'))

app.use("/api/product", require("./router/GetOneProduct.router"));
app.use("/api/comments", require("./router/comment.router"));
app.use("/api/reviews", require("./router/Review.router"));


app.use('/api/Order',require('./router/order.router'))





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
