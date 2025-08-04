import React, { useEffect,useState } from 'react'
import {deleteProduct, getInvalidatedProducts, validateProduct} from '../../../API/FetchProducts'
import {Loader} from 'lucide-react'
function AdminValidProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)


  useEffect(() => {
    setLoading(true);
    getInvalidatedProducts().then((data) => {
      if (data) {
        setProducts(data);
        setLoading(false);
      } else {
        setError("Failed to fetch products");
        setLoading(false);
      }
    }).catch((err) => {
      setError("Failed to fetch products");
      setLoading(false);
    });
  }, []);


  const HandleValidate = async (id) => {
    setLoading(true);
    await validateProduct(id).then(() => {
      setProducts(products.map((p) => p._id === id ? {...p, validated: true} : p));
      setLoading(false);
    }).catch((err) => {
      setError("Failed to validate product");
      setLoading(false);
      return null;
    });
  }


  const HandleDelete = async (id) => {
    setLoading(true);
     await deleteProduct(id).then(() => {
      setProducts(products.filter((p) => p._id !== id));
      setLoading(false);
    }).catch((err) => {
      setError("Failed to delete product");
      setLoading(false);
      return null;
    });
  }


  if (loading) {
    return <Loader className="animate-spin justify-center " />;
  }


  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="p-6">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold mb-4">📦 Not Validated Products ({products.length})</h2>

        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">Title</th>
              <th className="p-2">Price</th>
              <th className="p-2">Promo</th>
              <th className="p-2">Qty</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-t relative">

                <td className="p-2">{p.title}</td>
                <td className="p-2">${p.price}</td>
                <td className="p-2">{p.promo}%</td>
                <td className="p-2">{p.quantity}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded text-white text-xs ${
                      p.quantity > 0 ? p.validated ? "bg-green-500" : "bg-yellow-500" : "bg-red-500"
                    }`}
                  >
                    {p.quantity > 0 ? p.validated ? "Valid" : "Pending" : "Out of Stock"}
                  </span>
                </td>
                <td className="p-2 space-x-3">
                  <button   className="text-yellow-600 hover:underline " onClick={() => HandleValidate(p._id)}>
                    Valid
                  </button>
                  <button onClick={() => HandleDelete(p._id)} className="text-red-600 hover:underline">

                      Delete
                  
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


export default AdminValidProducts
