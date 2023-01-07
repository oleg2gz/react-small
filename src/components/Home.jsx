import {Feed} from './Feed'

export const Home = ({posts}) => {
  return (
    <main className="Home">
      {posts.length ? (
        <Feed posts={posts} />
      ) : (
        <p style={{marginTop: '2rem'}}>No posts to display.</p>
      )}
    </main>
  )
}
