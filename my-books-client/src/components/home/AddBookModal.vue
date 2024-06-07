<script setup>
import { ref, computed } from 'vue'
import AppButton from '../UI/AppButton.vue'
import AppInput from '../UI/AppInput.vue'
import { addBook } from '../../api/books'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  isOpen: { type: Boolean, default: false }
})

const emit = defineEmits(['closeModal', 'refreshBooks'])

const title = ref('')
const author = ref('')
const description = ref('')
const year = ref('')
const coverBase64 = ref('')
const isError = ref(false)
const errorMessage = ref('')

const handleTitleInputEmit = (e) => {
  title.value = e
}

const handleAuthorInputEmit = (e) => {
  author.value = e
}

const handleDescriptionInputEmit = (e) => {
  description.value = e.target.value
}

const handleYearInputEmit = (e) => {
  year.value = e
}

const resizeImage = (file, maxWidth, maxHeight, callback) => {
  const reader = new FileReader()
  reader.onload = (event) => {
    const img = new Image()
    img.onload = () => {
      let width = img.width
      let height = img.height

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width
          width = maxWidth
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height
          height = maxHeight
        }
      }

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)
      callback(canvas.toDataURL(file.type))
    }
    img.src = event.target.result
  }
  reader.readAsDataURL(file)
}

const handleCoverInputEmit = (e) => {
  const file = e.target.files[0]
  if (file && file.type === 'image/jpeg' && file.size <= 2 * 1024 * 1024) {
    resizeImage(file, 300, 500, (resizedBase64) => {
      coverBase64.value = resizedBase64
    })
  } else {
    coverBase64.value = ''
    isError.value = true
    errorMessage.value = t('coverInvalid')
  }
}

const closeModal = () => {
  isError.value = false
  errorMessage.value = ''
  emit('closeModal')
}

const validateForm = () => {
  const currentYear = new Date().getFullYear()
  if (title.value.length > 100) {
    errorMessage.value = t('title') + ' ' + t('tooLong')
    return false
  }
  if (author.value.length > 100) {
    errorMessage.value = t('author') + ' ' + t('tooLong')
    return false
  }
  if (description.value.length > 500) {
    errorMessage.value = t('description') + ' ' + t('tooLong')
    return false
  }
  const yearValue = parseInt(year.value, 10)
  if (isNaN(yearValue) || yearValue > currentYear || yearValue < 0) {
    errorMessage.value = t('year') + ' ' + t('invalid')
    return false
  }
  if (coverBase64.value === '') {
    errorMessage.value = t('cover') + ' ' + t('invalid')
    return false
  }
  return true
}

const handleAddBook = async () => {
  if (!validateForm()) {
    isError.value = true
    return
  }

  try {
    await addBook({
      title: title.value,
      author: author.value,
      description: description.value,
      year: parseInt(year.value, 10),
      coverBase64: coverBase64.value
    })
    closeModal()
    emit('refreshBooks')
  } catch (error) {
    isError.value = true
    errorMessage.value = t('addBookError')
  }
}

const showErrorMessage = computed(() => isError.value)
</script>

<template>
  <teleport to="body">
    <transition name="modal">
      <div v-if="props.isOpen" class="modal-overlay">
        <div class="modal" @click.stop>
          <h3 class="modal__title">{{ t('addBook') }}</h3>
          <form @submit.prevent="handleAddBook">
            <AppInput
              :label-text="t('title')"
              input-type="text"
              input-id="titleInput"
              :is-required="true"
              @emit-input-value="handleTitleInputEmit"
            />
            <AppInput
              :label-text="t('author')"
              input-type="text"
              input-id="authorInput"
              :is-required="true"
              @emit-input-value="handleAuthorInputEmit"
            />
            <div>
              <label for="descriptionInput">{{ t('description') }}</label>
              <textarea
                id="descriptionInput"
                v-model="description"
                required
                maxlength="500"
                style="border-radius: 8px"
                @input="handleDescriptionInputEmit"
              ></textarea>
            </div>
            <AppInput
              :label-text="t('year')"
              input-type="number"
              input-id="yearInput"
              :is-required="true"
              @emit-input-value="handleYearInputEmit"
              :max="new Date().getFullYear()"
            />
            <div>
              <label for="coverInput">{{ t('cover') }}</label>
              <input
                type="file"
                id="coverInput"
                accept="image/jpeg"
                @change="handleCoverInputEmit"
                required
              />
            </div>
            <p v-if="showErrorMessage" class="modal__errorMessage">{{ errorMessage }}</p>
            <div class="modal__buttons">
              <AppButton
                :button-title="t('cancel')"
                button-variant="secondary"
                :button-action="closeModal"
              />
              <AppButton
                style="margin-left: 0.5rem"
                :button-title="t('addBook')"
                button-variant="primary"
                button-type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: var(--color-bg-primary);
  color: var(--color-text-secondary);
  padding: 1rem 1.5rem;
  border-radius: 5px;
  width: 20rem;
  opacity: 1;
  transform: scale(1);
  transition: opacity 0.3s;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal form div {
  margin-bottom: 1rem;
}

.modal form label {
  display: block;
}

.modal form input,
.modal form textarea {
  width: 100%;
  padding: 0.4rem;
  box-sizing: border-box;
}

.modal__errorMessage {
  color: red;
  margin: 10px 0;
}

.modal__title {
  margin-bottom: 10px;
}

.modal__buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
}
</style>
