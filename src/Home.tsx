
import selfieImage from './assets/selfie.jpg'
import './App.css'
import { Link } from 'react-router-dom'

function Home() {
  const handleDownload = () => {
    // Create a link element
    window.open('https://docs.google.com/document/d/13UcT93MoNEQ7XO4gJVGWUZas6cWiFPv7/edit?usp=sharing&ouid=116848648833830679496&rtpof=true&sd=true', '_blank');
    
    // Download the file
    const downloadUrl = 'https://docs.google.com/document/d/13UcT93MoNEQ7XO4gJVGWUZas6cWiFPv7/export?format=pdf';
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'mah_ying_qi_resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <>
      <div>
        <a className="photo" href="https://mahyingqi123.github.io/PortfolioSite/" target="_blank" rel="noopener noreferrer">
          <img src={selfieImage} className="logo react" alt="Your selfie" />
        </a>
      </div>
      <Link to="/tetris"><h1>Play a game of Tetris while I implement other parts</h1></Link>
      <div className="card">
        <button onClick={handleDownload} id='download-resume'>
          Download My Resume
        </button>
        <div className="iframe-container">
          <iframe 
            src="https://mahyingqi123.github.io/data_visualization/"
            title="Data Visualization Project"
            width="90%"
            height="500px"
            loading="lazy"
            sandbox="allow-same-origin allow-scripts"
          />
          
          <div className='tableauPlaceholder'>
            <iframe 
              className='tableauViz'
              src="https://public.tableau.com/views/DataVisualisation1_16934867257650/Dashboard1?:language=en-GB&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link:showVizHome=no&:embed=true#2"
              title="Tableau Dashboard"
              width="90%"
              height="500px"
            >
              <param name='host_url' value='https://public.tableau.com' />
              <param name='embed_code_version' value='3' />
              <param name='site_root' value='' />
              <param name='name' value='DataVisualisation1_16934867257650/Dashboard1' />
              <param name='tabs' value='yes' />
              <param name='toolbar' value='yes' />
              <param name='showVizHome' value='yes' />
            </iframe>
          </div>
        </div>

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