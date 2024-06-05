<script setup>
defineProps({
  buttonTitle: String,
  buttonAction: Function
})
</script>

<template>
  <button class="button" @click="buttonAction">{{ buttonTitle }}</button>
</template>

<style scoped>
.button {
  border: none;
}
</style>
