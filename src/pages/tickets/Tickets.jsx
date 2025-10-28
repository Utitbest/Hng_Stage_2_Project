import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTickets, deleteTicket } from "../../utils/storage";
import { isAuthenticated, logout } from "../../utils/auth";
import "../../styles/ticket.css";

export default function TicketList() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [message, setMessage] = useState("");

  // Load tickets on mount
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }
    const allTickets = getAllTickets();
    setTickets(allTickets);
  }, [navigate]);

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      deleteTicket(id);
      setTickets(getAllTickets());
      setMessage("✅ Ticket deleted successfully.");
      setTimeout(() => setMessage(""), 2000);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <main className="tickets-page container">
      <header className="tickets-header">
        <div>
          <h1>🎟️ Ticket Management</h1>
          <p>Manage all your support tickets in one place.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary pad" onClick={() => navigate("/dashboard")}>
            Back
          </button>
          <button onClick={() => navigate("/tickets/new")} className="btn btn-primary pad">
            + Create Ticket
          </button>
          <button onClick={handleLogout} className="btn btn-logout pad">
            Logout
          </button>
        </div>
      </header>

      {message && <p className="feedback success">{message}</p>}

      <section className="tickets-list">
        {tickets.length === 0 ? (
          <p className="no-tickets">No tickets found. Create one to get started!</p>
        ) : (
          tickets.map((ticket) => (
            <div key={ticket.id} className={`ticket-card status-${ticket.status.toLowerCase()}`}>
              <div className="ticket-card-header">
                <h3>{ticket.title}</h3>
                <span className={`status-tag ${ticket.status.toLowerCase()}`}>
                  {ticket.status}
                </span>
              </div>
              <p className="ticket-description">{ticket.description}</p>
              <div className="ticket-meta">
                <small>
                  Created: {new Date(ticket.createdAt).toLocaleDateString()} | Updated:{" "}
                  {new Date(ticket.updatedAt).toLocaleDateString()}
                </small>
              </div>
              <div className="ticket-actions">
                <button
                  onClick={() => navigate(`/tickets/${ticket.id}`)}
                  className="btn btn btn-view"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleDelete(ticket.id)}
                  className="btn btn-delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
}
