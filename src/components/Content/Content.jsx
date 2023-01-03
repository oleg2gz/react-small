import ItemList from '../ItemList'

export const Content = ({items, handleComplete, handleDelete}) => {
  return (
    <main>
      {items.length ? (
        <ItemList
          items={items}
          handleComplete={handleComplete}
          handleDelete={handleDelete}
        />
      ) : (
        <p style={{marginTop: '2rem'}}>Your list is empty.</p>
      )}
    </main>
  )
}
