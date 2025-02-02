import { useState } from 'react'
import selfieImage from './assets/selfie.jpg'
<img src={selfieImage} alt="Selfie" />
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={selfieImage} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Stay tuned for Mah Ying Qi Porfolio</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Work In Progress
        </p>
      </div>
      <p className="read-the-docs">
        Stay tuned for Mah Ying Qi Porfolio
      </p>
    </>
  )
}

export default App
