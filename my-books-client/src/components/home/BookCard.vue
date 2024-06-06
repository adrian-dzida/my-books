<script setup></script>
<template>
  <div class="bookCard">
    <div class="bookCard__cover">
      <img
        class="bookCard__cover__image"
        src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/contemporary-fiction-night-time-book-cover-design-template-1be47835c3058eb42211574e0c4ed8bf_screen.jpg?ts=1698210220"
        alt="book cover"
      />
    </div>
    <div class="bookCard__details">
      <div class="bookCard__details__title">Harry Potter and phoenix order</div>

      <div class="bookCard__details__description">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium unde odit itaque
        suscipit beatae, exercitationem vel quibusdam enim, quam voluptatem repellendus. Laudantium,
        quidem expedita. Necessitatibus nihil laborum sequi totam aliquid.
      </div>
    </div>
  </div>
</template>
<style scoped>
.bookCard {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-direction: column;
  padding: 1.5rem;
  margin: 1rem;
}

.bookCard__cover__image {
  width: 12rem;
  height: auto;
  object-fit: cover;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.bookCard__details {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bookCard__details__title {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--color-text-primary);
}

.bookCard__details__author {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}

.bookCard__details__year {
  font-size: 0.8rem;
  color: var(--color-text-secondary);
}

.bookCard__details__description {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}
</style>
