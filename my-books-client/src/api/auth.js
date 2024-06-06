import axios from './axios'

export const login = async (credentials) => {
  try {
    const response = await axios.post('/login', credentials)
    const token = response.data.token
    const user = response.data.user
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
  } catch (error) {
    throw new Error('Invalid credentials')
  }
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

export const checkUserAuthStatus = () => {
  const userData = localStorage.getItem('user')
  const result = userData !== null ? true : false
  return result
}
