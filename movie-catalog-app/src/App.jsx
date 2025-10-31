import './index.css';
import { BrowserRouter as Router, Routes,Route,Navigate} from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import MoviesCatalog from './components/MoviesCatalog';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home"
            element={
              <ProtectedRoute>
                <MoviesCatalog />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
    </>
  );
};


export default App;
