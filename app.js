const testBtn = document.getElementById('btn');
testBtn.addEventListener('click', () => {
  getSpecies();
  console.log('clicked');
});

let species = [];

const url =
  'https://api.inaturalist.org/v1/observations?captive=false&native=true&photos=true&license=cc-by&place_id=34&iconic_taxa=Mammalia&per_page=20&order=desc&order_by=created_at';

const getSpecies = async () => {
  const response = await fetch(url);
  if (response.ok) {
    const jsonResponse = await response.json();
    for (let i = 0; i < jsonResponse.results.length; i++) {
      let obj = {};
      obj.name = jsonResponse.results[i].species_guess;
      obj.photo = jsonResponse.results[i].photos[0].url;
      species.push(obj);
      console.log(species);
    }
  } else {
    console.log(err);
  }
};
