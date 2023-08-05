
import axios from 'axios'

const API = axios.create({baseURL: "http://localhost:5000"})

export const getUser = (userId) => API.get(`/user/${userId}`)
export const updateUser = (id, formData) => API.put(`/user/${id}`, formData);
export const followuser = (id, data) => API.put(`/user/${id}/follow`, data);
export const unfollowuser = (id, data) => API.put(`user/${id}/unfollow`, data)
export const getAllUsers = () => API.get(`/user`)

//userId => currentUserId