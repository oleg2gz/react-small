import {useState, useEffect} from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom'
import {format} from 'date-fns'

import {Layout} from './Layout'
import {Home} from './Home'
import {NewPost} from './NewPost'
import {PostPage} from './PostPage'
import {About} from './About'
import {Missing} from './Missing'

export const App = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'My First Post',
      datetime: 'July 01, 2021 11:17:36 AM',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!',
    },
    {
      id: 2,
      title: 'My 2nd Post',
      datetime: 'July 01, 2021 11:17:36 AM',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!',
    },
    {
      id: 3,
      title: 'My 3rd Post',
      datetime: 'July 01, 2021 11:17:36 AM',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!',
    },
    {
      id: 4,
      title: 'My Fourth Post',
      datetime: 'July 01, 2021 11:17:36 AM',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!',
    },
  ])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    setSearchResult(filteredResults.reverse())
  }, [posts, searchTerm])

  const handleSubmit = (e) => {
    e.preventDefault()

    const newPost = {
      id: crypto.randomUUID(),
      datetime: format(new Date(), 'MMMM dd, yyyy pp'),
      title: postTitle,
      body: postBody,
    }
    const allPosts = [...posts, newPost]

    setPosts(allPosts)
    setPostTitle('')
    setPostBody('')
    navigate('/')
  }

  const handleDelete = (id) => {
    const postsList = posts.filter((post) => post.id !== id)
    setPosts(postsList)
    navigate('/')
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        }
      >
        <Route index element={<Home posts={searchResult} />} />

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

        <Route path="about" element={<About />} />

        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  )
}
