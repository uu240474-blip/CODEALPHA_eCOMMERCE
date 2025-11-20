// ecommerce-frontend/src/App.js
import React, { useState, useEffect, createContext, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import "./App.css"; // This is still needed for global font import and basic resets
import "./index.css"; // Now our main stylesheet with all custom CSS

// Lucide React Icons for a polished look
// Re-adding AlertCircle here as it's used in ProductList's error state.
import {
  ShoppingCart,
  Package,
  Home,
  CheckCircle,
  XCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";

// Create a Context for the shopping cart
const CartContext = createContext();

// Custom hook to use the cart context
const useCart = () => {
  return useContext(CartContext);
};

// --- Components ---

// Product Card Component
const ProductCard = ({ product, addToCart }) => (
  <div className="product-card">
    <div className="product-card-image-wrapper">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="product-card-image"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://placehold.co/300x200/CCCCCC/333333?text=Image+Unavailable";
        }}
      />
    </div>
    <h3 className="product-card-title">{product.name}</h3>
    <p className="product-card-description">{product.description}</p>
    <p className="product-card-price">${product.price.toFixed(2)}</p>
    {product.stock > 0 ? (
      <button onClick={() => addToCart(product)} className="btn btn-primary">
        <ShoppingCart size={20} /> Add to Cart ({product.stock} in stock)
      </button>
    ) : (
      <span className="product-card-stock-out">Out of Stock</span>
    )}
  </div>
);

// Product Listing Page
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError("Failed to fetch products: " + err.message);
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="loading-message-container">
        <Loader2 size={48} className="loading-spinner" />
        <p className="loading-text">Loading products...</p>
      </div>
    );
  if (error)
    return (
      <div className="error-message-container">
        <AlertCircle size={48} className="error-icon" />{" "}
        {/* AlertCircle is used here */}
        <p className="error-text">Error Loading Products!</p>
        <p className="error-details">{error}</p>
      </div>
    );

  return (
    <div className="product-list-section container">
      <h2 className="product-list-title gradient-text">
        <Package size={56} className="product-list-icon" />
        Our Amazing Products
      </h2>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
};

// Shopping Cart Page
const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.length > 0) {
      navigate("/checkout");
    } else {
      alert("Your cart is empty! Please add some items before checking out."); // Using alert for simplicity
    }
  };

  if (cart.length === 0) {
    return (
      <div className="cart-empty-message container">
        <ShoppingCart size={64} className="cart-empty-icon" />
        <h2 className="cart-empty-message h2">Your Shopping Cart is Empty</h2>
        <p className="cart-empty-message p">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link to="/" className="btn btn-primary">
          <Home size={20} className="icon-margin-right" /> Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-section container">
      <h2 className="cart-title gradient-text">
        <ShoppingCart size={56} className="cart-icon" />
        Your Shopping Cart
      </h2>
      <div className="cart-items-container">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-200 py-4 last:border-b-0"
          >
            <div className="cart-item-details">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="cart-item-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/80x80/CCCCCC/333333?text=No+Image";
                }}
              />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>${item.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="cart-item-actions">
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.id, parseInt(e.target.value))
                }
                className="cart-item-quantity-input"
              />
              <p className="cart-item-total-price">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="btn-secondary"
              >
                <XCircle size={24} />
              </button>
            </div>
          </div>
        ))}
        <div className="cart-summary">
          <p className="cart-total-text">
            Total: ${getTotalPrice().toFixed(2)}
          </p>
          <button onClick={handleCheckout} className="btn btn-success">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

