import { getArtistsBasicInfo } from "./data.js";
import { getImageUrl } from "./dj_fotos.js";

const renderArtists = (artistsData) => {
  const artistsHtml = artistsData.map(artist => {
    return `<div class="artist-card" data-row="${artist.row}">
        <a href="detail?artist=${artist.row}">
          <div class="artist-info">
            <h3>${artist.artist_name}</h3>
            <div>[ ${artist.location} ] </div>
          </div>
          <div class="artist-photo">
            <img src="${getImageUrl(artist.artist_name)}" />
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

document.querySelector("nav").addEventListener("click", (e) => {
  document.querySelector("nav").classList.toggle("open");
})
