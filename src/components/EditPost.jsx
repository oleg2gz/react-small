import {useState, useEffect} from 'react'
import {useParams, useNavigate, Link} from 'react-router-dom'
import {format} from 'date-fns'
import api from '../api/posts'
import {useDataContext} from '../context/DataContext'

export const EditPost = () => {
  const {posts, setPosts} = useDataContext()
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')
  const {id} = useParams()
  const navigate = useNavigate()
  const post = posts.find((post) => post.id.toString() === id)

  useEffect(() => {
    if (post) {
      setEditTitle(post.title)
      setEditBody(post.body)
    }
  }, [post, setEditTitle, setEditBody])

  const handleEdit = async (id) => {
    const updatedPost = {
      id,
      datetime: format(new Date(), 'MMMM dd, yyyy pp'),
      title: editTitle,
      body: editBody,
    }

    try {
      const response = await api.put(`/posts/${id}`, updatedPost)
      setPosts(
        posts.map((post) => (post.id === id ? {...response.data} : post))
      )
      setEditTitle('')
      setEditBody('')
      navigate('/')
    } catch (error) {
      console.log(`Error: ${error.message}`)
    }
  }

  return (
    <main className="NewPost">
      {editTitle && (
        <>
          <h2>Edit Post</h2>

          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="editTitle">Title:</label>
            <input
              id="editTitle"
              type="text"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />

            <label htmlFor="editBody">Post:</label>
            <textarea
              id="editBody"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />

            <button type="submit" onClick={() => handleEdit(post.id)}>
              Submit
            </button>
          </form>
        </>
      )}

      {!editTitle && (
        <>
          <h2>Post Not Found</h2>

          <p>Well, that's disappointing.</p>
          <p>
            <Link to="/">Visit Our Homepage</Link>
          </p>
        </>
      )}
    </main>
  )
}
