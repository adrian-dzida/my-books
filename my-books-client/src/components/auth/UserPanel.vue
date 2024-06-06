<script setup>
import { ref } from 'vue'
import { logout } from '../../api/auth'
import AppButton from '../UI/AppButton.vue'
import LoginModal from '../auth/LoginModal.vue'
import { useAuthState } from '../../composables/useAuthWatch'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const isLoginModalOpen = ref(false)

const openLoginModal = () => {
  isLoginModalOpen.value = true
}

const closeLoginModal = () => {
  isLoginModalOpen.value = false
}

const handleLogOut = () => {
  logout()
}

const authState = useAuthState()
</script>

<template>
  <AppButton
    v-if="authState.isAuthenticated"
    :button-title="t('logOut')"
    button-variant="primary"
    :button-action="handleLogOut"
  />
  <AppButton
    v-else
    :button-title="t('logIn')"
    button-variant="primary"
    :button-action="openLoginModal"
  />
  <LoginModal :is-open="isLoginModalOpen" @closeModal="closeLoginModal" />
</template>

<style scoped></style>
