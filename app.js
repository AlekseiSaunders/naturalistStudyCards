// const cardArea = document.getElementsByClassName('card__list');
const cardArea = document.getElementById('allCards');
const cardFronts = document.getElementsByClassName('card__front');
const cardBacks = document.getElementsByClassName('card__back');
const testBtn = document.getElementById('btn');
const taxaSelect = document.getElementById('taxa-select');
const areaSelect = document.getElementById('area-select');
const numberToStudy = document.getElementById('number-select');
let species = [];
let taxa = '';
let area = '';
let numberOfCards = '';

taxaSelect.addEventListener('change', () => {
  return (taxa = `&iconic_taxa=${taxaSelect.value}`);
});
areaSelect.addEventListener('change', () => {
  return (area = `&place_id=${areaSelect.value}`);
});
numberToStudy.addEventListener('change', () => {
  numberOfCards = numberToStudy.value;
});
const urlBase =
  'https://api.inaturalist.org/v1/observations?captive=false&introduced=false&native=true&photos=true&license=cc-by-nc&photo_license=cc-by-nc&per_page=60&identifications=most_agree&quality_grade=research';
const urlEnd = '&order=desc&order_by=created_at';
testBtn.addEventListener('click', () => {
  cardArea.innerHTML = '';
  getSpecies(urlBase + area + taxa + urlEnd);
});
// const url =
//   'https://api.inaturalist.org/v1/observations?captive=false&native=true&photos=true&license=cc-by&place_id=34&iconic_taxa=Mammalia&per_page=40&order=desc&order_by=created_at';
// const url =
//   'https://api.inaturalist.org/v1/observations?captive=false&introduced=false&native=true&photos=true&license=cc-by-nc&photo_license=cc-by-nc&place_id=34&per_page=60&identifications=most_agree&quality_grade=research&iconic_taxa=Mammalia&order=desc&order_by=created_at';

const createCard = function () {
  let randomNumber = Math.floor(Math.random() * (60 - 0 + 0) + 0);
  let cardListItem = document.createElement('article');
  let card = document.createElement('div');
  let cardFront = document.createElement('div');
  let cardBack = document.createElement('div');
  let img = document.createElement('img');
  let attr = document.createElement('p');
  let imgBack = document.createElement('img');
  let speciesName = document.createElement('p');
  cardListItem.classList.add('card__list-item');
  card.classList.add('card');
  cardFront.classList.add('card__front');
  cardBack.classList.add('card__back');
  img.src = species[randomNumber].photo;
  attr.textContent = species[randomNumber].attribution;
  imgBack.src = species[randomNumber].photo;
  speciesName.textContent = species[randomNumber].name;
  cardListItem.appendChild(card);
  card.appendChild(cardFront);
  cardFront.appendChild(img);
  cardFront.appendChild(attr);
  cardBack.appendChild(imgBack);
  cardBack.appendChild(speciesName);
  card.appendChild(cardBack);
  cardArea.appendChild(cardListItem);
  // for (let piece of cardArea) {
  //   piece.appendChild(cardListItem);
  // }
};
const repeat = (func, numb) => {
  for (let i = 1; i <= numb; i++) {
    func();
  }
};
const getSpecies = async (url) => {
  // const response = await fetch(url);
  const response = await fetch(url);
  console.log(urlBase + area + taxa + urlEnd);
  if (response.ok) {
    species = [];
    const jsonResponse = await response.json();
    for (let i = 0; i < jsonResponse.results.length; i++) {
      // console.log(jsonResponse.results);
      let obj = {};
      obj.name = jsonResponse.results[i].species_guess;
      obj.photo = jsonResponse.results[i].taxon.default_photo.medium_url;
      obj.attribution = jsonResponse.results[i].taxon.default_photo.attribution;
      species.push(obj);
    }
  } else {
    console.log(err);
  }

  repeat(createCard, numberOfCards);
  // console.log(species);
  // for (const card of cardFronts) {
  //   let imgEl = document.createElement('img');
  //   let imgAttr = document.createElement('p');
  //   imgEl.src = species[2].photo;
  //   imgAttr.textContent = species[2].attribution;
  //   card.appendChild(imgEl);
  //   card.appendChild(imgAttr);
  // }
  // for (const card of cardBacks) {
  //   let imgElBack = document.createElement('img');
  //   let speciesName = document.createElement('p');
  //   imgElBack.src = species[2].photo;
  //   speciesName.textContent = species[2].name;
  //   card.appendChild(imgElBack);
  //   card.appendChild(speciesName);
  // }
};

// https://api.inaturalist.org/v1/observations?captive=false&introduced=false&native=true&photos=true&license=cc-by-nc&photo_license=cc-by-nc&place_id=34&iconic_taxa=Mammalia&identifications=most_agree&quality_grade=research&order=desc&order_by=created_at
