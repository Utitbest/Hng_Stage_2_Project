<template>
  <footer class="footer">
    <div class="footer-container">
      <p>&copy; {{ new Date().getFullYear() }} Ticket Manager Pro. All rights reserved.</p>
      <div class="footer-links">
        <a href="#" aria-label="About">About</a>
        <a href="#" aria-label="Privacy Policy">Privacy</a>
        <a href="#" aria-label="Terms and Conditions">Terms</a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped src="../styles/footer.css"></style>
