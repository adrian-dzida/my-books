<script setup>
import { ref } from 'vue'
import { defineProps } from 'vue'

const props = defineProps({
  buttonTitle: {
    type: String,
    default: 'Click me'
  },
  buttonVariant: {
    type: String,
    default: 'primary'
  },
  buttonType: {
    type: String,
    default: 'button'
  },
  buttonAction: {
    type: Function
  }
})
const baseClass = ref('button')
</script>

<template>
  <button
    :class="[baseClass, props.buttonVariant]"
    :type="props.buttonType"
    @click="props.buttonAction"
  >
    {{ props.buttonTitle }}
  </button>
</template>

<style scoped>
.button {
  border: none;
  padding: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  color: var(--color-button-text);
}

.primary {
  background-color: var(--color-button-bg);
}

.secondary {
  background: none;
  border: 1px #fff solid;
  color: #fff;
}

.button:hover {
  background-color: var(--color-button-bg-hover);
}
.button:active {
  background-color: var(--color-button-bg);
}

.secondary:hover {
  background-color: rgba(122, 122, 122, 0.2);
}
</style>
