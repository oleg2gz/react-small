import {useState, useEffect} from 'react'
import {Form} from './Form'
import {List} from './List'

export const App = () => {
  const API_URL = 'https://jsonplaceholder.typicode.com/'
  const [reqType, setReqType] = useState('users')
  const [items, setItems] = useState([])

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${API_URL}${reqType}`)

        if (!response.ok) throw Error('Something went wrong!')

        const data = await response.json()
        setItems(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchItems()
  }, [reqType])

  return (
    <div className="App">
      <Form reqType={reqType} setReqType={setReqType} />

      <List items={items} />
    </div>
  )
}
