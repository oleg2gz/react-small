export const Search = ({searchTerm, setSearchTerm}) => {
  return (
    <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="search">Search</label>

      <input
        id="search"
        type="text"
        role="searchbox"
        placeholder="Search Item"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </form>
  )
}
