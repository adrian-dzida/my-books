<script setup>
import { ref, onBeforeMount, watch, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { getCommentsByBookId } from '../../api/comments.js'
import BookComment from './BookComment.vue'

const props = defineProps({
  updateComments: {
    type: Boolean,
    default: false
  }
})

const { updateComments } = toRefs(props)

const emit = defineEmits(['resetUpdateCommentsWatcher'])

const route = useRoute()

const comments = ref([])

const fetchComments = async () => {
  const response = await getCommentsByBookId(route.params.id)
  comments.value = response
}

onBeforeMount(async () => {
  await fetchComments()
})

watch(updateComments, async (newValue) => {
  if (newValue) {
    await fetchComments()
    emit('resetUpdateCommentsWatcher')
  }
})
</script>

<template>
  <ul class="container">
    <BookComment
      v-for="comment in comments"
      :key="comment.id"
      :comment-id="comment.id"
      :user-email="comment.userEmail"
      :rating="comment.rating"
      :text="comment.text"
      @updateComments="fetchComments()"
    />
  </ul>
</template>

<style scoped>
.container {
  list-style: none;
  display: flex;
  flex-direction: column;
}
</style>
