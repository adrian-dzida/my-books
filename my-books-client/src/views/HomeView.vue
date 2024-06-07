<script setup>
import { ref, onBeforeMount, watch } from 'vue'
import BookCard from '../components/home/BookCard.vue'
import AddBookModal from '../components/home/AddBookModal.vue'
import { getBooks, getBooksByQuery } from '../api/books'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import AppButton from '../components/UI/AppButton.vue'
import { useAuthState } from '../composables/useAuthWatch.js'

const { t } = useI18n()

const route = useRoute()

const books = ref([])
const loading = ref(false)

const showCookieConsent = ref(true)
const addBookModal = ref(false)

const openAddBookModal = () => {
  addBookModal.value = true
}

const closeAddBookModal = () => {
  addBookModal.value = false
}

const acceptCookies = () => {
  showCookieConsent.value = false
}

const fetchBooks = async () => {
  const response = await getBooks()
  books.value = response
}

onBeforeMount(async () => {
  loading.value = true

  if (!route.query.query) {
    await fetchBooks()
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
const authState = useAuthState()
</script>

<template>
  <div v-if="books.length > 0 && !loading" class="container">
    <AddBookModal
      :is-open="addBookModal"
      @close-modal="closeAddBookModal"
      @refresh-books="fetchBooks"
    />
    <div class="container__books">
      <div style="display: flex; margin-right: 2rem; justify-content: flex-end">
        <AppButton
          v-if="authState.isAuthenticated"
          class="addBook"
          :button-title="t('addBook')"
          button-variant="primary"
          :button-action="openAddBookModal"
        />
      </div>
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
  <div v-else-if="loading" class="info">Ładowanie...</div>
  <div v-else class="info">{{ t('notFound') }}</div>

  <div v-if="showCookieConsent" class="cookie-consent">
    <p>{{ t('cookieConsentMessage') }}</p>
    <button @click="acceptCookies">{{ t('acceptCookies') }}</button>
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

.info {
  display: flex;
  padding: 10rem;
  justify-content: center;
  font-size: 2rem;
}

.cookie-consent {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 9999;
}

.cookie-consent p {
  margin: 0;
}

.cookie-consent button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.cookie-consent button:hover {
  background-color: #45a049;
}
</style>
