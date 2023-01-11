import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from "react"
import axios from 'axios'


function App() {

  const [message, setMessage] = useState("");
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState("");
  const [productEditing, setProductEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3002/message")
      .then((res) => setMessage(res.data.message))
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const newProduct = {
      id: new Date,
      text: product, 
    };
    setProducts([...products].concat(newProduct));
    setProduct("");
  }

  function deleteProduct(id) {
    let updatedProducts = ""
    if (updatedProducts = [...products].filter((product) => product.id !== id)){
    setProducts(updatedProducts);
    }else {
    setProducts(products)
    }
  }

  function submitEdits(id) {
    const updatedProducts = [...products].map((product) => {
      if (product.id === id) {
        product.text = editingText;
      }
      return product;
    });
    setProducts(updatedProducts);
    setProductEditing(null);
  }

  const handleSubmitFunc = ()=>{
      axios.post('http://localhost:3002/message', { Pruduct: product,
        UpdatedProduct: editingText})
        .then((res)=> console.log(res))
  }
  return (
    <div>
      <h1>{message}</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setProduct(e.target.value)} value={product} />
        <button type="submit" onClick={handleSubmitFunc}>+ Add Product</button>
      </form>
        {products.map((product) => (
          <div key={product.id} className="product">
            <div className="product-text"> {product.id === productEditing ? (
              <input type="text" onChange={(e) => setEditingText(e.target.value)} />
            ) :   
              <div>{product.text}</div>
            }
          </div>
            <div className="product-actions"> {product.id === productEditing ? (
              <button onClick={() => submitEdits(product.id)}>Submit Edits</button>
            ) : 
              <button onClick={() => setProductEditing(product.id)}>Edit</button>
            }
              <button onClick={() => deleteProduct(product.id)}>Delete</button>
            </div>
          </div>
          ))}
    </div>
  )
}
export default App;

