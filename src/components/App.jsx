import {useEffect, useState} from 'react'
import Header from './Header'
import AddItem from './AddItem'
import Search from './Search'
import Content from './Content'
import Footer from './Footer'

export const App = () => {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('groceries-list')) || []
  )
  const [newItem, setNewItem] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    localStorage.setItem('groceries-list', JSON.stringify(items))
  }, [items])

  const addItem = (item) => {
    const groceryItem = {
      id: crypto.randomUUID(),
      complete: false,
      name: item,
    }
    const updatedItems = [...items, groceryItem]
    setItems(updatedItems)
  }

  const handleComplete = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? {...item, complete: !item.complete} : item
    )
    setItems(updatedItems)
  }

  const handleDelete = (id) => {
    const updatedItems = items.filter((item) => item.id !== id)
    setItems(updatedItems)
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

      <Content
        items={items.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )}
        handleComplete={handleComplete}
        handleDelete={handleDelete}
      />

      <Footer length={items.length} />
    </div>
  )
}
