import {createContext, useContext, useState, useEffect} from 'react'
import {useAxiosFetch} from '../hooks/useAxiosFetch'

const DataContext = createContext({})
export const useDataContext = () => useContext(DataContext)

export const DataProvider = ({children}) => {
  const [posts, setPosts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResult, setSearchResult] = useState([])

  const {data, fetchError, isLoading} = useAxiosFetch(
    'http://localhost:3500/posts'
  )

  useEffect(() => {
    setPosts(data)
  }, [data])

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.body.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSearchResult(filteredResults.reverse())
  }, [posts, searchTerm])

  return (
    <DataContext.Provider
      value={{
        posts,
        setPosts,
        searchTerm,
        setSearchTerm,
        searchResult,
        fetchError,
        isLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
