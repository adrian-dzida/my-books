<script setup>
import { ref, onBeforeMount } from 'vue'
import BookCard from '../components/home/BookCard.vue'
import { getBooks } from '../api/books'

const books = ref([])

onBeforeMount(async () => {
  const response = await getBooks()
  books.value = response
})
</script>

<template>
  <div class="container">
    <div class="container__books">
      <BookCard
        v-for="book in books"
        :key="book.id"
        :id="book.id"
        :title="book.title"
        :author="book.author"
        :year="book.year"
        :description="book.description"
        :cover="book.coverBase64"
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  margin: 2rem;
  padding: 2rem;
  display: flex;
}
.container__books {
  width: 100vw;
}
</style>
