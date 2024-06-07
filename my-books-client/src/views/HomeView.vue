<script setup>
import { ref, onBeforeMount, watch } from 'vue'
import BookCard from '../components/home/BookCard.vue'
import { getBooks, getBooksByQuery } from '../api/books'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const route = useRoute()

const books = ref([])
const loading = ref(false)

onBeforeMount(async () => {
  loading.value = true
  if (!route.query.query) {
    const response = await getBooks()
    books.value = response
  } else {
    const response = await getBooksByQuery(route.query.query)
    books.value = response
  }
  loading.value = false
})

watch(
  () => route.query.query,
  async (newQuery) => {
    if (newQuery) {
      const response = await getBooksByQuery(route.query.query)
      books.value = response
    } else {
      const response = await getBooks()
      books.value = response
    }
  }
)
</script>

<template>
  <div v-if="books.length > 0 && !loading" class="container">
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
  <div v-else-if="loading" class="info">Loading...</div>
  <div v-else class="info">{{ t('notFound') }}</div>
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

.info {
  display: flex;
  padding: 10rem;
  justify-content: center;
  font-size: 2rem;
}
</style>
