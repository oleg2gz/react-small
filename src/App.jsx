import {useRef} from 'react'
import {Modal} from './Modal'

export const App = () => {
  const modalRef = useRef()

  const handleOpenModal = () => {
    modalRef.current.openModal()
  }

  return (
    <main className="App">
      <p>Parent Component</p>

      <Modal ref={modalRef} />

      <button onClick={handleOpenModal}>Open Modal</button>
    </main>
  )
}
