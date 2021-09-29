import { getArtistsBasicInfo } from "./data.js";
import { getImageUrl } from "./dj_fotos.js";
import { lazyLoad, noOpacityClass, lazyLoadAttribute, lazySrc } from './lazyLoad.js';
import './nav.js';

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
              <img src="${lazySrc}" data-src="${getImageUrl(artist.artist_name)}" ${lazyLoadAttribute} />
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

document.querySelector("#tab-bar").addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.tagName.toUpperCase() !== "A") {
    return;
  }
  document.querySelectorAll(".tab-section").forEach(s => s.style.display = "none");
  document.getElementById(e.target.dataset.sectionId).style.display = "flex";
})

window.onload = loadRenderData;
window.addEventListener('load', lazyLoad, false);
window.addEventListener('scroll', lazyLoad, false);
window.addEventListener('resize', lazyLoad, false);

