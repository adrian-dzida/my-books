<script setup>
import SearchInput from './SearchInput.vue'
import UserPanel from './UserPanel.vue'
</script>

<template>
  <header class="header">
    <img class="header__logo" alt="logo" />
    <nav class="header__navigation">
      <div class="header__navigation__input"><SearchInput /></div>
      <div class="header__navigation__userPanel"><UserPanel /></div>
    </nav>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  flex: 1;
  background-color: var(--color-bg-primary);
  padding: 1rem;
  height: 1.5rem;
  justify-content: space-between;
  align-items: center;
}

.header__logo {
  margin: 0 1rem;
}

.header__navigation {
  display: flex;
  margin: 0 3rem;
  align-items: center;
}

.header__navigation__userPanel {
  padding-left: 4rem;
}
</style>
