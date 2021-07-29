const playerSrc = "https://w.soundcloud.com/player/";
const soundCloudUrls = [
  'https://api.soundcloud.com/tracks/1006304761',
  'https://api.soundcloud.com/tracks/942197653',
  'https://api.soundcloud.com/tracks/1051090684'
];
const iframe = document.querySelector('iframe');

const getNextUrl = () => soundCloudUrls.splice(Math.ceil(Math.random() * soundCloudUrls.length - 1), 1);

let widget;

iframe.onload = () => {
  widget = SC.Widget(iframe);
  widget.play();
  widget.bind(SC.Widget.Events.FINISH, function() {
    const url = getNextUrl();
    if (url.length) {
      widget.load(url[0], { color: '#1d1817', inverse: 'true', autoplay: 'true' });
      widget.play();
    }
  });
};

iframe.src = `${playerSrc}?url=${encodeURI(getNextUrl())}&color=%231d1817&autoplay=true&inverse=true}`
