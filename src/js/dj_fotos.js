const imgRoute = "https://d1ntozumzmh538.cloudfront.net";
const extension = ".png";

export const getImageUrl = (artistName) => `${imgRoute}/${artistName.split(" ").join("_").toLowerCase()}${extension}`;


export default {
  "chaina durán dj": "chaina_duran.jpeg",
  "dezibela dj": "dezibela.jpg",
  "ketal": "ketal.jpg",
  "n3t4": "n3t4.jpeg",
  "saló": "salo.jpg",
  "yeeliv": "yeeliv.jpg"
}
