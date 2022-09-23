import axios from "axios"

const API_URL = "/api/users"
const Login_URL = "/api/users/login"

//Register user
const register = async (userData) => {
  const res = await axios.post(API_URL, userData)

  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data))
  }

  return res.data
}

//Login user
const login = async (userData) => {
  const res = await axios.post(Login_URL, userData)

  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data))
  }

  return res.data
}

//Logout user
const logout = async () => localStorage.removeItem("user")

const authService = {
  register,
  logout,
  login,
}

export default authService
