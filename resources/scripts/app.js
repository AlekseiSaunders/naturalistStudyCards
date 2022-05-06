import stopScroll from './onscroll.js';

const cardArea = document.getElementById('allCards');
const cardFronts = document.getElementsByClassName('card__front');
const cardBacks = document.getElementsByClassName('card__back');
const generateBtn = document.getElementById('btn');
const taxaSelect = document.getElementById('taxa-select');
const areaSelect = document.getElementById('area-select');
const numberToStudy = document.getElementById('number-select');
let species = [];
let taxa = '';
let area = '';
let numberOfCards = '';
let maxCards = 0;
let prevScrollPosition = window.scrollY;

// Event Listeners for select field and button
taxaSelect.addEventListener('change', () => {
  return (taxa = `&iconic_taxa=${taxaSelect.value}`);
});
areaSelect.addEventListener('change', () => {
  console.log(areaSelect.value);
  return (area = `&place_id=${areaSelect.value}`);
});
numberToStudy.addEventListener('change', () => {
  numberOfCards = numberToStudy.value;
});
generateBtn.addEventListener('click', () => {
  cardArea.innerHTML = '';
  getSpecies(urlBase + area + taxa + urlEnd);
});

// base url for iNaturalist API call, setting some base parameters on photo usage and wild status
const urlBase =
  'https://api.inaturalist.org/v1/observations?captive=false&introduced=false&native=true&photos=true&license=cc-by-nc&photo_license=cc-by-nc&per_page=600&identifications=most_agree';

// tailing url query to set order of response
const urlEnd = '&order=desc&order_by=created_at';

// Move .site-logo up on window scroll to prevent overlap of select boxes.
window.onscroll = function () {
  let currentScrollPosition = window.scrollY;
  if (
    prevScrollPosition > currentScrollPosition &&
    currentScrollPosition < 120
  ) {
    document.getElementById('siteNav').style.top = '0';
  } else {
    document.getElementById('siteNav').style.top = '-145px';
  }
  prevScrollPosition = currentScrollPosition;
};

const createCard = function () {
  let numbers = [];
  while (numbers.length < numberOfCards) {
    let randomNumber = Math.floor(Math.random() * maxCards);
    if (numbers.indexOf(randomNumber) === -1) {
      numbers.push(randomNumber);
    }
  }
  for (let num of numbers) {
    let cardListItem = document.createElement('article');
    let card = document.createElement('div');
    let cardFront = document.createElement('div');
    let cardBack = document.createElement('div');
    let img = document.createElement('img');
    let attribute = document.createElement('p');
    let imgBack = document.createElement('img');
    let speciesName = document.createElement('p');
    let scientificName = document.createElement('p');
    let wikipediaLink = document.createElement('a');
    cardListItem.classList.add('card__list-item');
    card.classList.add('card');
    cardFront.classList.add('card__front');
    cardBack.classList.add('card__back');
    img.src = species[num].photo;
    attribute.textContent = species[num].attribution;
    imgBack.src = species[num].photo;
    speciesName.textContent = species[num].name;
    scientificName.innerText = species[num].sciName;
    wikipediaLink.innerText = 'Click this link to learn more at Wikipedia';
    wikipediaLink.href = species[num].wikiLink;
    wikipediaLink.target = '_blank';
    cardListItem.appendChild(card);
    card.appendChild(cardFront);
    cardFront.appendChild(img);
    cardFront.appendChild(attribute);
    cardBack.appendChild(imgBack);
    cardBack.appendChild(speciesName);
    cardBack.appendChild(scientificName);
    cardBack.appendChild(wikipediaLink);
    card.appendChild(cardBack);
    cardArea.appendChild(cardListItem);
    // for (let piece of cardArea) {
    //   piece.appendChild(cardListItem);
    // }
  }
};
const repeat = (func, numb) => {
  for (let i = 1; i <= numb; i++) {
    func();
  }
};
const getSpecies = async (url) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      species = [];
      const jsonResponse = await response.json();
      let photoList = [];
      for (let i = 0; i < jsonResponse.results.length; i++) {
        let obj = {};
        // avoid adding the same image multiple times to cards created
        if (
          photoList.indexOf(
            jsonResponse.results[i].taxon.default_photo.medium_url
          ) === -1
        ) {
          photoList.push(
            jsonResponse.results[i].taxon.default_photo.medium_url
          );
          obj.name = jsonResponse.results[i].taxon.preferred_common_name;
          obj.photo = jsonResponse.results[i].taxon.default_photo.medium_url;
          obj.attribution =
            jsonResponse.results[i].taxon.default_photo.attribution;
          obj.sciName = jsonResponse.results[i].taxon.name;
          obj.wikiLink = jsonResponse.results[i].taxon.wikipedia_url;
          species.push(obj);
        }
      }
      console.log(jsonResponse.results);
    }
  } catch (err) {
    console.log(err);
  }
  maxCards = species.length; // checks to see if there are enough species in the database to populate the desired card number
  if (maxCards < numberOfCards) {
    alert('sorry, there are not enough records to be found');
  } else {
    createCard();
  }

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

stopScroll();
// https://api.inaturalist.org/v1/observations?captive=false&introduced=false&native=true&photos=true&license=cc-by-nc&photo_license=cc-by-nc&place_id=34&iconic_taxa=Mammalia&identifications=most_agree&quality_grade=research&order=desc&order_by=created_at

// const url =
//   'https://api.inaturalist.org/v1/observations?captive=false&native=true&photos=true&license=cc-by&place_id=34&iconic_taxa=Mammalia&per_page=40&order=desc&order_by=created_at';
// const url =
//   'https://api.inaturalist.org/v1/observations?captive=false&introduced=false&native=true&photos=true&license=cc-by-nc&photo_license=cc-by-nc&place_id=34&per_page=60&identifications=most_agree&quality_grade=research&iconic_taxa=Mammalia&order=desc&order_by=created_at';