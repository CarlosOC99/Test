import React, { useState } from 'react';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [suggestedProducts, setSuggestedProducts] = useState([]);

  const handleSearch = async () => {
    const response = await fetch(`http://localhost:3000/search?filter=${searchTerm}`);
    const data = await response.json();
    setProducts(data.foundProducts);
    setSuggestedProducts(data.suggestedProducts);
  };

  return (
    <div className="App">
      <h1>Ecommerce Search</h1>
      <input type="text" placeholder="Search products..." onChange={e => setSearchTerm(e.target.value)} />
      <button onClick={handleSearch}>Search</button>

      <h2>Found Products:</h2>
      <ul>
        {products.map(product => (
          <li key={product.name}>Nombre: {product.name}, experiencia base: {product.experience}</li>
        ))}
      </ul>

      <h2>Suggested Products:</h2>
      <ul>
        {suggestedProducts.map(product => (
          <li key={product.name}>{product.name} - {product.experience}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
