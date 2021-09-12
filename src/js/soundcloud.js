const playerSrc = "https://w.soundcloud.com/player/";
const soundcloudUrls = [
  'https://api.soundcloud.com/tracks/810748321',
  'https://api.soundcloud.com/tracks/1092123496',
  'https://api.soundcloud.com/tracks/967656496',
  'https://api.soundcloud.com/tracks/496431462',
  'https://api.soundcloud.com/tracks/1084196947',
  'https://api.soundcloud.com/tracks/1035861556',
  'https://api.soundcloud.com/tracks/694888360',
  'https://api.soundcloud.com/tracks/686247400',
  'https://api.soundcloud.com/tracks/1081576846',
  'https://api.soundcloud.com/tracks/942197653',
  'https://api.soundcloud.com/tracks/879921970',
  'https://api.soundcloud.com/tracks/699718735',
  'https://api.soundcloud.com/tracks/560059443',
  'https://api.soundcloud.com/tracks/982542298',
  'https://api.soundcloud.com/tracks/985447498',
  'https://api.soundcloud.com/tracks/699861658',
  'https://api.soundcloud.com/tracks/1102889116'
];
const iframe = document.querySelector('iframe');

const getRandomIndex = () => Math.ceil(Math.random() * soundcloudUrls.length - 1);

const getNextIndex = () => (currentIndex >= soundcloudUrls.length) ? 0 : currentIndex+1;

const getUrlAtIndex = (index) => {
  currentIndex = index;
  return soundcloudUrls[currentIndex];
}

let widget, currentIndex;

const loadSong = (url) => {
  widget.load(url, { color: '#1d1817', inverse: 'true', autoplay: 'true' });
  widget.play();
}

const loadNextSong = () => {
  const url = nextSong();
  if (url) {
    loadSong(url);
  } else {
    document.querySelector(iframe).remove();
  }
}
const nextSong = () => getUrlAtIndex(getNextIndex());

iframe.onload = () => {
  widget = SC.Widget(iframe);
  widget.play();
  widget.bind(SC.Widget.Events.FINISH, loadNextSong);
};

iframe.src = `${playerSrc}?url=${encodeURI(getUrlAtIndex(getRandomIndex()))}&color=%231d1817&autoplay=true&inverse=true}`

document.querySelector('#ffwd').addEventListener("click", (e) => {
  e.preventDefault();
  loadNextSong();
  // widget.bind(SC.Widget.Events.READY, () => {
  //   widget.play();
  //   widget.unbind(SC.Widget.Events.READY);
  // });
});
