import axios from './axios'

export const getCommentsByBookId = async (bookId) => {
  try {
    const response = await axios.get(`/comments/${bookId}`)
    return response.data
  } catch (error) {
    throw new Error('Failed to get comments')
  }
}

export const addComment = async (commentData) => {
  try {
    const response = await axios.post(`/books/comments`, commentData)
    return response.data
  } catch (error) {
    throw new Error('Failed to add comment')
  }
}

export const updateComment = async (id, commentData) => {
  try {
    const response = await axios.put(`/comments/${id}`, commentData)
    return response.data
  } catch (error) {
    throw new Error('Failed to update comment')
  }
}

export const deleteComment = async (id) => {
  try {
    const response = await axios.delete(`/comments/${id}`)
    return response.data
  } catch (error) {
    throw new Error('Failed to delete comment')
  }
}
