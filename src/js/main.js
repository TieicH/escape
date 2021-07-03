
console.log("hello worlds");

const key = "AIzaSyAJ-S12P0yrxM_jOYAH74HIMiST5JTbsMQ"
const sid="19ttl2WeUfe8-fp05lLgl_Mk1kpBwbkVS4nTLu-hHJQE";
const url = `https://sheets.googleapis.com/v4/spreadsheets/${sid}/values/Sheet1!A2:F4`;

const keys = {
  "name": 0,
  "artist_name": 1,
  "desc": 2,
  "location": 3,
  "url": 4
}

const getArtistsInfo = function() {
  return fetch(`${url}?key=${key}`).then((resp) => resp.json())
    .then(json => json.values.map((artistValues, i) => ({
      name: artistValues[keys.artist_name],
      location: artistValues[keys.location],
      row: i
    })));
}

const renderArtists = (artistsData) => {
  const artistsHtml = artistsData.map(artist => {
    return ` <div class="artist-card" style="background-image: url('img/artists/${artist.name}.jpg');">
        <div class="artist-info">
          <h3>${artist.name}</h3>
          ${artist.location}
        </div>
      </div>`
  })
  document.querySelector("#artists").innerHTML = artistsHtml.join('');
}
const loadRenderData = function() {
  getArtistsInfo().then(renderArtists);
};

window.onload = loadRenderData;
