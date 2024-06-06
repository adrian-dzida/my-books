<script setup>
const props = defineProps({
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
</script>
<template>
  <div class="bookCard">
    <div class="bookCard__cover">
      <img class="bookCard__cover__image" :src="props.cover" alt="book cover" />
    </div>
    <div class="bookCard__details">
      <div class="bookCard__details__title">{{ props.title }}</div>
      <div class="bookCard__details__authorAndYear">{{ props.author }} - {{ props.year }}</div>
      <div class="bookCard__description">
        {{ props.description.length < 100 ? props.description + '...' : props.description }}
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
  min-height: 18rem;
}

.bookCard__cover {
  display: flex;
}

.bookCard__cover__image {
  height: 20rem;
  max-width: 13rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.bookCard__details {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bookCard__details__title {
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-text-secondary);
}

.bookCard__details__authorAndYear {
  font-size: 1rem;
  color: var(--color-text-secondary);
}

.bookCard__description {
  font-size: 1rem;
  color: var(--color-text-secondary);
}
</style>
