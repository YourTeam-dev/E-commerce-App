import react,{useEffect , useState } from 'react'
import axios from 'axios'
import ProductItem from './ProductItem'



const products = 
[
  {
    _id: "688c8b4e00b28dab781c3972",
    sellerId: "688c8b4e00b28dab781c395b",
    commentId: [
      "688c8b4e00b28dab781c39a4"
    ],
    reviewId: [
      "688c8b4e00b28dab781c39f8"
    ],
    categoryId: [
      "688c8b4e00b28dab781c392d"
    ],
    title: "Awesome Aluminum Table",
    description: "The Multi-tiered interactive generative AI Keyboard offers reliable performance and slimy design",
    color: "violet",
    size: "L",
    images: [
      "https://loremflickr.com/392/2782?lock=5520931246129412"
    ],
    price: 103.50609579186448,
    promo: 28,
    quantity: 78,
    rating: 4.5,
    createdAt: "2025-08-01T09:39:26.321Z",
    updatedAt: "2025-08-01T09:39:26.406Z",
   
  },
  {
    "_id": "688c8b4e00b28dab781c3960",
    "sellerId": "688c8b4e00b28dab781c395b",
    "commentId": [
      "688c8b4e00b28dab781c39ae",
      "688c8b4e00b28dab781c39c2",
      "688c8b4e00b28dab781c39c4"
    ],
    "reviewId": [
      "688c8b4e00b28dab781c39f0"
    ],
    "categoryId": [
      "688c8b4e00b28dab781c392d"
    ],
    "title": "Rustic Cotton Hat",
    "description": "Our tender-inspired Salad brings a taste of luxury to your swift lifestyle",
    "color": "pink",
    "size": "XL",
    "images": [
      "https://loremflickr.com/1584/2344?lock=5485331673704491"
    ],
    "price": 992.90829498283,
    "promo": 2,
    "quantity": 82,
    "rating": 4.4,
    "createdAt": "2025-08-01T09:39:26.309Z",
    "updatedAt": "2025-08-01T09:39:26.396Z",
    "__v": 1
  },
  {
    "_id": "688c8b4e00b28dab781c397a",
    "sellerId": "688c8b4e00b28dab781c395b",
    "commentId": [
      "688c8b4e00b28dab781c3986",
      "688c8b4e00b28dab781c3998"
    ],
    "reviewId": [
      "688c8b4e00b28dab781c3a16"
    ],
    "categoryId": [
      "688c8b4e00b28dab781c3933"
    ],
    "title": "Refined Bamboo Table",
    "description": "Discover the bleak new Chips with an exciting mix of Cotton ingredients",
    "color": "plum",
    "size": "L",
    "images": [
      "https://loremflickr.com/117/360?lock=660166915302508"
    ],
    "price": 889.700299728993,
    "promo": 25,
    "quantity": 22,
    "rating": 4.3,
    "createdAt": "2025-08-01T09:39:26.326Z",
    "updatedAt": "2025-08-01T09:39:26.412Z",
    "__v": 1
  },
  {
    "_id": "688c8b4e00b28dab781c3978",
    "sellerId": "688c8b4e00b28dab781c395b",
    "commentId": [
      "688c8b4e00b28dab781c39a2",
      "688c8b4e00b28dab781c39cc"
    ],
    "reviewId": [
      "688c8b4e00b28dab781c39de",
      "688c8b4e00b28dab781c39e2"
    ],
    "categoryId": [
      "688c8b4e00b28dab781c392d"
    ],
    "title": "Generic Wooden Bacon",
    "description": "New sky blue Car with ergonomic design for confused comfort",
    "color": "maroon",
    "size": "S",
    "images": [
      "https://loremflickr.com/3464/2420?lock=6208301832648187"
    ],
    "price": 342.1154262321563,
    "promo": 10,
    "quantity": 32,
    "rating": 4,
    "createdAt": "2025-08-01T09:39:26.325Z",
    "updatedAt": "2025-08-01T09:39:26.411Z",
    "__v": 1
  },  {
    "_id": "688c8b4e00b28dab781c3978",
    "sellerId": "688c8b4e00b28dab781c395b",
    "commentId": [
      "688c8b4e00b28dab781c39a2",
      "688c8b4e00b28dab781c39cc"
    ],
    "reviewId": [
      "688c8b4e00b28dab781c39de",
      "688c8b4e00b28dab781c39e2"
    ],
    "categoryId": [
      "688c8b4e00b28dab781c392d"
    ],
    "title": "Generic Wooden Bacon",
    "description": "New sky blue Car with ergonomic design for confused comfort",
    "color": "maroon",
    "size": "S",
    "images": [
      "https://loremflickr.com/3464/2420?lock=6208301832648187"
    ],
    "price": 342.1154262321563,
    "promo": 10,
    "quantity": 32,
    "rating": 4,
    "createdAt": "2025-08-01T09:39:26.325Z",
    "updatedAt": "2025-08-01T09:39:26.411Z",
    "__v": 1
  },  {
    "_id": "688c8b4e00b28dab781c3978",
    "sellerId": "688c8b4e00b28dab781c395b",
    "commentId": [
      "688c8b4e00b28dab781c39a2",
      "688c8b4e00b28dab781c39cc"
    ],
    "reviewId": [
      "688c8b4e00b28dab781c39de",
      "688c8b4e00b28dab781c39e2"
    ],
    "categoryId": [
      "688c8b4e00b28dab781c392d"
    ],
    "title": "Generic Wooden Bacon",
    "description": "New sky blue Car with ergonomic design for confused comfort",
    "color": "maroon",
    "size": "S",
    "images": [
      "https://loremflickr.com/3464/2420?lock=6208301832648187"
    ],
    "price": 342.1154262321563,
    "promo": 10,
    "quantity": 32,
    "rating": 4,
    "createdAt": "2025-08-01T09:39:26.325Z",
    "updatedAt": "2025-08-01T09:39:26.411Z",
    "__v": 1
  },  {
    "_id": "688c8b4e00b28dab781c3978",
    "sellerId": "688c8b4e00b28dab781c395b",
    "commentId": [
      "688c8b4e00b28dab781c39a2",
      "688c8b4e00b28dab781c39cc"
    ],
    "reviewId": [
      "688c8b4e00b28dab781c39de",
      "688c8b4e00b28dab781c39e2"
    ],
    "categoryId": [
      "688c8b4e00b28dab781c392d"
    ],
    "title": "Generic Wooden Bacon",
    "description": "New sky blue Car with ergonomic design for confused comfort",
    "color": "maroon",
    "size": "S",
    "images": [
      "https://loremflickr.com/3464/2420?lock=6208301832648187"
    ],
    "price": 342.1154262321563,
    "promo": 10,
    "quantity": 32,
    "rating": 4,
    "createdAt": "2025-08-01T09:39:26.325Z",
    "updatedAt": "2025-08-01T09:39:26.411Z",
    "__v": 1
  }
]


