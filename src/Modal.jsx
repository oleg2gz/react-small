import {forwardRef, useState} from 'react'

export const Modal = forwardRef(() => {
  const [modalState, setModalState] = useState(false)

  if (!modalState) return null

  return (
    <div className="modal">
      <p>This is my modal!</p>

      <button>Close Modal</button>
    </div>
  )
})
