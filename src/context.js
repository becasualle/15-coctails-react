import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('a');
  const [cocktails, setCocktails] = useState([]);


  const fetchDrinks = useCallback(async () => {
    // because we will use this func every time we type something to the input we have to show loading
    setLoading(true);
    try {
      const response = await fetch(`${url}${searchTerm}`);
      const data = await response.json();
      const { drinks } = data;

      if (drinks) {
        // we need to destructure and rename response properties of API
        const newCocktails = drinks.map(item => {
          const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } = item;
          return { id: idDrink, name: strDrink, image: strDrinkThumb, info: strAlcoholic, glass: strGlass }
        })
        setCocktails(newCocktails);
      } else {
        // if there is no cocktails - clear array
        setCocktails([]);
      }
      // once we get something back change loading status
      setLoading(false)

    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }, [searchTerm]);

  useEffect(() => { fetchDrinks() }, [searchTerm, fetchDrinks])

  return <AppContext.Provider value={{ loading, cocktails, setSearchTerm }}>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
