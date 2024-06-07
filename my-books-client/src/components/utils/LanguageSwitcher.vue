<script setup>
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'

const { locale } = useI18n()
const selectedLanguage = ref('en')

const changeLanguage = (lang) => {
  locale.value = lang
  selectedLanguage.value = lang
}
</script>

<template>
  <div class="language-switcher">
    <select v-model="selectedLanguage" @change="changeLanguage(selectedLanguage)">
      <option value="en">EN</option>
      <option value="pl">PL</option>
    </select>
  </div>
</template>

<style scoped>
.language-switcher {
  margin: 0.5rem 0;
}

select {
  padding: 0.4rem;
  border: none;
  outline: none;
  border-radius: 8px;
  background-color: var(--color-bg-secondary);
  color: var(--color-text-primary);
  cursor: pointer;
}
</style>
