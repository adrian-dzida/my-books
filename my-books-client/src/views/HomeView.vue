<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="container">
    <h3 class="container__title">{{ t('listOfBooks') }}</h3>
    <div class="container__content">
      <div class="container__content__books"></div>
      <div class="container__content__addBookPanel"></div>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin: 0.5rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
}
.container__title {
  margin-bottom: 1rem;
}
.container__content {
  display: flex;
}
.container__content__books {
  border: 1px solid green;
  flex: 3;
  height: 20rem;
}
.container__content__addBookPanel {
  border: 1px solid blue;
  flex: 1;
}
</style>
