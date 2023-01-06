import {useState} from 'react'
import {useFetch} from '../hooks/useFetch'
import {Form} from './Form'
import {Table} from './Table'

export const App = () => {
  const API_URL = 'https://jsonplaceholder.typicode.com/'
  const [reqType, setReqType] = useState('users')
  const {data: items} = useFetch(`${API_URL}${reqType}`)

  return (
    <div className="App">
      <Form reqType={reqType} setReqType={setReqType} />

      <Table items={items} />
    </div>
  )
}
