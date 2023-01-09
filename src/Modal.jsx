import {forwardRef, useState, useImperativeHandle} from 'react'

export const Modal = forwardRef((props, ref) => {
  const [modalState, setModalState] = useState(false)

  useImperativeHandle(ref, () => ({
    openModal: () => setModalState(true),
  }))

  if (!modalState) return null

  return (
    <div className="modal">
      <p>This is my modal!</p>

      <button onClick={() => setModalState(false)}>Close Modal</button>
    </div>
  )
})
