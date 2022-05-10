import stopScroll from './onscroll.js';
import getSpecies from './getSpecies.js';

const cardArea = document.getElementById('allCards');
const cardFronts = document.getElementsByClassName('card__front');
const cardBacks = document.getElementsByClassName('card__back');
const generateBtn = document.getElementById('btn');
const taxaSelect = document.getElementById('taxa-select');
const areaSelect = document.getElementById('area-select');
const numberToStudy = document.getElementById('number-select');

let taxa = '';
let area = '';
let numberOfCards = '';
let maxCards = 0;

// Event Listeners for select field and button
taxaSelect.addEventListener('change', () => {
  return (taxa = `&iconic_taxa=${taxaSelect.value}`);
});
areaSelect.addEventListener('change', () => {
  return (area = `&place_id=${areaSelect.value}`);
});
numberToStudy.addEventListener('change', () => {
  numberOfCards = numberToStudy.value;
});
generateBtn.addEventListener('click', async () => {
  cardArea.innerHTML = '';
  let species = await getSpecies(urlBase + area + taxa + urlEnd);
  maxCards = species.length;
  if (maxCards < numberOfCards) {
    alert('Sorry, not enough cards to study. The page will reset.');
    location.reload();
  } else {
    createCard(species);
  }
});

// base url for iNaturalist API call, setting some base parameters on photo usage and wild status
const urlBase =
  'https://api.inaturalist.org/v1/observations?captive=false&introduced=false&native=true&photos=true&license=cc-by-nc&photo_license=cc-by-nc&per_page=200&identifications=most_agree';

// tailing url query to set order of response
const urlEnd = '&order=desc&order_by=created_at';

const createCard = function (arrOfSpecies) {
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
    let cardTextFront = document.createElement('div');
    let cardTextBack = document.createElement('div');
    let cardScoreBack = document.createElement('div');
    let cardScorePositive = document.createElement('div');
    let cardScoreNegative = document.createElement('div');
    let attribute = document.createElement('p');
    let imgBack = document.createElement('img');
    let speciesName = document.createElement('h3');
    let scientificName = document.createElement('h4');
    let wikipediaLink = document.createElement('a');
    cardListItem.classList.add('card__list-item');
    card.classList.add('card');
    cardFront.classList.add('card__front');
    cardBack.classList.add('card__back');
    cardTextFront.classList.add('cardText');
    cardTextBack.classList.add('cardText');
    cardScoreBack.classList.add('cardScore');
    cardScorePositive.classList.add('positiveScore');
    cardScoreNegative.classList.add('negativeScore');
    attribute.classList.add('attribution');
    img.setAttribute(
      'alt',
      `${arrOfSpecies[num].name} by ${arrOfSpecies[num].attribution}`
    );
    img.src = arrOfSpecies[num].photo;
    attribute.textContent = arrOfSpecies[num].attribution;
    imgBack.src = arrOfSpecies[num].photo;
    speciesName.textContent = arrOfSpecies[num].name;
    scientificName.innerText = arrOfSpecies[num].sciName;
    wikipediaLink.innerText = 'Click this link to learn more at Wikipedia';
    cardScorePositive.innerText = '✔️';
    cardScoreNegative.innerText = '❌';
    wikipediaLink.href = arrOfSpecies[num].wikiLink;
    wikipediaLink.target = '_blank';
    cardListItem.appendChild(card);
    card.appendChild(cardFront);
    cardFront.appendChild(img);
    cardTextFront.appendChild(attribute);
    cardFront.appendChild(cardTextFront);
    cardBack.appendChild(imgBack);
    cardBack.appendChild(cardTextBack);
    cardBack.appendChild(cardScoreBack);
    cardScoreBack.appendChild(cardScorePositive);
    cardScoreBack.appendChild(cardScoreNegative);
    cardTextBack.appendChild(speciesName);
    cardTextBack.appendChild(scientificName);
    cardTextBack.appendChild(wikipediaLink);
    card.appendChild(cardBack);
    cardArea.appendChild(cardListItem);
    cardScorePositive.addEventListener('click', () => {
      card.style.transform = 'none';
      card.style.transition = 'none';
      cardBack.style.transform = 'rotateY(0deg)';
      cardBack.style.backfaceVisibility = 'visible';
    });
    cardScoreNegative.addEventListener('click', () => {
      card.style.transform = 'none';
      card.style.transition = 'none';
      cardBack.style.transform = 'rotateY(0deg)';
      cardBack.style.backfaceVisibility = 'visible';
    });
  }
};

// Move .site-logo up on window scroll to prevent overlap of select boxes.
stopScroll();
