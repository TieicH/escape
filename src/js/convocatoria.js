import { getArtistsBasicInfo } from "./data.js";
import { getImageUrl } from "./dj_fotos.js";
import { lazyLoad, noOpacityClass, lazyLoadAttribute } from './lazyLoad.js';

const renderArtists = (artistsData) => {
  return new Promise(resolve => {
    const artistsHtml = artistsData.map(artist => {
      return `<div class="artist-card" data-row="${artist.row}">
          <a href="detail?artist=${artist.row}">
            <div class="artist-info">
              <h3>${artist.artist_name}</h3>
              <div>[ ${artist.location} ] </div>
            </div>
            <div class="artist-photo ${noOpacityClass}">
              <img src="img/clear.gif" data-src="${getImageUrl(artist.artist_name)}" ${lazyLoadAttribute} />
            </div>
          </a>
        </div>`
    })
    document.querySelector("#artists").innerHTML = artistsHtml.join('');
    resolve();
  });
}

const loadRenderData = function() {
  getArtistsBasicInfo().then(renderArtists).then(lazyLoad);
};


window.onload = loadRenderData;
window.addEventListener('load', lazyLoad, false);
window.addEventListener('scroll', lazyLoad, false);
window.addEventListener('resize', lazyLoad, false);

document.querySelector("nav").addEventListener("click", (e) => {
  document.querySelector("nav").classList.toggle("open");
})
