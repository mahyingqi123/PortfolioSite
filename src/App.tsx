import './App.css'
import Home from './Home'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Tetris from './tetris/Tetris'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tetris" element={<Tetris />} />
      </Routes>
    </HashRouter>
  )
}

export default App
