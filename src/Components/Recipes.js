import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import DrinkCard from './DrinkCard';
import FoodCard from './FoodCard';

function Recipes({ page }) {
  const history = useHistory();

  const { foods, drinkz, isFilterOn, fetchRecipes, recipes,
    categories, fetchCategories } = useContext(MyContext);

  const MAX_DISPLAY = 12;
  const LENGTH = 5;

  useEffect(() => {
    async function fetchMyAPI() {
      await fetchRecipes(page);
    }
    fetchMyAPI();
  }, [page]);

  const displayCards = (array, type) => {
    if (type === 'meals') {
      return array.map((recipe, index) => (
        <FoodCard
          key={ index }
          index={ index }
          name={ recipe.strMeal }
          img={ recipe.strMealThumb }
          id={ recipe.idMeal }
        />
      ));
    }
    if (type === 'drinks') {
      return array.map((recipe, index) => (
        <DrinkCard
          key={ index }
          index={ index }
          name={ recipe.strDrink }
          img={ recipe.strDrinkThumb }
          id={ recipe.idDrink }
        />
      ));
    }
  };

  useEffect(() => {
    async function fetchMyAPI() {
      await fetchCategories(page);
    }
    fetchMyAPI();
  }, [page]);
  // console.log(categories);

  return (
    <div>
      <div>
        {
          categories[page] && categories[page].slice(0, LENGTH).map((category, index) => (
            <label htmlFor="categories" key={ index }>
              <input
                data-testid={ `${category.strCategory}-category-filter` }
                type="radio"
                id={ `${category}${index}` }
                name="category"
                value={ category.strCategory }
              />
              {category.strCategory}
            </label>
          ))
        }
      </div>
      {isFilterOn ? (
        <div>
          <div disabled={ page === 'drinks' }>
            {foods && foods.length > 1
              ? displayCards(foods, 'meals')
              : foods
                && foods.length === 1
                && history.push(`/meals/${foods[0].idMeal}`)}
          </div>
          <div>
            {drinkz && drinkz.length > 1
              ? displayCards(drinkz, 'drinks')
              : drinkz
                && drinkz.length === 1
                && history.push(`/drinks/${drinkz[0].idDrink}`)}
          </div>
        </div>
      ) : (
        <div>
          <div>
            {recipes.meals && displayCards(recipes.meals.slice(0, MAX_DISPLAY), 'meals')}
          </div>
          <div>
            {recipes.drinks
              && displayCards(recipes.drinks.slice(0, MAX_DISPLAY), 'drinks')}
          </div>
        </div>
      )}
    </div>
  );
}

Recipes.propTypes = {
  pages: PropTypes.string,
}.isRequired;

export default Recipes;
