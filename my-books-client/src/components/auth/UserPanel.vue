<script setup>
import { ref, computed } from 'vue'
import { checkUserAuthStatus, logout } from '../../api/auth'
import AppButton from '../UI/AppButton.vue'
import LoginModal from '../auth/LoginModal.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const isLoginModalOpen = ref(false)
const userAuthStatus = ref(checkUserAuthStatus())

const openLoginModal = () => {
  isLoginModalOpen.value = true
}

const closeLoginModal = () => {
  userAuthStatus.value = checkUserAuthStatus()
  isLoginModalOpen.value = false
}

const handleLogOut = () => {
  logout()
  userAuthStatus.value = checkUserAuthStatus()
}

const isUserLoggedIn = computed(() => userAuthStatus.value)
</script>

<template>
  <AppButton
    v-if="!isUserLoggedIn"
    :button-title="t('logIn')"
    button-variant="primary"
    :button-action="openLoginModal"
  />
  <AppButton
    v-else
    :button-title="t('logOut')"
    button-variant="primary"
    :button-action="handleLogOut"
  />
  <LoginModal :is-open="isLoginModalOpen" @closeModal="closeLoginModal" />
</template>

<style scoped></style>
