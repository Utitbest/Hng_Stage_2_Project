// import { v4 as uuidv4 } from 'uuid';
// const KEY = 'ticketapp_tickets';

// function readAll(){
//   try{
//     const raw = localStorage.getItem(KEY);
//     return raw ? JSON.parse(raw) : [];
//   } catch { return []; }
// }

// function writeAll(list){
//   localStorage.setItem(KEY, JSON.stringify(list));
//   return list;
// }

// export function getTickets(){
//   return readAll();
// }

// export function getTicket(id){
//   return readAll().find(t => t.id === id);
// }

// export function createTicket(data){
//   const allowedStatuses = ['open','in_progress','closed'];
//   if(!data.title) throw new Error('Title required');
//   if(!allowedStatuses.includes(data.status)) throw new Error('Invalid status');
//   const tickets = readAll();
//   const ticket = { id: uuidv4(), createdAt: Date.now(), updatedAt: Date.now(), ...data };
//   tickets.unshift(ticket);
//   writeAll(tickets);
//   return ticket;
// }

// export function updateTicket(id, data){
//   const tickets = readAll();
//   const idx = tickets.findIndex(t => t.id === id);
//   if(idx === -1) throw new Error('Ticket not found');
//   tickets[idx] = { ...tickets[idx], ...data, updatedAt: Date.now() };
//   writeAll(tickets);
//   return tickets[idx];
// }

// export function deleteTicket(id){
//   let tickets = readAll();
//   tickets = tickets.filter(t => t.id !== id);
//   writeAll(tickets);
// }


// src/utils/tickets.js
const TICKETS_KEY = 'ticketapp_tickets';

// Read all tickets from localStorage
export function getAllTickets() {
  try {
    return JSON.parse(localStorage.getItem(TICKETS_KEY)) || [];
  } catch {
    return [];
  }
}

// Save tickets array
function saveTickets(tickets) {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
}

// Create a new ticket
export function createTicket({ title, description, status = 'Open', priority = 'Medium' }) {
  if (!title || !description) throw new Error('All fields are required');
  const newTicket = {
    id: Date.now(),
    title,
    description,
    status,
    priority,
    createdAt: new Date().toISOString(),
  };

  const tickets = getAllTickets();
  tickets.push(newTicket);
  saveTickets(tickets);
  return newTicket;
}

// Update ticket
export function updateTicket(id, updates) {
  const tickets = getAllTickets();
  const index = tickets.findIndex(t => Number(t.id) === Number(id));
  if (index === -1) throw new Error('Ticket not found');
  tickets[index] = {...tickets[index], ...updates};
  saveTickets(tickets);
  return tickets[index];
}

// Delete ticket
export function deleteTicket(id) {
  const tickets = getAllTickets().filter(t => t.id !== id);
  saveTickets(tickets);
}

// Get single ticket
export function getTicketById(id) {
  return getAllTickets().find(t => String(t.id) === String(id) || null);
}
