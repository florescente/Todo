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
import { getUser, signin } from './redux/authSlice'
import PrivateRoute from './Components/PrivateRoute'

function App() {
  const dispatch = useDispatch()
  React.useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      dispatch(signin(!!currentUser))
      dispatch(getUser(currentUser?.email))
    })
  }, [])
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRoute />}>
          <Route path="/table" element={<Table />} />
          <Route path="/redux" element={<Redux />} />
        </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
