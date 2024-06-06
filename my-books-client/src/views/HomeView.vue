<script setup>
import { ref, onMounted, toRaw } from 'vue'
import BookCard from '../components/home/BookCard.vue'
import { getBooks } from '../api/books'

let books = ref([])

onMounted(async () => {
  const response = await getBooks()
  books.value = response
  console.log(toRaw(books.value))
})
</script>

<template>
  <div class="container">
    <div class="container__books">
      <BookCard
        v-for="book in books"
        :key="book.id"
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
