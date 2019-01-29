//export const add = (a, b) => a + b;
//export const multiply = (a, b) => a * b;
//export const ID = 23;

import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
}

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    
    elements.searchResPages.innerHTML = '';

}

export const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = []; // adding stuff to an array does not mutate the underlying variable, so we can define newTitle as a constant. The same goes for objects.
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            } 
            return acc + cur.length;
        }, 0);
        
        // return the result
        return `${newTitle.join(' ')}...`;
    }
    return title;
};

const renderRecipe = recipe => {
    const markup = `
            <li>
                <a class="results__link" href="#${recipe.recipe_id}">
                    <figure class="results__fig">
                        <img src="${recipe.image_url}" alt="${recipe.title}">
                    </figure>
                    <div class="results__data">
                        <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                        <p class="results__author">${recipe.publisher}</p>
                    </div>
                </a>
            </li>`;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

// type: 'prev' or 'next'
const createButton = (page, type) => `
                <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1: page + 1}>
                    <span>Page ${type === 'prev' ? page - 1: page + 1}</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
                    </svg>
                    
                </button>`   
;

const renderButtons = (numResults, page, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage); // round up, to the next int
    
    let button;
    if (page === 1 && pages > 1) {
        // Only button to go to next page
        button = createButton(page, 'next');
    } else if (page === pages) {
        // Only button to go to previous page
        button = createButton(page, 'prev');
    } else if (page < pages && pages > 1) {
        // Both buttons
        button = `
                ${createButton(page, 'prev')} 
                ${createButton(page, 'next')}
        `;
    }
    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};



export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    // render results of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage; // exclusive
    
    recipes.slice(start, end).forEach(renderRecipe);
    
    // render pagination buttons
    renderButtons(recipes.length, page, resPerPage);
}

export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => el.classList.remove('results__link--active'));
    document.querySelector(`.results__link[href="#${id}"]`).classList.add('results__link--active'); // !!! notice the attribute selection
};