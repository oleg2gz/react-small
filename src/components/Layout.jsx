import {Outlet} from 'react-router-dom'
import {Header} from './Header'
import {Nav} from './Nav'
import {Footer} from './Footer'

export const Layout = ({searchTerm, setSearchTerm, width}) => {
  return (
    <div className="App">
      <Header title="React JS Blog" width={width} />

      <Nav searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <Outlet />

      <Footer />
    </div>
  )
}
