const key = "AIzaSyAJ-S12P0yrxM_jOYAH74HIMiST5JTbsMQ"
const sid="19ttl2WeUfe8-fp05lLgl_Mk1kpBwbkVS4nTLu-hHJQE";
const rowStart = 2;
const colStart = "A";
const url = `https://sheets.googleapis.com/v4/spreadsheets/${sid}/values/Sheet1!`;
const start = `${colStart}${rowStart}`;
const end = "F4";

const columnKeys = {
  "name": 0,
  "artist_name": 1,
  "desc": 2,
  "location": 3,
  "url": 4,
  "photo": 5
}

const artistObjectFromColumns = (columns) => 
  Object.keys(columnKeys).reduce((prevValue, key) => {
    prevValue[key] = columns[columnKeys[key]];
    return prevValue;
  }, {});

export const getArtistsBasicInfo = function() {
  return fetch(`${url}${start}:${end}?key=${key}`).then((resp) => {
      return resp.json();
    })
    .then(json => {
      return json.values.map((artistValues, i) => (
        { ...artistObjectFromColumns(artistValues), row: rowStart + i }
      ));
  })
}

export const getArtistDetailInfo = function(artistRow) {
  return fetch(`${url}${colStart}${artistRow}:F${artistRow}?key=${key}`).then((resp) => resp.json())
    .then(json => artistObjectFromColumns(json.values[0]));
}

