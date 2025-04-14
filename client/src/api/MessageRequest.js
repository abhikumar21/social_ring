import axios from 'axios'
const API = axios.create({baseURL: 'http://localhost:5000'})

export const addMessage = (data) => API.post(`/message`, data)
export const getMessages = (id) => API.get(`/message/${id}`)