import axios from './axios'

export const getBooks = async () => {
  try {
    const response = await axios.get('/api/books')
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch books')
  }
}

export const getBookById = async (id) => {
  try {
    const response = await axios.get(`/api/books/${id}`)
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch book')
  }
}

export const addBook = async (bookData) => {
  try {
    const response = await axios.post('/api/books', bookData)
    return response.data
  } catch (error) {
    throw new Error('Failed to add book')
  }
}

export const updateBook = async (id, bookData) => {
  try {
    const response = await axios.put(`/api/books/${id}`, bookData)
    return response.data
  } catch (error) {
    throw new Error('Failed to update book')
  }
}

export const deleteBook = async (id) => {
  try {
    const response = await axios.delete(`/api/books/${id}`)
    return response.data
  } catch (error) {
    throw new Error('Failed to delete book')
  }
}
