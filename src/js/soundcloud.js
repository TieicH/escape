const playerSrc = "https://w.soundcloud.com/player/";
const soundcloudUrls = [
  'https://api.soundcloud.com/tracks/1006304761',
  'https://api.soundcloud.com/tracks/942197653',
  'https://api.soundcloud.com/tracks/1051090684',
  'https://api.soundcloud.com/tracks/1084196947',
  'https://api.soundcloud.com/tracks/1081576846',
  'https://api.soundcloud.com/tracks/560059443',
  'https://api.soundcloud.com/tracks/1035861556',
  'https://api.soundcloud.com/tracks/967656496'
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
