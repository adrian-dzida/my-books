<template>
  <div class="home">
    <div class="language-switcher">
      <button @click="changeLanguage('en')">English</button>
      <button @click="changeLanguage('pl')">Polski</button>
    </div>
    <h1>{{ t('hello') }}</h1>
  </div>
  <p>xd</p>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const changeLanguage = (lang) => {
  locale.value = lang
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.language-switcher {
  margin: 1rem;
}

.language-switcher button {
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 0.25rem;
}

.language-switcher button:hover {
  background-color: #0056b3;
}
</style>
