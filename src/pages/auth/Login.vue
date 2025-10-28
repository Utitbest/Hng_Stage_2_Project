<template>
  <div>
    <Navbar />
    <main class="auth-page container" data-testid="test-login-page">
      <section class="auth-form-wrapper">
        <h2>Welcome Back 👋</h2>
        <p>Please log in to continue managing your tickets.</p>

        <form @submit.prevent="handleSubmit" novalidate>
          <div class="form-group">
            <label for="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              v-model="form.email"
            />
            <p v-if="errors.email" class="error-text">{{ errors.email }}</p>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              v-model="form.password"
            />
            <p v-if="errors.password" class="error-text">{{ errors.password }}</p>
          </div>

          <p v-if="message" class="error-global">{{ message }}</p>

          <button type="submit" class="btn btn-primary">
            Login
          </button>

          <p class="alt-link">
            Don't have an account?
            <router-link to="/auth/signup">Create one here</router-link>
          </p>
        </form>
      </section>
    </main>
    <Footer />
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '../../components/Navbar.vue'
import Footer from '../../components/Footer.vue'
import { loginMock } from '../../utils/auth'

export default {
  name: 'LoginPage',
  components: {
    Navbar,
    Footer
  },
  setup() {
    const router = useRouter()
    const form = ref({ email: '', password: '' })
    const errors = ref({})
    const message = ref('')

    const validateForm = () => {
      const newErrors = {}
      if (!form.value.email) {
        newErrors.email = 'Email is required'
      } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.value.email)) {
        newErrors.email = 'Invalid email format'
      }
      if (!form.value.password) {
        newErrors.password = 'Password is required'
      }
      return newErrors
    }

    const handleSubmit = () => {
      message.value = ''
      const newErrors = validateForm()
      if (Object.keys(newErrors).length > 0) {
        errors.value = newErrors
        return
      }

      try {
        loginMock(form.value)
        router.push('/dashboard')
      } catch (err) {
        message.value = err.message || 'Invalid credentials. Please try again.'
      }
    }

    return {
      form,
      errors,
      message,
      handleSubmit
    }
  }
}
</script>

<style scoped src="../../styles/signup.css"></style>
