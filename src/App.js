import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import AddPost from './pages/AddPost'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostDescription from './pages/PostDescription';
import SharePost from './pages/SharePost';
import Share from './pages/Share';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<ProtectedRouted><Home /></ProtectedRouted>} />
          <Route path='/sharepost/:id' element={<ProtectedRouted><SharePost /></ProtectedRouted>} />
          <Route path='/share' element={<ProtectedRouted><Share /></ProtectedRouted>} />
          <Route path='/profile/:id' element={<ProtectedRouted><Profile /></ProtectedRouted>} />
          <Route path='/home' element={<ProtectedRouted><Home /></ProtectedRouted>} />
          <Route path='/addpost' element={<ProtectedRouted><AddPost /></ProtectedRouted>} />
          <Route path='/post/:id' element={<ProtectedRouted><PostDescription /></ProtectedRouted>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}
function ProtectedRouted({ children }) {
  if (localStorage.getItem('bantr-user')) {
    return children
  } else {
    return <Navigate to='/login' />
  }
}

export default App;
