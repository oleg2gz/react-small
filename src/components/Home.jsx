import {useDataContext} from '../context/DataContext'
import {Feed} from './Feed'

export const Home = () => {
  const {searchResult, fetchError, isLoading} = useDataContext()

  return (
    <main className="Home">
      {isLoading && <p className="statusMsg">Loading posts...</p>}

      {!isLoading && fetchError && (
        <p className="statusMsg" style={{color: 'red'}}>
          {fetchError}
        </p>
      )}

      {!isLoading && !fetchError && !searchResult.length && (
        <p className="statusMsg">No posts to display.</p>
      )}

      {!isLoading && !fetchError && searchResult.length && (
        <Feed posts={searchResult} />
      )}
    </main>
  )
}
