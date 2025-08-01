import React,{ useEffect} from 'react'
import Comment from '../components/productDetail/Comment' 
import ImageContainer from '../components/productDetail/ImageContainer'
import RightBar from '../components/productDetail/RightBar'
import { getProductById } from "../API/HandleProductDetail"

const ProductDetails = () => {

  useEffect(() => {
    getProductById("688c8b4e00b28dab781c395e")
  }, []);

  return (
    <div className='bg-red-100 min-h-screen p-4'>
     <div style={{ display: 'flex' }}>
      <ImageContainer  />
      <RightBar  />
    </div>
    
        <Comment  />
        
        

    </div>
  )
}

export default ProductDetails
