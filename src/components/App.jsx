import {useState, useEffect} from 'react'
import {apiRequest} from './apiRequest'
import Header from './Header'
import AddItem from './AddItem'
import Search from './Search'
import Content from './Content'
import Footer from './Footer'

export const App = () => {
  const API_URL = 'http://localhost:3500/items'

  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [fetchError, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL)

        if (!response.ok) throw Error('Did not receive expected data')

        const listItems = await response.json()
        setItems(listItems)
        setFetchError(null)
      } catch (err) {
        setFetchError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    // simulating network delay
    setTimeout(() => {
      fetchItems()
    }, 2000)
  }, [])

  const addItem = async (item) => {
    const groceryItem = {
      id: crypto.randomUUID(),
      complete: false,
      name: item,
    }
    const updatedItems = [...items, groceryItem]
    setItems(updatedItems)

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(groceryItem),
    }
    const result = await apiRequest(API_URL, postOptions)
    if (result) setFetchError(result)
  }

  const handleComplete = async (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? {...item, complete: !item.complete} : item
    )
    setItems(updatedItems)

    const checkedItem = updatedItems.find((item) => item.id === id)
    const patchOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({complete: checkedItem.complete}),
    }
    const result = await apiRequest(`${API_URL}/${id}`, patchOptions)
    if (result) setFetchError(result)
  }

  const handleDelete = async (id) => {
    const updatedItems = items.filter((item) => item.id !== id)
    setItems(updatedItems)

    const deleteOptions = {
      method: 'DELETE',
    }
    const result = await apiRequest(`${API_URL}/${id}`, deleteOptions)
    if (result) setFetchError(result)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newItem) return
    addItem(newItem)
    setNewItem('')
  }

  return (
    <div className="App">
      <Header title="Grocery List" />

      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />

      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <main>
        {isLoading && <p>Loading Items...</p>}
        {fetchError && <p style={{color: 'red'}}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && (
          <Content
            items={items.filter((item) =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase())
            )}
            handleComplete={handleComplete}
            handleDelete={handleDelete}
          />
        )}
      </main>

      <Footer length={items.length} />
    </div>
  )
}
