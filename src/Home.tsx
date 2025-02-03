import { useState } from 'react'
import selfieImage from './assets/selfie.jpg'
import './App.css'
import { Link } from 'react-router-dom'

function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a className="photo" href="https://mahyingqi123.github.io/PortfolioSite/" target="_blank" rel="noopener noreferrer">
          <img src={selfieImage} className="logo react" alt="Your selfie" />
        </a>
      </div>
      <Link to="/tetris">Play a game of Tetris while this is in progress</Link>
      <h1>Stay tuned for Mah Ying Qi Portfolio</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Work In Progress
        </p>
      </div>
      <p className="read-the-docs">
        Stay tuned for Mah Ying Qi Portfolio
      </p>
    </>
  )
}

export default Home