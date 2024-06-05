import axios from './axios'

export const addComment = async (bookId, commentData) => {
  try {
    const response = await axios.post(`/api/books/${bookId}/comments`, commentData)
    return response.data
  } catch (error) {
    throw new Error('Failed to add comment')
  }
}

export const updateComment = async (id, commentData) => {
  try {
    const response = await axios.put(`/api/comments/${id}`, commentData)
    return response.data
  } catch (error) {
    throw new Error('Failed to update comment')
  }
}

export const deleteComment = async (id) => {
  try {
    const response = await axios.delete(`/api/comments/${id}`)
    return response.data
  } catch (error) {
    throw new Error('Failed to delete comment')
  }
}
