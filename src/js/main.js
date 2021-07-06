
import { getArtistsBasicInfo } from "./data.js";

console.log("hello worlds");

const renderArtists = (artistsData) => {
  const artistsHtml = artistsData.map(artist => {
    return `<div class="artist-card" data-row="${artist.row}">
        <a href="detail?artist=${artist.row}">
          <div class="artist-info">
            <h3>${artist.name}</h3>
            <div>[ ${artist.location} ] </div>
          </div>
          <div class="artist-photos">
            <img src="img/artists/${artist.name}_p.jpg" />
            <img src="img/artists/${artist.name}.jpg" />
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
