let arrOfSpecies = [];

const getSpecies = async (url) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      arrOfSpecies = [];
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
          arrOfSpecies.push(obj);
        }
      }
      console.log(jsonResponse.results);
    }
  } catch (err) {
    console.log(err);
  }
  return arrOfSpecies;
};

export default getSpecies