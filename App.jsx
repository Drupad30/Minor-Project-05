import { Routes, Route } from "react-router-dom";
import { ProductDetails } from "./pages/ProductDetails";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity
} from "./store/cartSlice";
import "./App.css";

function Home() {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

const [sort, setSort] = useState("default");

  const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 1999,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "Electronics",
    price: 2499,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
  },
  {
    id: 3,
    name: "Running Shoes",
    category: "Fashion",
    price: 1499,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
  },
  {
    id: 4,
    name: "Backpack",
    category: "Fashion",
    price: 999,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
  }
];
 const filteredProducts = products
  .filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  )
  .filter(product =>
    category === "All" || product.category === category
  )
  .sort((a, b) => {
    if (sort === "low") return a.price - b.price;
    if (sort === "high") return b.price - a.price;
    return 0;
  });

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div>
      <nav className="navbar">
        <h2>🛍️ ShopHUB</h2>

        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#products">Products</a>
          <a href="#cart">Cart ({cartCount})</a>
        </div>
      </nav>

      <section className="hero">
        <h1>Welcome to ShopeHUB!</h1>
        <p>Discover amazing products at affordable prices.</p>
        <a href="#products">
          <button>Shop Now</button>
        </a>
      </section>

      <section className="container" id="products">
        <h1>Our Products</h1>

        <input
          className="search"
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="filters">

  <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
  >
    <option value="All">All Categories</option>
    <option value="Electronics">Electronics</option>
    <option value="Fashion">Fashion</option>
  </select>

  <select
    value={sort}
    onChange={(e) => setSort(e.target.value)}
  >
    <option value="default">Sort by Price</option>
    <option value="low">Price: Low to High</option>
    <option value="high">Price: High to Low</option>
  </select>

</div>

        <div className="product-grid">
          {filteredProducts.map(product => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />

              <h3>{product.name}</h3>
              <h4>₹{product.price}</h4>

              <button
                onClick={() => dispatch(addToCart(product))}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p>No products found.</p>
        )}
      </section>

      <section className="container" id="cart">
        <h1>🛒 Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map(item => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div>
                  <h3>{item.name}</h3>
                  <p>Price: ₹{item.price}</p>

                  <button
                    onClick={() =>
                      dispatch(decreaseQuantity(item.id))
                    }
                  >
                    -
                  </button>

                  <strong> {item.quantity} </strong>

                  <button
                    onClick={() =>
                      dispatch(increaseQuantity(item.id))
                    }
                  >
                    +
                  </button>

                  <p>
                    Subtotal: ₹{item.price * item.quantity}
                  </p>

                  <button
                    onClick={() =>
                      dispatch(removeFromCart(item.id))
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <h2>Total: ₹{totalPrice}</h2>
          </>
        )}
      </section>

      <footer>
        <p>© 2026 ShopHub. All rights reserved.</p>
        <p>Your Cart: {cartCount} items</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetails />} />
    </Routes>
  );
}

export default App;