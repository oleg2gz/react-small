import {Link} from 'react-router-dom'
import {useDataContext} from '../context/DataContext'

export const Nav = () => {
  const {searchTerm, setSearchTerm} = useDataContext()

  return (
    <nav className="Nav">
      <form className="searchForm" onSubmit={(e) => preventDefault()}>
        <label htmlFor="search">Search Posts</label>

        <input
          id="search"
          type="text"
          placeholder="Search Posts"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>

      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="post">Post</Link>
        </li>
        <li>
          <Link to="about">About</Link>
        </li>
      </ul>
    </nav>
  )
}
