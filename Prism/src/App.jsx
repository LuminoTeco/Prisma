import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'

const navBarPaths = ["/", "/about", "/contact"]

function App() {
  const location = useLocation()
  //Verifica se o caminho atual está na lista de caminhos onde a NavBar deve aparecer 
  const showNavBar = navBarPaths.includes(location.pathname)

  console.log(`Current Path: ${location.pathname}`)

  return (
    <div>
      {showNavBar && <NavBar />}
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App
