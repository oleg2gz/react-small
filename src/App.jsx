import {useRef} from 'react'
import {Modal} from './Modal'

export const App = () => {
  const modalRef = useRef()

  return (
    <main className="App">
      <p>Parent Component</p>

      <Modal ref={modalRef} />

      <button>Open Modal</button>
    </main>
  )
}
