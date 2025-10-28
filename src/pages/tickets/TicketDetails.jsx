import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTicketById, deleteTicket } from "../../utils/storage";
import { isAuthenticated } from "../../utils/auth";
import "../../styles/ticketDetails.css";

export default function TicketDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    const data = getTicketById(id);
    if (!data) {
      setMessage("⚠️ Ticket not found.");
      setTimeout(() => navigate("/tickets"), 2000);
    } else {
      setTicket(data);
    }
  }, [id, navigate]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      deleteTicket(Number(id));
      setMessage("✅ Ticket deleted successfully!");
      setTimeout(() => navigate("/tickets"), 1200);
    }
  };

  if (!ticket)
    return (
      <main className="ticket-detail container">
        <p>{message || "Loading ticket..."}</p>
      </main>
    );

  return (
    <main className="ticket-detail container">
      <header className="ticket-detail-header">
        <h1>{ticket.title}</h1>
        <span className={`status-tag ${ticket.status.toLowerCase()}`}>
          {ticket.status}
        </span>
      </header>

      <section className="ticket-detail-body">
        <p className="ticket-description">{ticket.description}</p>

        <div className="ticket-meta">
          <small>
            Created: {new Date(ticket.createdAt).toLocaleString()} <br />
            Last Updated: {new Date(ticket.updatedAt).toLocaleString()}
          </small>
        </div>
      </section>

      <footer className="ticket-detail-actions">
        <button
          onClick={() => navigate(`/tickets/edit/${ticket.id}`)}
          className="btn btn-edit"
        >
          Edit
        </button>
        <button onClick={handleDelete} className="btn btn-delete">
          Delete
        </button>
        <button onClick={() => navigate("/tickets")} className="btn btn-secondary">
          Back to List
        </button>
      </footer>

      {message && <p className="feedback success">{message}</p>}
    </main>
  );
}
