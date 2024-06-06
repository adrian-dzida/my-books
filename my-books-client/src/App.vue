<script setup>
import AppHeader from './components/UI/AppHeader.vue'
import AppFooter from './components/UI/AppFooter.vue'
import { provide } from 'vue'
import { authState } from './api/auth'
provide('authState', authState)
</script>
<template>
  <AppHeader />
  <router-view />
  <AppFooter />
</template>

<script setup></script>
