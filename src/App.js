import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import AddPost from './pages/AddPost'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostDescription from './pages/PostDescription';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<ProtectedRouted><Home /></ProtectedRouted>} />
          <Route path='/addpost' element={<ProtectedRouted><AddPost /></ProtectedRouted>} />
          <Route path='/post/:id' element={<ProtectedRouted><PostDescription /></ProtectedRouted>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}
function ProtectedRouted({children}){
  if(localStorage.getItem('bantr-user'))
  {
    return children
  } else {
    return <Navigate to='/login' />
  }
}

export default App;
