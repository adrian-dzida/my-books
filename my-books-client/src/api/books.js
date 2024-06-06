import axios from './axios'

export const getBooks = async () => {
  try {
    const response = await axios.get('/books')
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch books')
  }
}

export const getBookById = async (id) => {
  try {
    const response = await axios.get(`/books/${id}`)
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch book')
  }
}

export const addBook = async (bookData) => {
  try {
    const response = await axios.post('/books', bookData)
    return response.data
  } catch (error) {
    throw new Error('Failed to add book')
  }
}

export const updateBook = async (id, bookData) => {
  try {
    const response = await axios.put(`/books/${id}`, bookData)
    return response.data
  } catch (error) {
    throw new Error('Failed to update book')
  }
}

export const deleteBook = async (id) => {
  try {
    const response = await axios.delete(`/books/${id}`)
    return response.data
  } catch (error) {
    throw new Error('Failed to delete book')
  }
}
