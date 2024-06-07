<script setup>
import AppButton from '../UI/AppButton.vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()

const router = useRouter()

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  cover: {
    type: String,
    required: true
  }
})

const goToBook = () => {
  router.push('/book/' + props.id)
}
</script>
<template>
  <div class="bookCard">
    <div class="bookCard__cover">
      <img class="bookCard__cover__image" :src="props.cover" alt="book cover" />
    </div>
    <div class="bookCard__details">
      <div class="bookCard__details__title">{{ props.title }}</div>
      <div class="bookCard__details__authorAndYear">{{ props.author }} - {{ props.year }}</div>
      <div class="bookCard__details__description">
        {{ props.description.length < 100 ? props.description + '...' : props.description }}
      </div>
      <div class="bookCard__details__button">
        <AppButton
          :button-title="t('details')"
          button-variant="primary"
          :button-action="goToBook"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
.bookCard {
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 1.5rem;
  margin: 1rem;
  border-radius: 20px;
  background-color: var(--color-bg-primary);
  flex: 1;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: 15rem;
}

.bookCard__cover {
  display: flex;
}

.bookCard__cover__image {
  height: 15rem;
  max-width: 13rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.bookCard__details {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 15rem;
  flex: 1;
}

.bookCard__details__title {
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-button-bg);
}

.bookCard__details__authorAndYear {
  font-size: 1rem;
  font-style: italic;
  color: var(--color-button-bg);
  margin-bottom: 2rem;
}

.bookCard__details__description {
  font-size: 1rem;
  color: var(--color-text-secondary);
}

.bookCard__details__button {
  align-self: flex-end;
  padding: 1rem;
  margin: 1rem;
}
</style>
