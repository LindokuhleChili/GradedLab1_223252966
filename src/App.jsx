import { useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "Blue T-Shirt",
    category: "Clothing",
    price: "R150",
    inStock: true,
  },
  {
    id: 2,
    name: "Black Jeans",
    category: "Clothing",
    price: "R300",
    inStock: false,
  },
  {
    id: 3,
    name: "Red Sneakers",
    category: "Shoes",
    price: "R500",
    inStock: true,
  },
  {
    id: 4,
    name: "Wireless Mouse",
    category: "Accessories",
    price: "R250",
    inStock: true,
  },
  {
    id: 5,
    name: "Office Chair",
    category: "Furniture",
    price: "R1200",
    inStock: false,
  },
  {
    id: 6,
    name: "White Shirt",
    category: "Clothing",
    price: "R200",
    inStock: true,
  },
  {
    id: 7,
    name: "Running Shoes",
    category: "Shoes",
    price: "R450",
    inStock: true,
  },
  {
    id: 8,
    name: "Leather Belt",
    category: "Accessories",
    price: "R180",
    inStock: false,
  },
];

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showInStockOnly, setShowInStockOnly] = useState(false);

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesStock = !showInStockOnly || product.inStock;

    return matchesSearch && matchesCategory && matchesStock;
  });

  return (
    <div className="App">
      <h1>Product Catalog</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="filter-container">
        <label htmlFor="category">Filter by category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="stock-filter">
        <label>
          <input
            type="checkbox"
            checked={showInStockOnly}
            onChange={(e) => setShowInStockOnly(e.target.checked)}
          />
          Show only in-stock items
        </label>
      </div>

      <div className="product-list">
        {filteredProducts.length === 0 ? (
          <p className="no-results">
            No products found matching your criteria.
          </p>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <p>Category: {product.category}</p>
              <p>Price: {product.price}</p>
              <p className={product.inStock ? "in-stock" : "out-of-stock"}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
