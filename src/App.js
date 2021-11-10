import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import OrderPage from "./pages/OrderPage";
import UserPage from "./pages/UserPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import PastOrdersPage from "./pages/PastOrdersPage";

import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/order/:orderId" element={<OrderPage />} />
        <Route path="/settings" element={<UserPage />} />
        <Route path="/past-orders" element={<PastOrdersPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
