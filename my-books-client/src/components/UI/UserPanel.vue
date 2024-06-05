<script setup>
import { ref, reactive, computed } from 'vue'
import { checkUserAuthStatus } from '../../api/auth'
import AppButton from './AppButton.vue'
import LoginModal from './LoginModal.vue'

const isLoginModalOpen = ref(false)
const userAuthStatus = reactive(checkUserAuthStatus())

const isUserLoggedIn = computed(() => {
  return userAuthStatus
})

const openLoginModal = () => {
  isLoginModalOpen.value = true
}

const closeLoginModal = () => {
  isLoginModalOpen.value = false
}
</script>

<template>
  <AppButton
    v-if="!isUserLoggedIn"
    button-title="Log In"
    button-variant="primary"
    :button-action="openLoginModal"
  />
  <LoginModal :is-open="isLoginModalOpen" @closeModal="closeLoginModal" />
</template>

<style scoped></style>
