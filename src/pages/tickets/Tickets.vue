<template>
  <main class="tickets-page container">
    <header class="tickets-header">
      <div>
        <h1>🎟️ Ticket Management</h1>
        <p>Manage all your support tickets in one place.</p>
      </div>
      <div class="header-actions">
        <button class="btn btn-primary pad" @click="$router.push('/dashboard')">
          Back
        </button>
        <button @click="$router.push('/tickets/new')" class="btn btn-primary pad">
          + Create Ticket
        </button>
        <button @click="handleLogout" class="btn btn-logout pad">
          Logout
        </button>
      </div>
    </header>

    <p v-if="message" class="feedback success">{{ message }}</p>

    <section class="tickets-list">
      <p v-if="tickets.length === 0" class="no-tickets">
        No tickets found. Create one to get started!
      </p>
      <div
        v-for="ticket in tickets"
        :key="ticket.id"
        :class="['ticket-card', `status-${ticket.status.toLowerCase()}`]"
      >
        <div class="ticket-card-header">
          <h3>{{ ticket.title }}</h3>
          <span :class="['status-tag', ticket.status.toLowerCase()]">
            {{ ticket.status }}
          </span>
        </div>
        <p class="ticket-description">{{ ticket.description }}</p>
        <div class="ticket-meta">
          <small>
            Created: {{ formatDate(ticket.createdAt) }} | Updated: {{ formatDate(ticket.updatedAt) }}
          </small>
        </div>
        <div class="ticket-actions">
          <button
            @click="$router.push(`/tickets/${ticket.id}`)"
            class="btn btn btn-view"
          >
            View Details
          </button>
          <button
            @click="handleDelete(ticket.id)"
            class="btn btn-delete"
          >
            Delete
          </button>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getAllTickets, deleteTicket } from '../../utils/storage'
import { isAuthenticated, logout } from '../../utils/auth'

export default {
  name: 'TicketList',
  setup() {
    const router = useRouter()
    const tickets = ref([])
    const message = ref('')

    onMounted(() => {
      if (!isAuthenticated()) {
        router.push('/auth/login')
        return
      }
      const allTickets = getAllTickets()
      tickets.value = allTickets
    })

    const handleDelete = (id) => {
      if (window.confirm('Are you sure you want to delete this ticket?')) {
        deleteTicket(id)
        tickets.value = getAllTickets()
        message.value = '✅ Ticket deleted successfully.'
        setTimeout(() => {
          message.value = ''
        }, 2000)
      }
    }

    const handleLogout = () => {
      logout()
      router.push('/auth/login')
    }

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString()
    }

    return {
      tickets,
      message,
      handleDelete,
      handleLogout,
      formatDate
    }
  }
}
</script>

<style scoped src="../../styles/ticket.css"></style>
