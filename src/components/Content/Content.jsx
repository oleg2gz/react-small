import {useState} from 'react'
import {FaTrashAlt} from 'react-icons/fa'

export const Content = () => {
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
    <main>
      {items.length ? (
        <ul>
          {items.map((item) => (
            <li className="item" key={item.id}>
              <input
                type="checkbox"
                checked={item.complete}
                onChange={() => handleComplete(item.id)}
              />
              <label
                style={item.complete ? {textDecoration: 'line-through'} : null}
                onDoubleClick={() => handleComplete(item.id)}
              >
                {item.name}
              </label>
              <FaTrashAlt
                role="button"
                tabIndex="0"
                onClick={() => handleDelete(item.id)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p style={{marginTop: '2rem'}}>Your list is empty.</p>
      )}
    </main>
  )
}
