import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/Login";
import SignupPage from "./pages/auth/Signup";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/tickets/Tickets";
import TicketForm from "./pages/tickets/TicketCreate"
import TicketDetail from "./pages/tickets/TicketDetails";
import EditTicketPage from "./pages/tickets/TicketEdit"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { isAuthenticated } from "./utils/auth";

// Protected Route wrapper
function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
      <div className="app-container">

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/signup" element={<SignupPage />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tickets"
            element={
              <ProtectedRoute>
                <Tickets />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/tickets/new"
            element={
              <ProtectedRoute>
                <TicketForm/>
              </ProtectedRoute>
            }
          />

          <Route path="/tickets/:id" element={
            <ProtectedRoute>
              <TicketDetail />
            </ProtectedRoute>
          } />

          <Route 
            path="/tickets/edit/:id/"
            element={
              <ProtectedRoute>
                  <EditTicketPage/>
              </ProtectedRoute>
            }
          />


          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

      </div>
  );
}
