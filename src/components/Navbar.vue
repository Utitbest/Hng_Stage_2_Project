<template>
  <header class="navbar">
    <nav class="navbar-container">
      <div class="navbar-logo">
        <router-link to="/" aria-label="Go to home page">
          🎫 Ticket Manager Pro
        </router-link>
      </div>

      <ul class="navbar-links">
        <li>
          <router-link to="/" :class="{ active: $route.path === '/' }">
            Home
          </router-link>
        </li>
        <li>
          <router-link
            to="/auth/login"
            :class="{ active: $route.path.includes('/auth/login') }"
          >
            Login
          </router-link>
        </li>
        <li>
          <router-link
            to="/auth/signup"
            :class="{ active: $route.path.includes('/auth/signup') }"
          >
            Signup
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped src="../styles/navbar.css"></style>
