import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";
import { getTicketById, updateTicket } from "../../utils/storage";
import "../../styles/ticketEdit.css";

export default function EditTicketPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [ticket, setTicket] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "Open",
    priority: "Medium",
  });
  const [message, setMessage] = useState("");

  // ✅ Load ticket data
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }
    const data = getTicketById(id);
    if (!data) {
      setMessage("⚠️Ticket not found. Redirecting...");
      setTimeout(() => navigate("/tickets"), 2000);
    } else {
      setTicket(data);
      setForm({
        title: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,
      });
      setMessage("")
    }
  }, [id, navigate]);

  // ✅ Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Validate + Update ticket
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      setMessage("❌ Title and description are required.");
      return;
    }

    try {
      updateTicket(id, form);
      setMessage("✅ Ticket updated successfully!");
      setTimeout(() => navigate("/tickets"), 1500);
    } catch (err) {
      setMessage("❌ " + err.message);
    }
  };

  if (!ticket) {
    return (
      <main className="ticket-edit container">
        <p>{message || "Loading ticket..."}</p>
      </main>
    );
  }

  return (
    <main className="ticket-edit container">
      <header className="ticket-edit-header">
        <h2>Edit Ticket</h2>
        <button onClick={() => navigate("/tickets")} className="btn btn-secondary">
          ← Back
        </button>
      </header>

      <form className="ticket-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter ticket title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe the issue"
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {message && <p className="form-message">{message}</p>}

        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </main>
  );
}
