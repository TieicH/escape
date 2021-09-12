import { api_key, sheet_id } from "./config.js";

// const sid="19ttl2WeUfe8-fp05lLgl_Mk1kpBwbkVS4nTLu-hHJQE";
const rowStart = 2;
const colStart = "A";
const colEnd = "F";
const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheet_id}/values/Sheet1!`;
const start = `${colStart}${rowStart}`;
const end = `${colEnd}`;

const columnKeys = {
  "name": 0,
  "artist_name": 1,
  "desc": 2,
  "location": 3,
  "url": 4,
  "photo": 5
}

export const artistObjectFromColumns = (columns) => 
  Object.keys(columnKeys).reduce((prevValue, key) => {
    prevValue[key] = columns[columnKeys[key]];
    return prevValue;
  }, {});

export const getArtists = () => {
  return fetch(`${url}${start}:${end}?key=${api_key}`).then((resp) => {
    return resp.json();
  })
}

export const getArtistsBasicInfo = function() {
  return getArtists().then(json => {
      return json.values.map((artistValues, i) => (
        { ...artistObjectFromColumns(artistValues), row: i }
      ));
  })
}

export const getArtistDetailInfo = function(artistRow) {
  return fetch(`${url}${colStart}${artistRow}:F${artistRow}?key=${key}`).then((resp) => resp.json())
    .then(json => artistObjectFromColumns(json.values[0]));
}

