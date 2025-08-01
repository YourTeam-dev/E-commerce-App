import React from 'react'
import Comment from '../components/productDetail/Comment' 
import ImageContainer from '../components/productDetail/ImageContainer'
import RightBar from '../components/productDetail/RightBar'

const ProductDetails = () => {
  return (
    <div className='bg-red-100 min-h-screen p-4'>
     <div style={{ display: 'flex' }}>
      <ImageContainer />
      <RightBar />
    </div>
        <Comment  />
        {/* You can replace 1 with the actual product ID you want to fetch comments for */}
        

    </div>
  )
}

export default ProductDetails
