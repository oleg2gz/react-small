import {useState, useEffect} from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom'
import {format} from 'date-fns'
import api from '../api/posts'
import {useWindowSize} from '../hooks/useWindowSize'
import {useAxiosFetch} from '../hooks/useAxiosFetch'

import {Layout} from './Layout'
import {Home} from './Home'
import {NewPost} from './NewPost'
import {PostPage} from './PostPage'
import {EditPost} from './EditPost'
import {About} from './About'
import {Missing} from './Missing'

export const App = () => {
  const [posts, setPosts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')
  const navigate = useNavigate()
  const {width} = useWindowSize()

  const {data, fetchError, isLoading} = useAxiosFetch(
    'http://localhost:3500/posts'
  )

  useEffect(() => {
    setPosts(data)
  }, [data])

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    setSearchResult(filteredResults.reverse())
  }, [posts, searchTerm])

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

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`)
      const postsList = posts.filter((post) => post.id !== id)
      setPosts(postsList)
      navigate('/')
    } catch (error) {
      console.log(`Error: ${error.message}`)
    }
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            width={width}
          />
        }
      >
        <Route
          index
          element={
            <Home
              posts={searchResult}
              fetchError={fetchError}
              isLoading={isLoading}
            />
          }
        />

        <Route path="post">
          <Route
            index
            element={
              <NewPost
                handleSubmit={handleSubmit}
                postTitle={postTitle}
                setPostTitle={setPostTitle}
                postBody={postBody}
                setPostBody={setPostBody}
              />
            }
          />

          <Route
            path=":id"
            element={<PostPage posts={posts} handleDelete={handleDelete} />}
          />
        </Route>

        <Route
          path="edit/:id"
          element={
            <EditPost
              posts={posts}
              handleEdit={handleEdit}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              editBody={editBody}
              setEditBody={setEditBody}
            />
          }
        />

        <Route path="about" element={<About />} />

        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  )
}
