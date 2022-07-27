import stopScroll from './onscroll.js';
import getSpecies from './getSpecies.js';

const cardArea = document.getElementById('allCards');
const generateBtn = document.getElementById('btn');
const currentScoreBoard = document.getElementById('currentScoreBoard');
const runningScoreBoard = document.getElementById('runningScoreBoard');
const taxaRadios = document.querySelectorAll('input[type=radio][name="taxon"]');
const areaRadios = document.querySelectorAll('input[type=radio][name="area"]');
const numberRadios = document.querySelectorAll(
  'input[type=radio][name="number"]'
);
let taxa, area, numberOfCards;
let maxCards = 0;
let currentScore = 0;

currentScoreBoard.textContent = `Current Score: ${currentScore}`;
let runningScore = JSON.parse(localStorage.getItem('runningScore'));
if (!runningScore) {
  runningScore = 0;
}
runningScoreBoard.textContent = `All Time Score: ${runningScore}`;

// Event Listeners for select field and button
// taxaSelect.addEventListener('change', () => {
//   return (taxa = `&taxon_id=${taxaSelect.value}`);
// });
taxaRadios.forEach((taxaBtn) =>
  taxaBtn.addEventListener('change', () => {
    return (taxa = `&taxon_id=${taxaBtn.value}`);
  })
);
// areaSelect.addEventListener('change', () => {
//   return (area = `&place_id=${areaSelect.value}`);
// });
areaRadios.forEach((areaBtn) =>
  areaBtn.addEventListener('change', () => {
    return (area = `&place_id=${areaBtn.value}`);
  })
);
// numberToStudy.addEventListener('change', () => {
//   numberOfCards = numberToStudy.value;
// });
numberRadios.forEach((numberBtn) =>
  numberBtn.addEventListener('change', () => {
    return (numberOfCards = numberBtn.value);
  })
);

generateBtn.addEventListener('click', async () => {
  cardArea.innerHTML = '';
  let species = await getSpecies(urlBase + area + taxa + urlEnd);
  maxCards = species.length;
  if (maxCards < numberOfCards) {
    cardArea.innerHTML = `
      <h1 style="text-align:center">
        Sorry, not enough cards to display. The page will now reload
      </h1>
    `;
    window.setTimeout(() => location.reload(), 3000);
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
    cardScorePositive.setAttribute('id', 'positiveAnswer');
    cardScoreNegative.classList.add('negativeScore');
    cardScoreNegative.setAttribute('id', 'negativeAnswer');
    attribute.classList.add('attribution');
    img.setAttribute(
      'alt',
      `${arrOfSpecies[num].name} by ${arrOfSpecies[num].attribution}`
    );
    img.src = arrOfSpecies[num].photo;
    attribute.textContent = `Photo ${arrOfSpecies[num].attribution}`;
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
      currentScore += 1;
      currentScoreBoard.textContent = `Current Score: ${currentScore}`;
      runningScore += 1;
      localStorage.setItem('runningScore', JSON.stringify(runningScore));
      runningScoreBoard.textContent = `All Time Score: ${runningScore}`;
      card.style.transform = 'none';
      card.style.transition = 'none';
      cardBack.style.transform = 'rotateY(0deg)';
      cardBack.style.backfaceVisibility = 'visible';
    });
    cardScoreNegative.addEventListener('click', () => {
      runningScoreBoard.textContent = `All Time Score: ${runningScore}`;
      card.style.transform = 'none';
      card.style.transition = 'none';
      cardBack.style.transform = 'rotateY(0deg)';
      cardBack.style.backfaceVisibility = 'visible';
    });
  }
};

// Move .site-logo up on window scroll to prevent overlap of select boxes.
stopScroll();
