import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../utils/auth";
import { getAllTickets } from "../utils/storage";
import "../styles/dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    resolved: 0,
  });
  const [recentTickets, setRecentTickets] = useState([]);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    // Load user session
    const session = JSON.parse(localStorage.getItem("ticketapp_session"));
    setUser(session?.user || null);

    // Load tickets
    const tickets = getAllTickets();

    // Update stats dynamically
    const openCount = tickets.filter((t) => t.status === "Open").length;
    const resolvedCount = tickets.filter((t) => t.status === "Resolved").length;

    setStats({
      total: tickets.length,
      open: openCount,
      resolved: resolvedCount,
    });

    // Show only latest 3 tickets
    setRecentTickets(tickets.slice(-3).reverse());
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <main className="dashboard container">
      <header className="dashboard-header">
        <div>
          <h1>Welcome back, {user?.name || "User"} 👋</h1>
          <p className="subtitle">Here’s an overview of your ticket activity.</p>
        </div>
        <button onClick={handleLogout} className="btn btn-logout">
          Logout
        </button>
      </header>

      {/* ===== Summary Section ===== */}
      <section className="dashboard-stats">
        <div className="stat-card total">
          <h2>Total Tickets</h2>
          <p>{stats.total}</p>
        </div>
        <div className="stat-card open">
          <h2>Open Tickets</h2>
          <p>{stats.open}</p>
        </div>
        <div className="stat-card resolved">
          <h2>Resolved Tickets</h2>
          <p>{stats.resolved}</p>
        </div>
      </section>

      {/* ===== Recent Tickets Section ===== */}
      <section className="dashboard-recent">
        <h2>Recent Tickets</h2>

        {recentTickets.length === 0 ? (
            <>
              <p className="no-tickets">No tickets yet.</p>
              <button onClick={() => navigate("/tickets/new")} className="btn btn-primary">
                Create one to get started!
              </button>
            </>
        ) : (
          <div className="ticket-preview-list">
            {recentTickets.map((ticket) => (
              <div key={ticket.id} className={`ticket-card ${ticket.status.toLowerCase()}`}>
                <div className="ticket-header">
                  <h3>{ticket.title}</h3>
                  <span className={`status-tag ${ticket.status.toLowerCase()}`}>
                    {ticket.status}
                  </span>
                </div>
                <p>{ticket.description.length > 100 ? ticket.description.slice(0, 100) + "..." : ticket.description}</p>
                <div className="ticket-footer">
                  <small>{new Date(ticket.createdAt).toLocaleDateString()}</small>
                </div>
              </div>
            ))}
          </div>
        )}

        {recentTickets.length > 0 && (
          <div className="view-more-wrapper">
            <button
              onClick={() => navigate("/tickets")}
              className="btn btn-primary"
            >
              View More Tickets →
            </button>
          </div>
        )}
      </section>
    </main>
  );
}


