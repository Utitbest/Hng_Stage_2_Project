<template>
  <main class="ticket-detail container">
    <template v-if="!ticket">
      <p>{{ message || 'Loading ticket...' }}</p>
    </template>

    <template v-else>
      <header class="ticket-detail-header">
        <h1>{{ ticket.title }}</h1>
        <span :class="['status-tag', ticket.status.toLowerCase()]">
          {{ ticket.status }}
        </span>
      </header>

      <section class="ticket-detail-body">
        <p class="ticket-description">{{ ticket.description }}</p>

        <div class="ticket-meta">
          <small>
            Created: {{ formatDateTime(ticket.createdAt) }} <br />
            Last Updated: {{ formatDateTime(ticket.updatedAt) }}
          </small>
        </div>
      </section>

      <footer class="ticket-detail-actions">
        <button
          @click="$router.push(`/tickets/edit/${ticket.id}`)"
          class="btn btn-edit"
        >
          Edit
        </button>
        <button @click="handleDelete" class="btn btn-delete">
          Delete
        </button>
        <button @click="$router.push('/tickets')" class="btn btn-secondary">
          Back to List
        </button>
      </footer>

      <p v-if="message" class="feedback success">{{ message }}</p>
    </template>
  </main>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getTicketById, deleteTicket } from '../../utils/storage'
import { isAuthenticated } from '../../utils/auth'

export default {
  name: 'TicketDetail',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const ticket = ref(null)
    const message = ref('')

    onMounted(() => {
      if (!isAuthenticated()) {
        router.push('/auth/login')
        return
      }

      const data = getTicketById(route.params.id)
      if (!data) {
        message.value = '⚠️ Ticket not found.'
        setTimeout(() => {
          router.push('/tickets')
        }, 2000)
      } else {
        ticket.value = data
      }
    })

    const handleDelete = () => {
      if (window.confirm('Are you sure you want to delete this ticket?')) {
        deleteTicket(Number(route.params.id))
        message.value = '✅ Ticket deleted successfully!'
        setTimeout(() => {
          router.push('/tickets')
        }, 1200)
      }
    }

    const formatDateTime = (date) => {
      return new Date(date).toLocaleString()
    }

    return {
      ticket,
      message,
      handleDelete,
      formatDateTime
    }
  }
}
</script>

<style scoped src="../../styles/ticketDetails.css"></style>
