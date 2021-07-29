import React from 'react'
import { useGlobalContext } from '../context'

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext();
  // we don't always need to import
  // can use uncontrolled input with useRef 
  const searchValue = React.useRef('');

  // set focus to input after render
  React.useEffect(() => {
    searchValue.current.focus()
  }, [])

  // get value from ref target input
  const searchCocktail = () => {
    setSearchTerm(searchValue.current.value)
  }

  const handleSubmit = e => e.preventDefault();

  return (
    <section className="section search">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">search your favorite cocktail</label>
          <input type="text" id="name" ref={searchValue} onChange={searchCocktail} />
        </div>
      </form>
    </section>
  )
}

export default SearchForm
