<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { getBookById } from '../api/books.js'

const route = useRoute()

const book = ref({})

onBeforeMount(async () => {
  const response = await getBookById(route.params.id)
  book.value = response
  console.log(book.value)
})
</script>

<template>
  <div class="container">
    <div class="container__cover">
      <img class="container__cover__image" :src="book.coverBase64" alt="book cover" />
    </div>
    <div class="container__details">
      <div class="container__details__title">{{ book.title }}</div>
      <div class="container__details__authorAndYear">{{ book.author }} - {{ book.year }}</div>
      <div class="container__description">
        {{ book.description }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 2rem;
  margin: 2rem 4rem;
  flex: 1;
  height: 30rem;
}

.container__cover {
  display: flex;
}

.container__cover__image {
  height: 30rem;
  max-width: 30rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.container__details {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 15rem;
  flex: 1;
}

.container__details__title {
  font-size: 3rem;
  font-weight: bold;
  color: var(--color-text-primary);
}

.container__details__authorAndYear {
  font-size: 1rem;
  font-style: italic;
  color: var(--color-text-primary);
  margin-bottom: 2rem;
}

.container__description {
  font-size: 1rem;
  color: var(--color-text-primary);
}
</style>
