import axios from "axios"

const API_URL = "/api/tickets/"

//View notes
const getNotes = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const res = await axios.get(API_URL + ticketId + "/notes", config)

  return res.data
}

//Create note
const createNote = async (noteText, ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const res = await axios.post(API_URL + ticketId + "/notes", { text: noteText }, config)

  return res.data
}

const noteService = {
  getNotes,
  createNote,
}

export default noteService
