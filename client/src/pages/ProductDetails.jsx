import React from 'react'
import Comment from '../components/productDetail/comment'

const ProductDetails = () => {
  return (
    <div>
        <Comment productId={"688b323058d3de06bd2e287e"} />
        {/* You can replace 1 with the actual product ID you want to fetch comments for */}
    </div>
  )
}

export default ProductDetails