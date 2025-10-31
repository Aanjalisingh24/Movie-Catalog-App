import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import API_BASE_URL from "../api";

const Signup = () => {
  const [showPswrd, setShowPswrd] = useState(false);
  const [showConfirmPswrd, setShowConfirmPswrd] = useState(false);
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const handleShowPswrd = () => {
    setShowPswrd(!showPswrd);
  };

  const handleShowConfirmPswrd = () => {
    setShowConfirmPswrd(!showConfirmPswrd);
  };

  const inputHandler = (event) => {
    const { name, value } = event.target;
    setSignupData({ ...signupData, [name]: value });
  };

// Submit signup form and communicate with backend
   const SignupAPIHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}/signup`,
        signupData,
      ); 
      console.log(response);
      toast.success('Account Created Successfully!');
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (error) {
      console.log('API error:', error.response?.data);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || error.response.data.error);
      } else {
        toast.error('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <img
        src="image.jpg"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover "
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
            className="bg-[rgba(0,0,0,0.6)] flex flex-col gap-3 w-[90%] max-w-md p-6 md:p-8 rounded shadow-2xl"
            onSubmit={SignupAPIHandler}
          >
            <h1 className="text-[#FFD700] font-bold text-3xl text-center mb-2">SIGNUP</h1>

            <label htmlFor="email" className="text-[#FFFFFF] text-sm">Email</label>
            <input
              name="email"
              type="text"
              placeholder="Enter Email"
              className="border border-gray-600 bg-gray-700 text-white p-2 rounded outline-none placeholder-gray-400"
              onChange={inputHandler}
            />

            <label htmlFor="password" className="text-[#FFFFFF]  text-sm">Password</label>
            <div className="flex border border-gray-600 bg-gray-700 rounded items-center">
              <input
                type={showPswrd ? 'text' : 'password'}
                name="password"
                id="password"
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

            <label htmlFor="confirmPassword" className="text-[#FFFFFF]  text-sm">Confirm Password</label>
            <div className="flex border border-gray-600 bg-gray-700 rounded items-center">
              <input
                type={showConfirmPswrd ? 'text' : 'password'}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Enter Confirm Password"
                className="p-2 outline-none w-full bg-transparent text-white placeholder-gray-400"
                onChange={inputHandler}
              />
              {showConfirmPswrd ? (
                <VisibilityIcon onClick={handleShowConfirmPswrd} className="text-white cursor-pointer mr-2" />
              ) : (
                <VisibilityOffIcon onClick={handleShowConfirmPswrd} className="text-white cursor-pointer mr-2" />
              )}
            </div>

            <button className="bg-[#FFD700] font-bold text-[#000000] tracking-wide p-2 rounded text-lg hover:bg-[#000000] hover:text-[#FFD700]">
              Signup
            </button>

            <p className="text-center text-[#FFFFFF] text-sm mt-2">
              Already have an account{' '}
              <Link to="/login" className="underline hover:text-[#FFD700]">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};


export default Signup;