
import { getArtistsBasicInfo } from "./data.js";

console.log("hello worlds");

const renderArtists = (artistsData) => {
  const artistsHtml = artistsData.map(artist => {
    return `<div class="artist-card" data-row="${artist.row}">
        <a href="detail.html?artist=${artist.row}">
          <div class="artist-info">
            <h3>${artist.artist_name}</h3>
            <div>[ ${artist.location} ] </div>
          </div>
          <div class="artist-photo">
            <img src="img/artists/${artist.artist_name.toLowerCase()}_p.jpg" />
            <img src="img/artists/${artist.artist_name.toLowerCase()}.jpg" />
          </div>
        </a>
      </div>`
  })
  document.querySelector("#artists").innerHTML = artistsHtml.join('');
}
const loadRenderData = function() {
  getArtistsBasicInfo().then(renderArtists);
};

window.onload = loadRenderData;
