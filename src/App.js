import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import OrderPage from "./pages/OrderPage";
import UserPage from "./pages/UserPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import PastOrdersPage from "./pages/PastOrdersPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/order/:orderId" element={<OrderPage />} />
        <Route path="/settings" element={<UserPage />} />
        <Route path="/past-orders" element={<PastOrdersPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
