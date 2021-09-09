import { getArtists, artistObjectFromColumns } from "./data.js";
import { getImageUrl } from "./dj_fotos.js";
import { lazyLoad,
  noOpacityClass,
  lazyLoadAttribute,
  lazySrc } from './lazyLoad.js';
import './nav.js';

let artistsTotal;
let artistsData = [];

const imgRoute = "https://d1ntozumzmh538.cloudfront.net";

function getArtistParam() {
  const params = new URLSearchParams(window.location.search);
  const row = params.get("artist") || 0;
  return row;
}

function renderView(data) {
  const figure = document.querySelector("figure");
  const linksEl = document.querySelector("#artist--links");
  const aboutEl = document.querySelector("#description");
  const artistHeadingCls = "artist--name";
  const artistLocationCls = "artist--location";

  figure.innerHTML = 
    `<div class="${noOpacityClass} animate-opacity">
      <img src="${lazySrc}"
        ${lazyLoadAttribute}
        data-src="${getImageUrl(data.artist_name)}"
        width="100%" />
      </div>`;
  linksEl.innerHTML = `<a href="${data.url}" class="artist-url" target="blank">
    <span style="font-size:2rem;line-height:.2">&#x223F;</span> 
    Escucha &nbsp;
    <span style="font-size:1.5rem;line-height:.8;float:right">&#x2750;</span> 
    </a>`;
  //const div = document.createElement("div");
  aboutEl.innerHTML = `
    <h2 class="${artistHeadingCls}">${data.artist_name} 
      <span class="${artistLocationCls}">[ ${data.location} ]</span>
    </h2>
    <p>${data.desc}</p>
  `
  lazyLoad(null, 'opacity--1');
}

function loadArtistInfo(artistId) {
  if (artistsData.length) {
    const artist = artistObjectFromColumns(artistsData[artistId]);
    renderView(artist);
    return;
  }

  getArtists().then((data) => {
    artistsData = data.values;
    artistsTotal = artistsData.length - 1; // account for HEADER ROW with - 1
    const artist = artistObjectFromColumns(artistsData[artistId]);
    renderView(artist);
  })
}

function pageArtist(e) {
  e.preventDefault();

  const artistId = parseInt(getArtistParam(), 10);
  let newArtistId = (e.currentTarget.dataset.pager === 'next') ? artistId + 1 : artistId - 1;
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
  const artist = artistObjectFromColumns(artistsData[newArtistId]);
  renderView(artist);
  // loadArtistInfo();
}

document.querySelectorAll(".pager").forEach((el) => el.addEventListener('click', pageArtist));

window.onpopstate = () => loadArtistInfo(getArtistParam());
window.onload = () => {
  loadArtistInfo(getArtistParam());
  // const player = document.querySelector('iframe');
  // const screenW = window.screen.width;
  // const buttonW = document.querySelector('#ffwd').offsetWidth;
  // const logoWidth = player.querySelector(".logo").clientWidth;
  // if (screenW < player.offsetWidth) {
  //   player.width = (screenW - buttonW) - 2 // border // + logoWidth/2;
  // }
}

