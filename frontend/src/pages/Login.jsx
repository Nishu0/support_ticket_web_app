import { useState, useEffect } from "react"
import { FaSignInAlt } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { login, reset } from "../features/auth/authSlice"
import { useNavigate } from "react-router-dom"
import Loader from "../components/Loader"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const { email, password } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isError, isLoading, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate("/")
    }

    dispatch(reset)
  }, [dispatch, isError, isSuccess, message, navigate, user])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  if(isLoading) {
    return <Loader />
  }

  return (
    <>
      <section className="heading">
        <h1>
          Login <FaSignInAlt />
        </h1>
        <p>Sign In Your Account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={onChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Sign In</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login
