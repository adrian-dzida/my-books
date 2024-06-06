<script setup>
import { useI18n } from 'vue-i18n'
import { useAuthState } from '../composables/useAuthWatch'
import BookCard from '../components/home/BookCard.vue'

const { t } = useI18n()
const authState = useAuthState()
</script>

<template>
  <div class="container">
    <h3 class="container__title">{{ t('listOfBooks') }}</h3>
    <div class="container__content">
      <div class="container__content__books">
        <BookCard />
        <BookCard />
      </div>
      <div v-if="authState.isAuthenticated" class="container__content__addBookPanel"></div>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin: 2rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-bg-secondary);
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: var(--color-bg-primary);
}
.container__title {
  margin-bottom: 1rem;
}
.container__content {
  display: flex;
}
.container__content__books {
  display: flex;
}
.container__content__addBookPanel {
  flex: 1;
}
</style>
