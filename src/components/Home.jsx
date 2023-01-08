import {Feed} from './Feed'

export const Home = ({posts, fetchError, isLoading}) => {
  return (
    <main className="Home">
      {isLoading && <p className="statusMsg">Loading posts...</p>}

      {!isLoading && fetchError && (
        <p className="statusMsg" style={{color: 'red'}}>
          {fetchError}
        </p>
      )}

      {!isLoading && !fetchError && !posts.length && (
        <p className="statusMsg">No posts to display.</p>
      )}

      {!isLoading && !fetchError && posts.length && <Feed posts={posts} />}
    </main>
  )
}
