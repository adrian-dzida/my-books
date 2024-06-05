<script setup>
import { ref } from 'vue'

defineProps({
  buttonTitle: String,
  buttonVariant: String,
  buttonAction: Function
})
const baseClass = ref('button')
</script>

<template>
  <button :class="[baseClass, buttonVariant]" @click="buttonAction">{{ buttonTitle }}</button>
</template>

<style scoped>
.button {
  border: none;
  padding: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
}

.primary {
  color: var(--color-button-text);
  background-color: var(--color-button-bg);
}

.button:hover {
  background-color: var(--color-button-bg-hover);
}
.button:active {
  background-color: var(--color-button-bg);
}
</style>
