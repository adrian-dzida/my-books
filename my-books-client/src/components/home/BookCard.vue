<script setup></script>
<template>
  <div class="book-card">
    <div class="book-card__cover">
      <img
        class="book-card__cover__image"
        src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/contemporary-fiction-night-time-book-cover-design-template-1be47835c3058eb42211574e0c4ed8bf_screen.jpg?ts=1698210220"
        alt="book cover"
      />
    </div>
    <div class="book-card__details">
      <div class="book-card__details__title">Title</div>
      <div class="book-card__details__author">Author</div>
      <div class="book-card__details__year">Year</div>
    </div>
  </div>
</template>
<style scoped>
.book-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  margin: 1rem;
}

.book-card__cover__image {
  width: 12rem;
  height: auto;
  object-fit: cover;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.book-card__details {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.book-card__details__title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-text-primary);
}

.book-card__details__author {
  font-size: 1.25rem;
  color: var(--color-text-secondary);
}

.book-card__details__year {
  font-size: 1rem;
  color: var(--color-text-secondary);
}
</style>
