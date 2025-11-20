// ecommerce-backend/server.js

const express = require("express");
const cors = require("cors"); // Import the CORS middleware
const app = express();
const PORT = process.env.PORT || 5000; // Backend will run on port 5000

// Middleware
app.use(cors()); // Enable CORS for all routes, allowing frontend to access
app.use(express.json()); // Enable Express to parse JSON request bodies

// --- In-Memory Data Store (Simulating a Database) ---
let products = [
  {
    id: "prod1",
    name: "Wireless Headphones",
    description: "High-quality sound with noise cancellation.",
    price: 59.99,
    imageUrl: "https://placehold.co/300x200/AEC6CF/333333?text=Headphones",
    category: "Electronics",
    stock: 10,
  },
  {
    id: "prod2",
    name: "Smartwatch",
    description: "Track your fitness and receive notifications.",
    price: 129.99,
    imageUrl: "https://placehold.co/300x200/FFD1DC/333333?text=Smartwatch",
    category: "Wearables",
    stock: 5,
  },
  {
    id: "prod3",
    name: "Portable Bluetooth Speaker",
    description: "Compact design with powerful audio.",
    price: 39.99,
    imageUrl: "https://placehold.co/300x200/B3E0FF/333333?text=Speaker",
    category: "Audio",
    stock: 15,
  },
  {
    id: "prod4",
    name: "Ergonomic Office Chair",
    description: "Comfortable and supportive for long working hours.",
    price: 199.99,
    imageUrl: "https://placehold.co/300x200/D0F0C0/333333?text=Chair",
    category: "Home Office",
    stock: 3,
  },
  {
    id: "prod5",
    name: "USB-C Hub",
    description: "Expand your laptop's connectivity with multiple ports.",
    price: 24.99,
    imageUrl: "https://placehold.co/300x200/FAD02E/333333?text=USB+Hub",
    category: "Accessories",
    stock: 20,
  },
];

let orders = []; // To store mock orders

// --- API Endpoints ---

// GET /api/products: Retrieve all products
app.get("/api/products", (req, res) => {
  console.log("GET /api/products request received.");
  res.json(products);
});

// POST /api/order: Process a new order
app.post("/api/order", (req, res) => {
  const { cartItems, customerInfo } = req.body;
  console.log("POST /api/order request received.");
  console.log("Cart Items:", cartItems);
  console.log("Customer Info:", customerInfo);

  if (!cartItems || cartItems.length === 0) {
    return res
      .status(400)
      .json({ message: "Cart is empty. Cannot process order." });
  }

  // --- Mock Order Processing Logic ---
  let totalAmount = 0;
  let processedItems = [];

  for (const item of cartItems) {
    const product = products.find((p) => p.id === item.id);
    if (!product) {
      return res
        .status(404)
        .json({ message: `Product with ID ${item.id} not found.` });
    }
    if (product.stock < item.quantity) {
      return res
        .status(400)
        .json({
          message: `Not enough stock for ${product.name}. Available: ${product.stock}`,
        });
    }

    // Deduct stock (in-memory)
    product.stock -= item.quantity;
    totalAmount += product.price * item.quantity;
    processedItems.push({
      productId: product.id,
      name: product.name,
      quantity: item.quantity,
      price: product.price,
    });
  }

  const newOrder = {
    orderId: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    customerInfo,
    items: processedItems,
    totalAmount: parseFloat(totalAmount.toFixed(2)),
    orderDate: new Date().toISOString(),
    status: "Pending",
  };

  orders.push(newOrder); // Add to mock orders list

  console.log("Order processed successfully:", newOrder.orderId);
  res.status(200).json({
    message: "Order placed successfully!",
    order: newOrder,
  });
});

// --- Start the Server ---
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log("Available API Endpoints:");
  console.log(`  GET    http://localhost:${PORT}/api/products`);
  console.log(`  POST   http://localhost:${PORT}/api/order`);
});
