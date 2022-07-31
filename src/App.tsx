import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './home'
import Table from './table'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table" element={<Table />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
