import { getArtistDetailInfo } from "./data.js";

function getArtistParam() {
  const params = new URLSearchParams(window.location.search);
  const row = params.get("artist");
  console.log(row);
  return row;
}

function renderView(data) {
  document.querySelector("figure").innerHTML = 
    `<img src="img/artists/${data.artist_name.toLowerCase()}.jpg" width="100%" />
     
    `;
  document.querySelector("#artist-links").innerHTML = `<a href="${data.url}" class="artist-url" target="blank">
      🔊 Escucha
    </a>`;
  document.querySelector("#artist-about").innerHTML = `
    <h2 class="artist-name">${data.artist_name} 
      <span class="artist-location">[ ${data.location} ]</span>
    </h2>
    <p>${data.desc}</p>
  `
}

function loadArtistInfo() {
  getArtistDetailInfo(getArtistParam()).then(renderView);
}

window.onload = loadArtistInfo;
