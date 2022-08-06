import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/home'
import Redux from './Pages/redux'
import Table from './Pages/table'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './Components/Layout/navbar'
import SignIn from './Pages/signin'
import SignUp from './Pages/signup'
import React from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase-config'
import { useDispatch } from 'react-redux'
import { signin } from './redux/authSlice'

function App() {
  const dispatch = useDispatch()
  React.useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      dispatch(signin(!!currentUser))
    })
  }, [])
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table" element={<Table />} />
        <Route path="/redux" element={<Redux />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
