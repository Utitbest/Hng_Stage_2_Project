<template>
  <main class="ticket-edit container">
    <template v-if="!ticket">
      <p>{{ message || 'Loading ticket...' }}</p>
    </template>

    <template v-else>
      <header class="ticket-edit-header">
        <h2>Edit Ticket</h2>
        <button @click="$router.push('/tickets')" class="btn btn-secondary">
          ← Back
        </button>
      </header>

      <form class="ticket-form" @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="title">Title</label>
          <input
            id="title"
            name="title"
            v-model="form.title"
            placeholder="Enter ticket title"
          />
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            id="description"
            name="description"
            v-model="form.description"
            placeholder="Describe the issue"
          />
        </div>

        <div class="form-group">
          <label for="status">Status</label>
          <select
            id="status"
            name="status"
            v-model="form.status"
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        <div class="form-group">
          <label for="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            v-model="form.priority"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <p v-if="message" class="form-message">{{ message }}</p>

        <button type="submit" class="btn btn-primary">
          Save Changes
        </button>
      </form>
    </template>
  </main>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { isAuthenticated } from '../../utils/auth'
import { getTicketById, updateTicket } from '../../utils/storage'

export default {
  name: 'EditTicketPage',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const ticket = ref(null)
    const form = ref({
      title: '',
      description: '',
      status: 'Open',
      priority: 'Medium'
    })
    const message = ref('')

    onMounted(() => {
      if (!isAuthenticated()) {
        router.push('/auth/login')
        return
      }
      const data = getTicketById(route.params.id)
      if (!data) {
        message.value = '⚠️Ticket not found. Redirecting...'
        setTimeout(() => {
          router.push('/tickets')
        }, 2000)
      } else {
        ticket.value = data
        form.value = {
          title: data.title,
          description: data.description,
          status: data.status,
          priority: data.priority
        }
        message.value = ''
      }
    })

    const handleSubmit = () => {
      if (!form.value.title.trim() || !form.value.description.trim()) {
        message.value = '❌ Title and description are required.'
        return
      }

      try {
        updateTicket(route.params.id, form.value)
        message.value = '✅ Ticket updated successfully!'
        setTimeout(() => {
          router.push('/tickets')
        }, 1500)
      } catch (err) {
        message.value = '❌ ' + err.message
      }
    }

    return {
      ticket,
      form,
      message,
      handleSubmit
    }
  }
}
</script>

<style scoped src="../../styles/ticketEdit.css"></style>
