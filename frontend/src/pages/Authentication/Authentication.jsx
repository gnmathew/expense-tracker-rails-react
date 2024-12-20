import { useState } from "react";
import axios from 'axios'
import AuthBtn from "./AuthBtn";

const Authentication = () => {
  const url = import.meta.env.VITE_API_URL;
  const [isSignUp, setIsSignUp] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const handleChange = (e, setState) => {
    e.preventDefault()

    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleAuth = async (e) => {
    e.preventDefault();

    try {
      const path = isSignUp ? 'registrations' : 'sessions'
      const resp = await axios.post(`${url}/${path}`, { user: formData })

      localStorage.removeItem('jwtToken', resp.data.token)
    } catch (error) {
      console.log('Form Submitted:', formData)
    }
  }

  return(
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <form
        className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 w-full max-w-md"
        onSubmit={handleAuth}
        >
          <h2 className="text-2xl font-bold text-center mb-4">{isSignUp ? 'Register' : 'Login'}</h2>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="username"
              id="username"
              onChange={(e) => handleChange(e, setFormData)}
              className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="username"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Username
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => handleChange(e, setFormData)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="password"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>
          <AuthBtn
          isSignUp={isSignUp}
          setIsSignUp={setIsSignUp}
          />
        </form>
      </div>
    </>
  )
}

export default Authentication;