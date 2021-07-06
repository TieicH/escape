import { getArtistDetailInfo } from "./data.js";

function getArtistParam() {
  const params = new URLSearchParams(window.location.search);
  const row = params.get("artist");
  console.log(row);
  return row;
}

function loadArtistInfo() {
  getArtistDetailInfo(getArtistParam()).then(renderArtist);
}

function renderArtist(data) {
  debugger
  document.querySelector("#detail").innerHTML = `
    <p>${data.name}</p>
    <p>${data.location}</p>
    <p>${data.url}</p>
  `
}
window.onload = loadArtistInfo;
