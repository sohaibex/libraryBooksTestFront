import * as booksApi from "../api/BookApi";

export const getAllBooks = async () => {
  const response = await booksApi.getAllBooks();
  return response.data;
};

export const getBookById = async (id) => {
  const response = await booksApi.getBookById(id);
  return response.data;
};

export const createBook = async (book) => {
  const response = await booksApi.addBook(book);
  return response.data;
};

export const editBook = async (id, book) => {
  const response = await booksApi.updateBook(id, book);
  return response.data;
};

export const removeBook = async (id) => {
  const response = await booksApi.deleteBook(id);
  return response.data;
};
