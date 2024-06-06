<script setup>
import { useAuthState } from '../composables/useAuthWatch'
import BookCard from '../components/home/BookCard.vue'

const authState = useAuthState()
</script>

<template>
  <div class="container">
    <div class="container__content">
      <div class="container__content__books">
        <BookCard />
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
