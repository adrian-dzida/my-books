<script setup>
import { ref } from 'vue'
import AppButton from '../UI/AppButton.vue'
import { useI18n } from 'vue-i18n'
import { addComment } from '../../api/comments.js'
import { useRoute } from 'vue-router'
import { useAuthState } from '../../composables/useAuthWatch.js'

const emit = defineEmits(['updateComments'])

const { t } = useI18n()

const route = useRoute()

const commentText = ref('')
const rating = ref(null)

const handleAddComment = async () => {
  const comment = {
    bookId: route.params.id,
    userEmail: authState.user.email,
    text: commentText.value,
    rating: parseInt(rating.value)
  }

  await addComment(comment)
  commentText.value = ''
  rating.value = null
  emit('updateComments')
}

const authState = useAuthState()
</script>

<template>
  <div class="addComment">
    <div class="addComment__header">{{ t('addComment') }}</div>
    <form class="addComment__form" @submit.prevent="handleAddComment">
      <div class="addComment__form__group">
        <label for="text" class="addComment__form__label">{{ t('comment') }}:</label>
        <textarea
          id="text"
          class="addComment__form__textarea"
          maxlength="500"
          v-model="commentText"
          required
        ></textarea>
        <div class="addComment__form__charCount">
          {{ 500 - commentText.length }} {{ t('charactersRemaining') }}
        </div>
      </div>
      <div class="addComment__form__group addComment__form__group--inline">
        <div class="addComment__form__label">{{ t('rating') }}</div>
        <div class="addComment__form__rating">
          <label>
            <input type="radio" name="rating" value="1" v-model="rating" required /> 1
          </label>
          <label> <input type="radio" name="rating" value="2" v-model="rating" /> 2 </label>
          <label> <input type="radio" name="rating" value="3" v-model="rating" /> 3 </label>
          <label> <input type="radio" name="rating" value="4" v-model="rating" /> 4 </label>
          <label> <input type="radio" name="rating" value="5" v-model="rating" /> 5 </label>
        </div>
        <div class="addComment__form__button">
          <AppButton
            :button-title="t('addComment')"
            button-variant="primary"
            button-type="submit"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.addComment {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 20px;
  background-color: var(--color-bg-primary);
  width: 50rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.addComment__header {
  font-size: 1rem;
  font-weight: bold;
  color: var(--color-button-bg);
  text-align: center;
}

.addComment__form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.addComment__form__group {
  display: flex;
  flex-direction: column;
}

.addComment__form__group--inline {
  flex-direction: row;
  align-items: center;
}

.addComment__form__label {
  font-size: 1rem;
  font-weight: bold;
  color: var(--color-button-bg);
  margin-bottom: 0.5rem;
}

.addComment__form__textarea {
  font-size: 1rem;
  padding: 0.5rem;
  border: 1px solid var(--color-text-secondary);
  border-radius: 0.5rem;
  resize: vertical;
  min-height: 2rem;
}

.addComment__form__charCount {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  text-align: right;
  margin-top: 0.5rem;
}

.addComment__form__rating {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-left: 2rem;
  flex: 1;
}

.addComment__form__rating label {
  font-size: 1rem;
  color: var(--color-text-secondary);
}

.addComment__form__button {
  padding: 1rem;
}
</style>
