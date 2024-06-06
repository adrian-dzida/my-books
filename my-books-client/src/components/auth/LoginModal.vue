<script setup>
import { ref, computed } from 'vue'
import AppButton from '../UI/AppButton.vue'
import AppInput from '../UI/AppInput.vue'
import { login } from '../../api/auth'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  isOpen: { type: Boolean, default: false }
})

const emit = defineEmits(['closeModal'])

const email = ref('')
const password = ref('')
const isError = ref(false)

const handleEmailInputEmit = (e) => {
  email.value = e
}

const handlePasswordInputEmit = (e) => {
  password.value = e
}

const closeModal = () => {
  isError.value = false
  emit('closeModal')
}

const handleLogin = async () => {
  try {
    await login({ email: email.value, password: password.value })
    closeModal()
  } catch (error) {
    isError.value = true
  }
}

const showErrorMessage = computed(() => isError.value)
</script>

<template>
  <teleport to="body">
    <transition name="modal">
      <div v-if="props.isOpen" class="modal-overlay">
        <div class="modal" @click.stop>
          <h3 class="modal__title">{{ t('login') }}</h3>
          <form @submit.prevent="handleLogin">
            <AppInput
              label-text="Email"
              input-type="email"
              input-id="loginInput"
              :is-required="true"
              @emit-input-value="handleEmailInputEmit"
            />
            <AppInput
              :label-text="t('password')"
              input-type="password"
              input-id="passwordInput"
              :is-required="true"
              @emit-input-value="handlePasswordInputEmit"
            />
            <p v-if="showErrorMessage" class="modal__errorMessage">{{ t('loginError') }}</p>
            <div class="modal__buttons">
              <AppButton
                :button-title="t('cancel')"
                button-variant="secondary"
                :button-action="closeModal"
              />
              <AppButton
                style="margin-left: 0.5rem"
                :button-title="t('logIn')"
                button-variant="primary"
                button-type="submit"
              />
            </div>
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
  background-color: var(--color-bg-primary);
  color: var(--color-text-secondary);
  padding: 1rem 1.5rem;
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

.modal__errorMessage {
  color: red;
  margin: 10px 0;
}

.modal__title {
  margin-bottom: 10px;
}

.modal__buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
}
</style>
