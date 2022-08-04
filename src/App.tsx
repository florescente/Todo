import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './home'
import Redux from './redux'
import Table from './table'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table" element={<Table />} />
        <Route path="/redux" element={<Redux />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
