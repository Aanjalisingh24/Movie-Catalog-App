import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Login = () => {
  const [showPswrd, setShowPswrd] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const inputHandler = (event) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleShowPswrd = () => {
    setShowPswrd(!showPswrd);
  };

// Submit login form, send credentials to backend, and handle response
  const LoginHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3005/login', loginData, {
        withCredentials: true, 
      });
      const {success, message } = response.data;
      if (success) {
        toast.success(message || "Login successful");
        setTimeout(() => {
        navigate('/home');
      }, 1000);
      } else {
        console.warn("Login failed or user missing:", response.data);
        toast.error(message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      toast.error(
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Login failed. Check credentials.'
      );
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <img
        src="image.jpg"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10">
        <div className="p-4 flex justify-between items-center text-white">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#FFD700] tracking-wide">
            FilmFlare
          </h1>
        </div>

        <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
          <ToastContainer />
          <form
            onSubmit={LoginHandler}
            className="bg-black/50 flex flex-col gap-3 w-[90%] max-w-md p-6 md:p-8 rounded shadow-2xl"
          >
            <h1 className="text-[#FFD700] font-bold text-3xl text-center mb-2">LOGIN</h1>

            <label htmlFor="email" className="text-white text-sm">Email</label>
            <input
              name="email"
              type="email"
              className="border border-gray-600 bg-gray-700 text-white p-2 rounded outline-none placeholder-gray-400"
              placeholder="Enter Email"
              onChange={inputHandler}
            />

            <label htmlFor="password" className="text-white text-sm">Password</label>
            <div className="flex border border-gray-600 bg-gray-700 rounded items-center">
              <input
                type={showPswrd ? 'text' : 'password'}
                name="password"
                placeholder="Enter Password"
                className="p-2 outline-none w-full bg-transparent text-white placeholder-gray-400"
                onChange={inputHandler}
              />
              {showPswrd ? (
                <VisibilityIcon onClick={handleShowPswrd} className="text-white cursor-pointer mr-2" />
              ) : (
                <VisibilityOffIcon onClick={handleShowPswrd} className="text-white cursor-pointer mr-2" />
              )}
            </div>

            <button className="bg-[#FFD700] font-bold text-[#000000] tracking-wide p-2 rounded text-lg hover:bg-[#000000] hover:text-[#FFD700]">
              Login
            </button>

            <p className="text-center text-white text-sm mt-2">
              Create account{' '}
              <Link to="/signup" className="underline hover:text-[#FFD700]">
                Signup
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;