export default function ProductListWithQuantity(){

    // const [products,setProducts] = useState([])
    const [card,setCard] = useState({})
    
    // const fetchData =async ()=>{
    //   const res = await   axios.get('/api/products')
    //     .then(res=> setProducts(res.data))
    //     .catch(err => console.error("failed to load products",err))
    // }
    // useEffect(()=>{
    //    fetchData()
    // },[])
    const handleQuantityChange = (productId , quantity)=>{
        setCard(prev => ({...prev,[productId]: parseInt(quantity)}))
    }
    
    const handleOrder = ()=>{
        const orderItems = Object.entries(card).map(([productId,quantity])=>({
            productId,
            quantity
        }))
    if (orderItems.length === 0) {
      alert("Please select quantity for at least one product")
      return
    }
        axios.post('/api/orders',{
            userId : "64e123abc123",
            listeProduct : orderItems
        })
        .then(()=> alert("Order placed!"))
        .catch(err =>{
            console.error(err);
            alert("failed to place order")
        })
    }
    return(
        <div className="container mt-4" style ={{backgroundColor : '#f1f1f1ff', padding :"20px",borderRadius : '10px'}}>
        <h3> Products </h3>
       {products.map(product=>(
        <ProductItem key = {product._id} product={product} quantityChange={handleQuantityChange}/>
       ))}
        <button className='btn btn-light' onClick={handleOrder}>Order</button>
        </div>
    )
}