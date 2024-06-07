<script setup>
import { deleteComment } from '../../api/comments.js'
import { useAuthState } from '../../composables/useAuthWatch.js'

const emit = defineEmits(['updateComments'])

const props = defineProps({
  commentId: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  text: {
    type: String,
    required: true
  }
})

const handleDeleteComment = async () => {
  await deleteComment(props.commentId)
  emit('updateComments')
}

const authState = useAuthState()
</script>

<template>
  <li class="comment">
    <div class="comment__userEmail">{{ props.userEmail }}</div>
    <div class="comment__details__rateAndText">
      {{ props.rating }}/5 - {{ props.text }}
      <span
        v-if="authState.user.email === props.userEmail"
        style="color: red; cursor: pointer"
        @click="handleDeleteComment"
        >DELETE</span
      >
    </div>
  </li>
</template>

<style scoped>
.comment {
  display: flex;
  padding: 1.5rem;
  border-radius: 20px;
  background-color: var(--color-bg-primary);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 80rem;
  justify-content: space-between;
}

.comment__userEmail {
  font-weight: bold;
  color: var(--color-button-bg);
}

.comment__details {
  display: flex;
  flex-direction: column;
}

.comment__details__rate {
  font-size: 1rem;
  font-style: italic;
  color: var(--color-button-bg);
}

.comment__details__rateAndText {
  font-size: 1rem;
  color: var(--color-text-secondary);
}
</style>
