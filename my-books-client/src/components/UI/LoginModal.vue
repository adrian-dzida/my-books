<script setup>
import { ref } from 'vue'
import AppButton from './AppButton.vue'

defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['closeModal'])

const username = ref('')
const password = ref('')

const closeModal = () => {
  emit('closeModal')
}

const login = () => {
  // Implement your login logic here
  console.log(`Logging in with username: ${username.value}, password: ${password.value}`)
  closeModal()
}
</script>

<template>
  <teleport to="body">
    <transition name="modal">
      <div v-if="isOpen" class="modal-overlay">
        <div class="modal" @click.stop>
          <h2>Login</h2>
          <form @submit.prevent="login">
            <div>
              <label for="username">Username:</label>
              <input v-model="username" type="text" id="username" required />
            </div>
            <div>
              <label for="password">Password:</label>
              <input v-model="password" type="password" id="password" required />
            </div>
            <AppButton button-title="Log In" button-variant="primary" />
            <AppButton
              style="margin-left: 0.5rem"
              button-title="Cancel"
              button-variant="secondary"
              :button-action="closeModal"
            />
          </form>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: var(--color-bg-secondary);
  padding: 1.5rem;
  border-radius: 5px;
  width: 20rem;
  opacity: 1;
  transform: scale(1);
  transition: opacity 0.3s;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal form div {
  margin-bottom: 1rem;
}

.modal form label {
  display: block;
}

.modal form input {
  width: 100%;
  padding: 0.4rem;
  box-sizing: border-box;
}
</style>