// Checkout Page
const CheckoutPage = () => {
  const { cart, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);

  useEffect(() => {
    // Redirect to cart if it's empty and not a success message
    if (cart.length === 0 && !isOrderSuccess && !orderMessage) {
      navigate("/cart");
    }
  }, [cart, isOrderSuccess, orderMessage, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      setOrderMessage(
        "Your cart is empty! Please add items before placing an order."
      );
      setIsOrderSuccess(false);
      return;
    }
    if (
      !customerInfo.name ||
      !customerInfo.email ||
      !customerInfo.address ||
      !customerInfo.phone
    ) {
      setOrderMessage(
        "Please fill in all required customer information fields."
      );
      setIsOrderSuccess(false);
      return;
    }

    setIsProcessing(true);
    setOrderMessage("");
    setIsOrderSuccess(false);

    try {
      const response = await fetch("http://localhost:5000/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems: cart, customerInfo }),
      });

      const data = await response.json();

      if (response.ok) {
        setOrderMessage(
          data.message ||
            "Order placed successfully! Thank you for your purchase."
        );
        setIsOrderSuccess(true);
        clearCart(); // Clear cart on successful order
        setCustomerInfo({ name: "", email: "", address: "", phone: "" }); // Clear form
      } else {
        setOrderMessage(
          data.message || "Failed to place order. Please try again."
        );
        setIsOrderSuccess(false);
      }
    } catch (error) {
      console.error("Order submission error:", error);
      setOrderMessage(
        "Network error or server unavailable. Please ensure the backend is running."
      );
      setIsOrderSuccess(false);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="checkout-section container">
      <h2 className="checkout-title gradient-text">
        <CheckCircle size={56} className="checkout-icon" />
        Secure Checkout
      </h2>
      <div className="checkout-form-container">
        {orderMessage && (
          <div
            className={`order-message ${isOrderSuccess ? "success" : "error"}`}
          >
            {orderMessage}
          </div>
        )}

        {!isOrderSuccess && cart.length > 0 ? (
          <form onSubmit={handleSubmitOrder} className="checkout-form">
            <h3 className="form-section-title">Customer Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Full Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={customerInfo.name}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={customerInfo.email}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="john.doe@example.com"
                  required
                />
              </div>
              <div className="form-group form-group-full-width">
                <label htmlFor="address" className="form-label">
                  Shipping Address:
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={customerInfo.address}
                  onChange={handleInputChange}
                  rows="3"
                  className="form-textarea"
                  placeholder="123 Main St, Anytown, USA 12345"
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Phone Number:
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>
            </div>

            <h3 className="form-section-title">Order Summary</h3>
            <ul className="checkout-summary-list">
              {cart.map((item) => (
                <li key={item.id} className="checkout-summary-item">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="checkout-total">
              Total: ${getTotalPrice().toFixed(2)}
            </div>

            <button
              type="submit"
              className="btn btn-success btn-full-width"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 size={24} className="icon-spin" /> Processing
                  Order...
                </>
              ) : (
                <>
                  <CheckCircle size={24} /> Place Order
                </>
              )}
            </button>
          </form>
        ) : isOrderSuccess ? (
          <div className="checkout-success-message">
            <CheckCircle size={80} className="checkout-success-icon" />
            <p className="checkout-success-text">Order Placed Successfully!</p>
            <p className="checkout-success-subtext">
              Thank you for your purchase. Your order details have been sent to
              your email.
            </p>
            <Link to="/" className="btn btn-primary">
              <Home size={20} className="icon-margin-right" /> Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="checkout-empty-message">
            <XCircle size={80} className="checkout-empty-icon" />
            <p className="checkout-empty-text">Your Cart is Empty</p>
            <p className="checkout-empty-subtext">
              Please add items to your cart before proceeding to checkout.
            </p>
            <Link to="/" className="btn btn-primary">
              <Home size={20} className="icon-margin-right" /> Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

// Main App Component (CartProvider and Router)
function App() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]); // Keep products state here for stock management

  // Function to add item to cart
  const addToCart = (productToAdd) => {
    const existingItemIndex = cart.findIndex(
      (item) => item.id === productToAdd.id
    );
    const productInStock = products.find((p) => p.id === productToAdd.id);

    if (productInStock && productInStock.stock <= 0) {
      alert(`Sorry, ${productToAdd.name} is out of stock!`); // Using alert for simplicity
      return;
    }

    if (existingItemIndex > -1) {
      // Item already in cart, update quantity
      const updatedCart = cart.map((item, index) =>
        index === existingItemIndex && productInStock.stock > item.quantity
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      // Add new item to cart
      setCart([...cart, { ...productToAdd, quantity: 1 }]);
    }
  };

  // Function to remove item from cart
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  // Function to update item quantity in cart
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      // Prevent quantity from going below 1
      setCart(cart.filter((item) => item.id !== productId)); // Remove if quantity is 0 or less
      return;
    }

    const productInStock = products.find((p) => p.id === productId);
    if (productInStock && newQuantity > productInStock.stock) {
      alert(
        `Cannot add more. Only ${productInStock.stock} of ${productInStock.name} available.`
      );
      return;
    }

    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Function to calculate total price
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Function to clear the cart
  const clearCart = () => {
    setCart([]);
  };

  // Fetch products initially to manage stock (and for display in ProductList)
  useEffect(() => {
    const fetchProductsForStock = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data); // Store products to manage stock
      } catch (err) {
        console.error("Error fetching products for stock management:", err);
        // Optionally set an error state for product list if this fails
      }
    };
    fetchProductsForStock();
  }, []); // Run once on mount

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalPrice,
        clearCart,
        products,
      }}
    >
      <Router>
        <div className="app-container">
          {/* Navbar */}
          <nav className="navbar">
            <div className="container navbar-content">
              <Link to="/" className="navbar-logo gradient-text">
                E-Shop
              </Link>
              <div className="navbar-links">
                <Link to="/" className="navbar-link">
                  <Home size={20} /> Products
                </Link>
                <Link to="/cart" className="navbar-link cart-link">
                  <ShoppingCart size={20} /> Cart
                  {cart.length > 0 && (
                    <span className="cart-badge">
                      {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </nav>

          {/* Page Content */}
          <div className="page-content">
            {" "}
            {/* flex-grow ensures content pushes footer down */}
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
          </div>

          {/* Footer */}
          <footer className="footer">
            <div className="container footer-content">
              &copy; 2025 E-Shop. All rights reserved. Designed for Full Stack
              Demo.
            </div>
          </footer>
        </div>
      </Router>
    </CartContext.Provider>
  );
}

export default App;
