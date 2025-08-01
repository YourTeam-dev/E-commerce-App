import React, { useEffect, useState } from "react";
import "./SellerPage.css";
import {
  fetchProducts,
  addProduct,
  deleteProduct,
  updateProduct,
} from "../API/SellerCrud";

const SellerPage = () => {
  const sellerId = "688b3d2df993d911face9f4c";
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    color: "",
    size: "",
    images: "",
    price: "",
    promo: "",
    quantity: "",
    rating: "",
  });

  useEffect(() => {
    fetchProducts(sellerId).then((products) => setProducts(products));
  }, []);
  const handleAddProduct = async () => {
    await addProduct(sellerId, newProduct).then(async () => {
      await fetchProducts(sellerId).then((products) => setProducts(products));
    });
  };
  return (
    <div className="seller-container">
      <h1 className="seller-title">📋 Seller Product Dashboard</h1>

      <div className="product-form">
        <h2>➕ Add New Product</h2>
        <div>
          <input
            type="text"
            placeholder="Title"
            value={newProduct.title}
            onChange={(e) =>
              setNewProduct({ ...newProduct, title: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="color"
            value={newProduct.color}
            onChange={(e) =>
              setNewProduct({ ...newProduct, color: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="size"
            value={newProduct.size}
            onChange={(e) =>
              setNewProduct({ ...newProduct, size: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="images"
            value={newProduct.images}
            onChange={(e) =>
              setNewProduct({ ...newProduct, images: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="promo"
            value={newProduct.promo}
            onChange={(e) =>
              setNewProduct({ ...newProduct, promo: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="quantity"
            value={newProduct.quantity}
            onChange={(e) =>
              setNewProduct({ ...newProduct, quantity: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="rating"
            value={newProduct.rating}
            onChange={(e) =>
              setNewProduct({ ...newProduct, rating: e.target.value })
            }
          />
        </div>

        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      <h2 style={{ color: "#c16975" }}>🛒 My Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            <h3>{product.title}</h3>
            {product.images && product.images[0] && (
              <img
                src={product.images[0]}
                alt={product.title}
                style={{
                  width: "100%",
                  height: 150,
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
            )}
            <p>
              <strong>Price:</strong> ${product.price}
            </p>
            <p>
              <strong>Promo:</strong> {product.promo}%
            </p>
            <p>
              <strong>Color:</strong> {product.color}
            </p>
            <p>
              <strong>Size:</strong> {product.size}
            </p>
            <p>
              <strong>Description:</strong> {product.description}
            </p>
            <p>
              <strong>Quantity:</strong> {product.quantity}
            </p>
            <p>
              <strong>Rating:</strong> ⭐ {product.rating}
            </p>
            <div style={{ marginTop: 10 }}>
              <button className="btn-update" onClick={() => updateProduct(sellerId,product._id,{})} >✏️ Update</button>
              <button className="btn-delete" onClick={() => deleteProduct(sellerId,product._id)}>🗑️ Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerPage;
