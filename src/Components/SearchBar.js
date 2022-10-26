import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import FoodCard from './FoodCard';
import DrinkCard from './DrinkCard';

export default function SearchBar({ page }) {
  const bebidas = [];
  const history = useHistory();

  const { fetchByQuery, handleChange,
    loginInfo, foods, setFoods, drinkz, setDrinkz } = useContext(MyContext);

  const onBtnClick = async () => {
    const { radioBtn, searchInput } = loginInfo;
    const results = await fetchByQuery(radioBtn, searchInput, page);
    const doze = 12;
    if (results !== undefined && results !== null) {
      if (page === 'meals') {
        const { meals } = results;
        if (meals.length > doze) {
          const dozeReceitas = meals.slice(0, doze);
          setFoods(dozeReceitas);
        } else {
          setFoods(meals);
        }
        console.log(bebidas);
      } else if (page === 'drinks') {
        const { drinks } = results;
        if (drinks.length > doze) {
          const dozeReceitas = drinks.slice(0, doze);
          setDrinkz(dozeReceitas);
        } else {
          setDrinkz(drinks);
        }
        console.log(bebidas);
      }
    }
    if (results === null || results === undefined) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  return (
    <div>
      <label htmlFor="radioBtn">
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          value="ingredient"
          name="radioBtn"
          onChange={ handleChange }
        />
        Ingredientes
      </label>
      <label htmlFor="radioBtn">
        <input
          data-testid="name-search-radio"
          name="radioBtn"
          value="name"
          type="radio"
          onChange={ handleChange }
        />
        Nome
      </label>
      <label htmlFor="radioBtn">
        <input
          name="radioBtn"
          value="first-letter"
          data-testid="first-letter-search-radio"
          type="radio"
          onChange={ handleChange }
        />
        Primeira Letra
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ onBtnClick }
      >
        Buscar
      </button>
      <div disabled={ page === 'drinks' }>
        {
          foods && foods.length > 1 ? foods.map((recipe, index) => (
            <FoodCard
              key={ index }
              index={ index }
              name={ recipe.strMeal }
              img={ recipe.strMealThumb }
              id={ recipe.idMeal }
            />
          )) : foods && foods.length === 1 && history.push(`/meals/${foods[0].idMeal}`)
        }
      </div>
      <div>
        {
          drinkz && drinkz.length > 1 ? drinkz.map((recipe, index) => (
            <DrinkCard
              key={ index }
              index={ index }
              name={ recipe.strDrink }
              img={ recipe.strDrinkThumb }
              id={ recipe.idDrink }
            />
          )) : drinkz
          && drinkz.length === 1 && history.push(`/drinks/${drinkz[0].idDrink}`)
        }
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  page: PropTypes.string.isRequired,
};
