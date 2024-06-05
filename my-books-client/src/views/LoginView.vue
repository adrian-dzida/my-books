<template>
  <div>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
    <p v-if="error">{{ error }}</p>
    <button @click="handleLogout">logout</button>
  </div>
</template>

<script>
import { ref } from 'vue'
import { login, logout } from '../api/auth.js'

export default {
  name: 'LoginView',
  setup() {
    const email = ref('')
    const password = ref('')
    const error = ref(null)

    const handleLogin = async () => {
      try {
        error.value = null
        const data = await login({ email: email.value, password: password.value })
        console.log('User logged in:', data.user)
      } catch (err) {
        error.value = err.message
      }
    }

    const handleLogout = () => {
      logout()
    }

    return {
      email,
      password,
      error,
      handleLogin,
      handleLogout
    }
  }
}
</script>
