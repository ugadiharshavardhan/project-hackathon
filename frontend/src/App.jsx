import './App.css'
import SignUp from './pages/signup/SignUp'
import SignIn from './pages/signin/SignIn'
import UserPage from './pages/UserPage/UserPage'
import AdminLogin from './pages/AdminLogin/AdminLogin'
import AdminDashboard from './pages/AdminPage/AdminDashboard'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/home/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userpage" element={<UserPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
