import {useState} from 'react'
import Header from './Header'
import Content from './Content'
import Footer from './Footer'

export const App = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      complete: false,
      name: 'One half pound bag of Cocoa Covered Almonds Unsalted',
    },
    {
      id: 2,
      complete: false,
      name: 'Item 2',
    },
    {
      id: 3,
      complete: false,
      name: 'Item 3',
    },
  ])

  const updateAndSave = (items) => {
    setItems(items)
    localStorage.setItem('groceries-list', JSON.stringify(items))
  }

  const handleComplete = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? {...item, complete: !item.complete} : item
    )
    updateAndSave(updatedItems)
  }

  const handleDelete = (id) => {
    const updatedItems = items.filter((item) => item.id !== id)
    updateAndSave(updatedItems)
  }

  return (
    <div className="App">
      <Header title="Grocery List" />

      <Content
        items={items}
        handleComplete={handleComplete}
        handleDelete={handleDelete}
      />

      <Footer length={items.length} />
    </div>
  )
}
