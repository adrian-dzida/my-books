import { reactive, inject, watch } from 'vue'

export function useAuthState() {
  const authState = inject('authState')

  const state = reactive({
    isAuthenticated: authState.isAuthenticated,
    user: authState.user
  })

  watch(
    () => authState.isAuthenticated,
    (newVal) => {
      state.isAuthenticated = newVal
    }
  )

  watch(
    () => authState.user,
    (newVal) => {
      state.user = newVal
    }
  )

  return state
}
