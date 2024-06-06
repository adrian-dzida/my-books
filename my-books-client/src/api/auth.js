import axios from './axios'
import { reactive } from 'vue'

export const authState = reactive({
  isAuthenticated: !!localStorage.getItem('token'),
  user: JSON.parse(localStorage.getItem('user') || '{}')
})

export const login = async (credentials) => {
  try {
    const response = await axios.post('/login', credentials)
    const token = response.data.token
    const user = response.data.user
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    authState.isAuthenticated = true
    authState.user = user
  } catch (error) {
    throw new Error('Invalid credentials')
  }
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  authState.isAuthenticated = false
  authState.user = {}
}
