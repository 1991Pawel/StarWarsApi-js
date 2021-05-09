//InitialState
const baseUrl = 'https://swapi.dev/api/';
let nextUrl = '';
let prevUrl = '';

//fetcher
const fetcher = async (url) => {
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw Error('ERROR');
      }
      return res.json();
    })
    .then((data) => {
      loader();
      renderResults(data.results);
      setPrevNextPage(data);
    })
    .catch((error) => console.log('error'));
};

const nextPage = () => {
  if (nextUrl !== null) {
    fetcher(nextUrl);
  }
};

const prevPage = () => {
  if (prevUrl !== null) {
    fetcher(prevUrl);
  }
};

setPrevNextPage = ({ next, previous }) => {
  nextUrl = next;
  prevUrl = previous;
  if (nextUrl == null) {
    elements.btnNext.disabled = true;
  } else {
    elements.btnNext.disabled = false;
  }
  if (prevUrl == null) {
    elements.btnPrev.disabled = true;
  } else {
    elements.btnPrev.disabled = false;
  }
};

//  elements from dom
const elements = {
  list: document.querySelector('#list'),
  btnPeople: document.querySelector(['button[data-set-people]']),
  btnPlanets: document.querySelector(['button[data-set-planets]']),
  btnStarships: document.querySelector(['button[data-set-starships]']),
  btnNext: document.querySelector(['button[data-set-next]']),
  btnPrev: document.querySelector(['button[data-set-prev]']),
};

//Spiner markup
const loader = () => {
  const markup = `<div class="loading"></div>`;
  elements.list.insertAdjacentHTML('beforeend', markup);
};

//select category
const selectCategory = (category) => {
  clearResults();
  loader();
  fetcher(baseUrl + category);
};

//addEventListners
elements.btnPeople.addEventListener('click', (e) => {
  selectCategory(e.target.value);
});
elements.btnPlanets.addEventListener('click', (e) =>
  selectCategory(e.target.value)
);
elements.btnStarships.addEventListener('click', (e) =>
  selectCategory(e.target.value)
);
elements.btnNext.addEventListener('click', (e) => nextPage());
elements.btnPrev.addEventListener('click', (e) => prevPage());

//clearResults
const clearResults = () => (elements.list.innerHTML = '');

// markup to render
const renderElement = (el) => {
  const markup = `<li class="list__item" id="list-item">${el.name}</li>`;
  elements.list.insertAdjacentHTML('beforeend', markup);
};

//render results
const renderResults = (items) => {
  clearResults();
  items.forEach(renderElement);
};

// initiState
const initialApp = () => {
  fetcher(`${baseUrl + 'people'}`);
};

initialApp();
