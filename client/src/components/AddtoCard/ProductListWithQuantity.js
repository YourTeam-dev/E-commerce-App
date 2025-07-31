import react,{useEffect , useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import ProductItem from './ProductItem'
export default function ProductListWithQuantity(){
    const [products,setProducts] = useState([])
    const [card,setCard] = useState({})
    useEffect(()=>{
        axios.get('/api/products')
        .then(res=> setProducts(res.data))
        .catch(err => console.error("failed to load products",err))
    },[])
    const handleQuantityChange = (productId , quantity)=>{
        setCard(prev => ({...prev,[productId]: parseInt(quantity)}))
    }
    
    const handleOrder = ()=>{
        const orderItems = Object.entries(card).map(([productId,quantity])=>({
            productId,
            quantity
        }))
        axios.post('api/orders',{
            userId : "64e123abc123...",
            listeProduct : orderItems
        })
        .then(()=> alert("Order placed!"))
        .catch(err =>{
            console.error(err);
            alert("failed to place order")
        })
    }
    return(
        <div className="container mt-4" style ={{backgroudColor : '#d58a94', padding :"20px",borderRadius : '10px'}}>
        <h3 className='text-white'> Products </h3>
       {products.map(product=>(
        <ProductItem key = {product._id} product={product} quantityChange={handleQuantityChange}/>
       ))}
        <button className='btn btn-light' onClick={handleOrder}>Order</button>
        </div>
    )
}