<script setup>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()

const searchValue = ref('')

const goToSearchBooks = () => {
  router.push(`/search?query=${searchValue.value}`)
}

watch(
  () => route.query.query,
  (newQuery) => {
    if (!newQuery) {
      searchValue.value = ''
    }
  }
)
</script>

<template>
  <div class="container">
    <input
      v-model="searchValue"
      class="container__searchInput"
      type="text"
      :placeholder="t('enterText')"
    />
    <button class="container__searchButton" @click="goToSearchBooks">{{ t('search') }}</button>
  </div>
</template>

<style scoped>
.container {
  display: inline-flex;
}

.container__searchInput {
  border: none;
  border-radius: 8px 0 0 8px;
  padding: 0.5rem;
  outline: none;
  background-color: var(--color-bg-secondary);
}
.container__searchButton {
  border: none;
  border-radius: 0 8px 8px 0;
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
