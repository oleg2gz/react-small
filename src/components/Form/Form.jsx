import colorNames from 'colornames'

export const Form = ({
  colorValue,
  setColorValue,
  setHexValue,
  isDarkText,
  setIsDarkText,
}) => {
  const changeTextColor = () => setIsDarkText(!isDarkText)

  const addColorValues = (e) => {
    setColorValue(e.target.value)
    setHexValue(colorNames(e.target.value) || '')
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label>Add Color Name</label>

      <input
        type="text"
        autoFocus
        placeholder="Add color name"
        required
        value={colorValue}
        onChange={addColorValues}
      />

      <button type="button" onClick={changeTextColor}>
        Toggle color
      </button>
    </form>
  )
}
