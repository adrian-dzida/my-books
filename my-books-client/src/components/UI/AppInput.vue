<script setup>
import { ref } from 'vue'
const props = defineProps({
  labelText: { type: String, default: 'Label' },
  inputType: { type: String, default: 'text' },
  isRequired: { type: Boolean, default: false },
  inputId: { type: String, required: true }
})

const emit = defineEmits(['emitInputValue'])

const inputValue = ref('')

const emitInputValue = () => {
  emit('emitInputValue', inputValue.value)
}
</script>

<template>
  <div class="container">
    <label class="container__label" :for="props.inputId">{{ props.labelText }}</label>
    <input
      v-model="inputValue"
      class="container__input"
      :id="props.inputId"
      :type="props.inputType"
      :required="props.isRequired"
      @change="emitInputValue"
    />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}

.container__label {
  margin: 2px 5px;
}

.container__input {
  border: none;
  border-radius: 8px;
  padding: 0.5rem;
  outline: none;
}
</style>
