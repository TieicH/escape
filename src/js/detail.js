import { getArtists, getArtistDetailInfo, artistObjectFromColumns } from "./data.js";

let artistsTotal;

function getArtistParam() {
  const params = new URLSearchParams(window.location.search);
  const row = params.get("artist");
  console.log(row);
  return row;
}

function renderView(data) {
  const figure = document.querySelector("figure");
  const linksEl = document.querySelector("#artist--links");
  const aboutEl = document.querySelector("#artist--about");
  const artistHeadingCls = "artist--name";
  const artistLocationCls = "artist--location";

  figure.innerHTML = 
    `<img src="img/artists/${data.artist_name.toLowerCase()}.jpg" width="100%" />`;
  linksEl.innerHTML = `<a href="${data.url}" class="artist-url" target="blank">
    <span style="font-size:2rem;line-height:.2">&#x223F;</span> 
    Escucha
    <span style="font-size:1.5rem;line-height:.8;float:right">&#x21e5;</span> 
    </a>`;
  aboutEl.innerHTML = `
    <h2 class="${artistHeadingCls}">${data.artist_name} 
      <span class="${artistLocationCls}">[ ${data.location} ]</span>
    </h2>
    <p>${data.desc}</p>
  `
}

function loadArtistInfo2 () {
  getArtists().then((data) => {
    const artistsArray = data.values;
    const artistData = artistObjectFromColumns(artistsArray[getArtistParam()]);
    artistsTotal = artistsArray.length - 1; // HEADER ROW
    renderView(artistData);
  })
}
// function loadArtistInfo() {
//   getArtistDetailInfo(getArtistParam()).then(renderView);
// }

function pageArtist(e) {
  e.preventDefault();

  const artistId = parseInt(getArtistParam(), 10);
  let newArtistId = (e.currentTarget.id === 'next') ? artistId + 1 : artistId - 1;
  if (newArtistId > artistsTotal) {
    newArtistId = 0;
  } else if (newArtistId < 0) {
    newArtistId = artistsTotal;
  }
  const url = new URL(window.location.href);
  url.searchParams.set("artist", newArtistId);
  window.history.pushState({ artist: newArtistId },
    'test',
    url
  );
  loadArtistInfo2();
}

document.querySelectorAll(".pager").forEach((el) => el.addEventListener('click', pageArtist));

window.onpopstate = loadArtistInfo2;
window.onload = loadArtistInfo2;
