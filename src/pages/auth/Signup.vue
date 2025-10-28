<template>
  <div>
    <Navbar />
    <main class="auth-page container" data-testid="test-signup-page">
      <section class="auth-form-wrapper">
        <h2>Create an Account</h2>
        <p>Join Ticket Manager Pro today!</p>

        <form @submit.prevent="handleSubmit" novalidate>
          <div class="form-group">
            <label for="name">Enter Name</label>
            <input
              type="text"
              id="name"
              name="name"
              v-model="form.name"
            />
            <p v-if="errors.name" class="error-text">{{ errors.name }}</p>
          </div>

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

          <div class="form-group">
            <label for="confirm">Confirm Password</label>
            <input
              type="password"
              id="confirm"
              name="confirm"
              v-model="form.confirm"
            />
            <p v-if="errors.confirm" class="error-text">{{ errors.confirm }}</p>
          </div>

          <button type="submit" class="btn btn-primary">
            Sign Up
          </button>

          <p class="alt-link">
            Already have an account?
            <router-link to="/auth/login">Login here</router-link>
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
import { signupMock } from '../../utils/auth'

export default {
  name: 'SignupPage',
  components: {
    Navbar,
    Footer
  },
  setup() {
    const router = useRouter()
    const form = ref({ name: '', email: '', password: '', confirm: '' })
    const errors = ref({})

    const validateForm = () => {
      const newErrors = {}
      if (!form.value.name) {
        newErrors.name = 'Enter user name!'
      } else if (!/^[A-Za-z\s]{3,}$/.test(form.value.name)) {
        newErrors.name = 'Username must be at least 3 letters and contain only alphabets'
      }
      if (!form.value.email) {
        newErrors.email = 'Email is required'
      } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.value.email)) {
        newErrors.email = 'Invalid email format'
      }
      if (!form.value.password) {
        newErrors.password = 'Password is required'
      } else if (form.value.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters'
      }
      if (form.value.password !== form.value.confirm) {
        newErrors.confirm = 'Passwords do not match'
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
        const session = signupMock({
          email: form.value.email,
          password: form.value.password,
          name: form.value.name
        })
        console.log('User signed up:', session)
        router.push('/dashboard')
      } catch (err) {
        alert(err.message)
      }
    }

    return {
      form,
      errors,
      handleSubmit
    }
  }
}
</script>

<style scoped src="../../styles/signup.css"></style>
