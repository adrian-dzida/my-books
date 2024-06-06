<script setup>
import SearchInput from '../utils/SearchInput.vue'
import UserPanel from '../auth/UserPanel.vue'
import LanguageSwitcher from '../utils/LanguageSwitcher.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const goToHome = () => {
  router.push('/')
}
</script>

<template>
  <header class="header">
    <img class="header__logo" src="../../assets/mybookslogo.png" alt="logo" @click="goToHome" />
    <nav class="header__navigation">
      <div class="header__navigation__input"><SearchInput /></div>
      <div class="header__navigation__userPanel"><UserPanel /></div>
      <div class="header__navigation__languageSwitcher"><LanguageSwitcher /></div>
    </nav>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  flex: 1;
  background-color: var(--color-bg-primary);
  padding: 1rem;
  height: 1.5rem;
  justify-content: space-between;
  align-items: center;
}

.header__logo {
  margin: 0 1rem;
  height: 2.5rem;
  cursor: pointer;
}

.header__navigation {
  display: flex;
  margin: 0 3rem;
  align-items: center;
  justify-content: space-between;
  width: 25rem;
}
</style>
