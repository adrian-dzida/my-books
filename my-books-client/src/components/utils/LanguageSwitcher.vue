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
      <option value="en">En</option>
      <option value="pl">PL</option>
    </select>
  </div>
</template>

<style scoped>
.language-switcher {
  margin: 10px 0;
}

select {
  padding: 5px;
  font-size: 16px;
  border: none;
  outline: none;
  background-color: var(--color-bg-secondary);
  color: var(--color-text-primary);
  cursor: pointer;
}
</style>
