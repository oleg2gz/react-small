import {FaTrashAlt} from 'react-icons/fa'

export const Item = ({item, handleComplete, handleDelete}) => {
  return (
    <li className="item">
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
        aria-label={`Delete ${item.name}`}
        onClick={() => handleDelete(item.id)}
      />
    </li>
  )
}
