import axios from 'axios'
const API = axios.create({baseURL: 'http://localhost:5000'}) 

export const createChat = (senderId, recieverId) => API.post(`/chat`, {senderId, recieverId})
export const userChats = (id) => API.get(`/chat/${id}`)
export const findChat = (senderId, recieverId) => API.get(`/chat/find/${senderId}/${recieverId}`)