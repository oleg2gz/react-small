import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {format} from 'date-fns'
import api from '../api/posts'
import {useDataContext} from '../context/DataContext'

export const NewPost = () => {
  const {posts, setPosts} = useDataContext()
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newPost = {
      id: crypto.randomUUID(),
      datetime: format(new Date(), 'MMMM dd, yyyy pp'),
      title: postTitle,
      body: postBody,
    }

    try {
      const response = await api.post('/posts', newPost)
      const allPosts = [...posts, response.data]
      setPosts(allPosts)
      setPostTitle('')
      setPostBody('')
      navigate('/')
    } catch (error) {
      console.log(`Error: ${error.message}`)
    }
  }

  return (
    <main className="NewPost">
      <h2>New Post</h2>

      <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Title:</label>
        <input
          id="postTitle"
          type="text"
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />

        <label htmlFor="postBody">Post:</label>
        <textarea
          id="postBody"
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </main>
  )
}
