//baseUrl
const baseUrl = 'https://swapi.dev/api/';

//fetcher
const fetcher = async (url) => {
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw Error('ERROR');
      }
      return res.json();
    })
    .then((data) => renderResults(data.results))
    .catch((error) => console.log('error'));
};

//  elements from dom
const elements = {
  list: document.querySelector('#list'),
  listItem: document.querySelector('#list-item'),
  btnPeople: document.querySelector(['button[data-set-people]']),
  btnPlanets: document.querySelector(['button[data-set-planets]']),
  btnStarships: document.querySelector(['button[data-set-starships]']),
};

const selectCategory = (category) => {
  clearResults();
  fetcher(baseUrl + category);
};

elements.btnPeople.addEventListener('click', (e) => {
  selectCategory(e.target.value);
});
elements.btnPlanets.addEventListener('click', (e) =>
  selectCategory(e.target.value)
);
elements.btnStarships.addEventListener('click', (e) =>
  selectCategory(e.target.value)
);

const clearResults = () => (elements.list.innerHTML = '');

// markup to render
const renderElement = (el) => {
  const markup = `<li class="list__item" id="list-item">${el.name}</li>`;
  elements.list.insertAdjacentHTML('beforeend', markup);
};

const renderResults = (items) => {
  items.forEach(renderElement);
};
