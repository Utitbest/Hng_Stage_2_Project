<template>
  <main class="ticket-form-page container">
    <header class="ticket-form-header">
      <h1>➕ Create New Ticket</h1>
      <p>Fill out the form to create a new support ticket.</p>
    </header>

    <p v-if="message" class="feedback success">{{ message }}</p>

    <form @submit.prevent="handleSubmit" class="ticket-form" novalidate>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          v-model="ticket.title"
          placeholder="Enter ticket title"
        />
        <p v-if="errors.title" class="error-text">{{ errors.title }}</p>
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="4"
          v-model="ticket.description"
          placeholder="Describe the issue..."
        ></textarea>
        <p v-if="errors.description" class="error-text">{{ errors.description }}</p>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary">
          Create Ticket
        </button>
        <button
          type="button"
          @click="$router.push('/tickets')"
          class="btn btn-secondary"
        >
          Cancel
        </button>
      </div>
    </form>
  </main>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { createTicket } from '../../utils/storage'
import { isAuthenticated } from '../../utils/auth'

export default {
  name: 'TicketForm',
  setup() {
    const router = useRouter()
    const ticket = ref({ title: '', description: '', status: 'Open' })
    const errors = ref({})
    const message = ref('')

    onMounted(() => {
      if (!isAuthenticated()) {
        router.push('/auth/login')
      }
    })

    const validateForm = () => {
      const newErrors = {}
      if (!ticket.value.title.trim()) {
        newErrors.title = 'Title is required'
      }
      if (!ticket.value.description.trim()) {
        newErrors.description = 'Description is required'
      }
      return newErrors
    }

    const handleSubmit = () => {
      const newErrors = validateForm()
      if (Object.keys(newErrors).length > 0) {
        errors.value = newErrors
        return
      }

      try {
        createTicket(ticket.value)
        message.value = '✅ Ticket created successfully!'
        ticket.value = { title: '', description: '', status: 'Open' }
        errors.value = {}
        setTimeout(() => {
          router.push('/tickets')
        }, 1200)
      } catch (error) {
        message.value = '❌ Something went wrong.'
      }
    }

    return {
      ticket,
      errors,
      message,
      handleSubmit
    }
  }
}
</script>

<style scoped src="../../styles/createTicket.css"></style>
