<script setup>
import { ref } from 'vue'
import { checkUserAuthStatus } from '../../api/auth'

const isUserLoggedIn = ref(checkUserAuthStatus())
</script>

<template>
  <div>{{ isUserLoggedIn }}</div>
</template>

<style scoped></style>
