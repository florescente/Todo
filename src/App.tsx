import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/home'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './Components/Layout/navbar'
import SignIn from './Pages/signin'
import SignUp from './Pages/signup'
import React from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase-config'
import { useDispatch } from 'react-redux'
import { getId, getUser, signin } from './redux/authSlice'
import PrivateRoute from './Components/PrivateRoute'
import AuthRoute from './Components/AuthRoute'

function App() {
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      dispatch(signin(!!currentUser))
      dispatch(getUser(currentUser?.email))
      dispatch(getId(currentUser?.uid))
      setIsLoading(false)
    })
  }, [])
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route element={<PrivateRoute loading={isLoading} />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<AuthRoute loading={isLoading} />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
