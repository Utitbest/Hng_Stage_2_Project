<template>
  <main class="dashboard container">
    <header class="dashboard-header">
      <div>
        <h1>Welcome back, {{ user?.name || 'User' }} 👋</h1>
        <p class="subtitle">Here's an overview of your ticket activity.</p>
      </div>
      <button @click="handleLogout" class="btn btn-logout">
        Logout
      </button>
    </header>

    <section class="dashboard-stats">
      <div class="stat-card total">
        <h2>Total Tickets</h2>
        <p>{{ stats.total }}</p>
      </div>
      <div class="stat-card open">
        <h2>Open Tickets</h2>
        <p>{{ stats.open }}</p>
      </div>
      <div class="stat-card resolved">
        <h2>Resolved Tickets</h2>
        <p>{{ stats.resolved }}</p>
      </div>
    </section>

    <section class="dashboard-recent">
      <h2>Recent Tickets</h2>

      <template v-if="recentTickets.length === 0">
        <p class="no-tickets">No tickets yet.</p>
        <button @click="$router.push('/tickets/new')" class="btn btn-primary">
          Create one to get started!
        </button>
      </template>

      <div v-else class="ticket-preview-list">
        <div
          v-for="ticket in recentTickets"
          :key="ticket.id"
          :class="['ticket-card', ticket.status.toLowerCase()]"
        >
          <div class="ticket-header">
            <h3>{{ ticket.title }}</h3>
            <span :class="['status-tag', ticket.status.toLowerCase()]">
              {{ ticket.status }}
            </span>
          </div>
          <p>{{ truncateDescription(ticket.description) }}</p>
          <div class="ticket-footer">
            <small>{{ formatDate(ticket.createdAt) }}</small>
          </div>
        </div>
      </div>

      <div v-if="recentTickets.length > 0" class="view-more-wrapper">
        <button @click="$router.push('/tickets')" class="btn btn-primary">
          View More Tickets →
        </button>
      </div>
    </section>
  </main>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { isAuthenticated, logout } from '../utils/auth'
import { getAllTickets } from '../utils/storage'

export default {
  name: 'Dashboard',
  setup() {
    const router = useRouter()
    const user = ref(null)
    const stats = ref({
      total: 0,
      open: 0,
      resolved: 0
    })
    const recentTickets = ref([])

    onMounted(() => {
      if (!isAuthenticated()) {
        router.push('/auth/login')
        return
      }

      const session = JSON.parse(localStorage.getItem('ticketapp_session'))
      user.value = session?.user || null

      const tickets = getAllTickets()

      const openCount = tickets.filter(t => t.status === 'Open').length
      const resolvedCount = tickets.filter(t => t.status === 'Resolved').length

      stats.value = {
        total: tickets.length,
        open: openCount,
        resolved: resolvedCount
      }

      recentTickets.value = tickets.slice(-3).reverse()
    })

    const handleLogout = () => {
      logout()
      router.push('/auth/login')
    }

    const truncateDescription = (desc) => {
      return desc.length > 100 ? desc.slice(0, 100) + '...' : desc
    }

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString()
    }

    return {
      user,
      stats,
      recentTickets,
      handleLogout,
      truncateDescription,
      formatDate
    }
  }
}
</script>

<style scoped src="../styles/dashboard.css"></style>
