<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getBookById } from '../api/books.js'
import { useI18n } from 'vue-i18n'
import ListOfComments from '../components/bookDetails/ListOfComments.vue'
import BookCommentInput from '../components/bookDetails/BookCommentInput.vue'
import { useAuthState } from '../composables/useAuthWatch.js'
const { t } = useI18n()

const route = useRoute()
const router = useRouter()

const book = ref({})
const updateComment = ref(false)

onBeforeMount(async () => {
  const response = await getBookById(route.params.id)
  book.value = response
})

const goToHome = () => {
  router.push('/')
}

const handleUpdateComment = () => {
  updateComment.value = true
}

const handleResetUpdateCommentsWatcher = () => {
  updateComment.value = false
}

const authState = useAuthState()
</script>

<template>
  <p class="breadcrums" @click="goToHome">{{ t('backToList') }}</p>
  <div class="container">
    <div class="container__cover">
      <img class="container__cover__image" :src="book.coverBase64" alt="book cover" />
    </div>
    <div class="container__details">
      <div class="container__details__title">{{ book.title }}</div>
      <div class="container__details__authorAndYear">{{ book.author }} - {{ book.year }}</div>
      <div class="container__details__description">
        {{ book.description }}
      </div>
      <div v-if="authState.isAuthenticated" class="container__details__commentInput">
        <BookCommentInput @updateComments="handleUpdateComment" />
      </div>
    </div>
  </div>
  <h2 class="commentsTitle">{{ t('listOfComments') }}</h2>
  <div class="comments">
    <ListOfComments
      :update-comments="updateComment"
      @resetUpdateCommentsWatcher="handleResetUpdateCommentsWatcher"
    />
  </div>
</template>

<style scoped>
.breadcrums {
  margin-top: 2rem;
  margin-left: 6rem;
  margin-bottom: -2rem;
  font-style: italic;
  color: darkblue;
  cursor: pointer;
}

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
  min-height: 30rem;
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

.container__details__description {
  font-size: 1rem;
  color: var(--color-text-primary);
}

.container__details__commentInput {
  margin-top: 2.5rem;
}

.commentsTitle {
  text-align: center;
}
</style>
