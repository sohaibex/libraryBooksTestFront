import axios from './interceptor/AxiosInterceptor';

export const getAllBooks = () => {
    return axios.get('/books');
};

export const getBookById = (id) => {
    return axios.get(`/books/${id}`);
};

export const addBook = (book) => {
    return axios.post('/books', book);
};

export const updateBook = (id, book) => {
    return axios.put(`/books/${id}`, book);
};

export const deleteBook = (id) => {
    return axios.delete(`/books/${id}`);
};
