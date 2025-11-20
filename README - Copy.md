# Simple Full Stack E-commerce Platform

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Fullstack](https://img.shields.io/badge/Development-Fullstack-blueviolet?style=for-the-badge)
![E-commerce](https://img.shields.io/badge/Domain-E--commerce-orange?style=for-the-badge)

## Project Overview

This project is a simplified yet comprehensive **Full Stack E-commerce Platform**, meticulously designed to showcase end-to-end web application development. It comprises a dynamic and interactive frontend built with **ReactJS** and a robust backend API powered by **Node.js with Express.js**. The platform allows users to browse products, manage a shopping cart, and proceed through a simulated checkout process, demonstrating proficiency across the entire development stack.

## Key Features

### Frontend (ReactJS)

* **Responsive Product Listing:** Displays products in an attractive, adaptive grid layout that looks great on all devices.
* **Interactive Shopping Cart:**
    * Seamlessly add products to the cart.
    * Dynamically update quantities of items in the cart.
    * Effortlessly remove items from the cart.
    * Real-time cart item count prominently displayed in the navigation bar.
    * Calculates and updates the total price of items in the cart instantly.
* **Streamlined Checkout Flow:**
    * Dedicated, multi-step checkout page with a clear customer information form (Name, Email, Address, Phone).
    * Detailed order summary display before final submission.
    * Simulated order placement via API integration with visual loading states.
    * Provides clear success/error messages and automatically clears the cart upon successful order.
* **Client-Side Routing:** Utilizes `react-router-dom` for smooth and efficient navigation between different application views (Product List, Cart, Checkout) without full page reloads.
* **Modern UI/UX:** Features a clean, intuitive design with consistent typography, a well-defined color palette, and interactive elements (e.g., hover effects, dynamic buttons) for an engaging shopping experience.
* **Lucide React Icons:** Integrated for professional and scalable vector iconography throughout the application.

### Backend (Node.js & Express.js)

* **RESTful API Design:** Implements standard HTTP methods (`GET`, `POST`) following REST principles for product retrieval and order processing.
* **Product Data Management:** Serves a list of mock product data, including details like name, description, price, image URL, and stock.
* **Mock Order Processing:** Simulates the order placement process, including basic stock deduction (in-memory) and generating a mock order ID.
* **In-Memory Data Store:** Uses simple JavaScript arrays for products and orders, demonstrating basic data management without a full database setup. *(Note: All data resets when the server is restarted.)*
* **CORS Enabled:** Configured using the `cors` middleware to allow seamless cross-origin communication with the frontend application.
* **Robust Error Handling:** Returns appropriate HTTP status codes and descriptive JSON error messages for various scenarios (e.g., empty cart, product not found, insufficient stock).

## Technologies Used

* **Frontend:**
    * **React.js:** Core library for building user interfaces, utilizing functional components and hooks.
    * **JavaScript (ES6+):** For component logic, state management, and asynchronous API calls (`fetch`).
    * **HTML5 & CSS3:** For structuring and applying comprehensive, custom styling.
    * **`react-router-dom`:** For client-side routing.
    * **`lucide-react`:** For scalable vector icons.
    * **`npm`:** Node Package Manager for dependency management.
* **Backend:**
    * **Node.js:** JavaScript runtime environment for executing server-side code.
    * **Express.js:** Fast, unopinionated, minimalist web framework for Node.js.
    * **`cors`:** Node.js package for enabling Cross-Origin Resource Sharing.
    * **`npm`:** Node Package Manager for dependency management.

## How to Download and Run the Project

This project is structured as a monorepo (single repository containing multiple projects/folders). You will need to run both the backend and frontend simultaneously.

### 1. Prerequisites

* **Node.js (which includes npm):** Ensure Node.js is installed on your system. Download the LTS (Long Term Support) version from [nodejs.org](https://www.nodejs.org/downloads/).
* **Git:** Ensure Git is installed on your system. Download from [git-scm.com](https://git-scm.com/downloads/).
* **VS Code (Recommended):** For a smooth development experience with its integrated terminal.

### 2. Download the Project

1.  **Open your terminal or Git Bash.**
2.  **Clone the repository:**
    ```bash
    git clone [https://github.com/](https://github.com/)AtharvaMeherkar/EcommerceApp.git
    ```
    *(Note: This is the suggested repository name for the combined app. If you used separate repos for frontend/backend, adjust the `cd` commands accordingly.)*
3.  **Navigate into the main project directory:**
    ```bash
    cd EcommerceApp
    ```

### 3. Setup and Installation

1.  **Open the project in VS Code:**
    ```bash
    code .
    ```
    *(If you set up a VS Code workspace file for `EcommerceApp`, open that instead: `File > Open Workspace from File...`)*
2.  **Open two separate Integrated Terminals in VS Code** (`Ctrl + ~`). One for the backend, one for the frontend.

3.  **Install Backend Dependencies:**
    * In the **first terminal**, navigate to the backend folder:
        ```bash
        cd ecommerce-backend
        ```
    * Install dependencies:
        ```bash
        npm install
        ```
4.  **Install Frontend Dependencies:**
    * In the **second terminal**, navigate to the frontend folder:
        ```bash
        cd ecommerce-frontend
        ```
    * Install dependencies:
        ```bash
        npm install
        ```
        *(This will install React, React Router, Lucide Icons, etc.)*

### 4. Execution

You must run both the backend and frontend servers concurrently.

1.  **Start the Backend API:**
    * In the **first terminal** (where you installed backend dependencies), ensure you are in the `ecommerce-backend` directory.
    * Run:
        ```bash
        node server.js
        ```
    * You should see messages indicating the backend server is running on `http://localhost:5000`. **Keep this terminal window open.**

2.  **Start the Frontend Development Server:**
    * In the **second terminal** (where you installed frontend dependencies), ensure you are in the `ecommerce-frontend` directory.
    * Run:
        ```bash
        npm start
        ```
    * The application will automatically open in your default web browser at `http://localhost:3000`.

### 5. Interacting with the E-commerce Platform

1.  **Browse Products:** Access the frontend in your browser (`http://localhost:3000`). You should see a list of products fetched from your backend.
2.  **Add to Cart:** Click "Add to Cart" on various products. Observe the cart count in the navbar update.
3.  **View Cart:** Navigate to the "Cart" page. You can update quantities, remove items, and see the total price.
4.  **Proceed to Checkout:** Fill in the customer information form and click "Place Order".
    * You should see a success message if the order is processed.
    * Observe the backend terminal for logs confirming the order receipt and processing.

## Screenshots

![image](https://github.com/user-attachments/assets/b3ee7026-2197-4e04-b00b-39d62beaade8)

![image](https://github.com/user-attachments/assets/fc909eb6-e4bd-4bb4-85e8-bf3eda17bfc2)

![image](https://github.com/user-attachments/assets/4c671311-b93c-4bd5-b4a2-f8d2d1082e2a)

![image](https://github.com/user-attachments/assets/929507ae-6eee-4000-b7a0-acefe90f7295)

![image](https://github.com/user-attachments/assets/9e25cb10-66eb-4dba-830a-5c8c4b1bf6cf)

![image](https://github.com/user-attachments/assets/27f127fd-ac7c-4d3f-9d28-125d4f4c396e)

![image](https://github.com/user-attachments/assets/7147c0df-006b-4589-a1a6-4bc835fc3dea)

![image](https://github.com/user-attachments/assets/7be1e685-ac25-4a76-bb6d-6c4a98b100b5)



## What I Learned / Challenges Faced

* **Full-Stack Application Development:** Gained invaluable practical experience in designing, developing, and integrating both frontend and backend components to build a complete web application.
* **Frontend Development with ReactJS:** Mastered building dynamic and interactive user interfaces using React, including component architecture, state management with hooks, and client-side routing (`react-router-dom`).
* **Backend API Development with Node.js & Express.js:** Developed robust server-side logic, implemented RESTful API endpoints, and handled data flow and mock persistence on the backend.
* **Frontend-Backend Integration:** Learned to seamlessly connect a React frontend with a Node.js backend API, managing asynchronous communication (`fetch` API) and handling CORS.
* **E-commerce Logic Implementation:** Implemented core e-commerce functionalities from scratch, such as product display, shopping cart operations, and simulated order processing, including basic stock management.
* **Responsive UI/UX:** Applied advanced CSS techniques (Flexbox, Grid, media queries) to build a visually appealing and adaptive user interface that ensures optimal usability across all device types.
* **Project Structure & Management:** Gained experience in organizing a full-stack application within a monorepo structure, managing dependencies for both frontend and backend components.
