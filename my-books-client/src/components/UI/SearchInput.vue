<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const searchValue = defineModel('searchValue')
</script>

<template>
  <div class="container">
    <input
      v-model="searchValue"
      class="container__searchInput"
      type="text"
      :placeholder="t('enterText')"
      @change="test"
    />
    <button class="container__searchButton">{{ t('search') }}</button>
  </div>
</template>

<style scoped>
.container {
  display: inline-flex;
}

.container__searchInput {
  border: none;
  border-radius: 0.5rem 0 0 0.5rem;
  padding: 0.5rem;
  outline: none;
}
.container__searchButton {
  border: none;
  border-radius: 0 0.5rem 0.5rem 0;
  padding: 0.5rem;
  color: var(--color-button-text);
  background-color: var(--color-button-bg);
  cursor: pointer;
}
.container__searchButton:hover {
  background-color: var(--color-button-bg-hover);
}
.container__searchButton:active {
  background-color: var(--color-button-bg);
}
</style>
