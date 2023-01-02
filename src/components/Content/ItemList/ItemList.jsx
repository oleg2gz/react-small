import Item from './Item'

export const ItemList = ({items, handleComplete, handleDelete}) => {
  return (
    <ul>
      {items.map((item) => (
        <Item
          key={item.id}
          item={item}
          handleComplete={handleComplete}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  )
}
