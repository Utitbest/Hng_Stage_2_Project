import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createTicket,
  updateTicket,
  getTicketById,
} from "../../utils/storage";
import { isAuthenticated } from "../../utils/auth";
import "../../styles/createTicket.css";

export default function TicketForm({ mode = "create" }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = mode === "edit";
  const [ticket, setTicket] = useState({ title: "", description: "", status: "Open" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // Load existing ticket data when editing
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }
    if (isEditMode && id) {
      const existing = getTicketById(id);
      if (existing) {
        setTicket(existing);
      } else {
        setMessage("⚠️ Ticket not found.");
        setTimeout(() => navigate("/tickets"), 2000);
      }
    }
  }, [id, isEditMode, navigate]);

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!ticket.title.trim()) newErrors.title = "Title is required";
    if (!ticket.description.trim()) newErrors.description = "Description is required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket({ ...ticket, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      if (isEditMode) {
        updateTicket(Number(id), ticket);
        setMessage("✅ Ticket updated successfully!");
      } else {
        createTicket(ticket);
        setMessage("✅ Ticket created successfully!");
        setTicket({ title: "", description: "", status: "Open" });
      }

      setErrors({});
      setTimeout(() => navigate("/tickets"), 1200);
    } catch (error) {
      setMessage("❌ Something went wrong.");
    }
  };

  return (
    <main className="ticket-form-page container">
      <header className="ticket-form-header">
        <h1>{isEditMode ? "✏️ Edit Ticket" : "➕ Create New Ticket"}</h1>
        <p>
          {isEditMode
            ? "Update the details of your existing ticket below."
            : "Fill out the form to create a new support ticket."}
        </p>
      </header>

      {message && <p className="feedback success">{message}</p>}

      <form onSubmit={handleSubmit} className="ticket-form" noValidate>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={ticket.title}
            onChange={handleChange}
            placeholder="Enter ticket title"
          />
          {errors.title && <p className="error-text">{errors.title}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={ticket.description}
            onChange={handleChange}
            placeholder="Describe the issue..."
          ></textarea>
          {errors.description && <p className="error-text">{errors.description}</p>}
        </div>

        {isEditMode && (
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={ticket.status}
              onChange={handleChange}
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        )}

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {isEditMode ? "Update Ticket" : "Create Ticket"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/tickets")}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}
