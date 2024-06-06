<template>
  <footer class="footer">
    <p>MyBooks &copy; {{ year }}</p>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const year = ref(new Date().getFullYear())
</script>

<style scoped>
.footer {
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: var(--color-bg-primary);
  text-align: center;
  padding: 3px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  color: var(--color-text-secondary);
}
</style>
