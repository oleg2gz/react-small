export const Square = ({colorValue, hexValue, isDarkText}) => {
  const style = {
    backgroundColor: colorValue,
    color: isDarkText ? '#000' : '#fff',
  }

  return (
    <section className="square" style={style}>
      <p>{colorValue ? colorValue : 'Empty Color Value'}</p>
      <p>{hexValue ? hexValue : null}</p>
    </section>
  )
}

Square.defaultProps = {
  colorValue: 'Empty Color Value',
}
