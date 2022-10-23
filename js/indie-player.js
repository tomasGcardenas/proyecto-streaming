const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')
const artist = document.querySelector('#artist')

const songs = ['El Tesoro', 'Mañana', 'La Música Que Está Por Nacer', 'Vámonos De Viaje', 'PUEDE SER', 'Loco en el Desierto']

const artistas = ['El mató a un policía motorizado', 'Usted Señalemelo', '1915', 'Bandalos Chinos', 'LOUTA', 'Conociendo Rusia']

let artistIndex = 0;

let songIndex = 0;

loadSong(songs[songIndex], artistas[artistIndex])

function loadSong(song, artista){
  artist.innerText = artista
  title.innerText = song
  audio.src = `../audio/${song}.mp3`
  cover.src = `../images/${song}.jpg`
}

function playSong () {
  musicContainer.classList.add('play')
  playBtn.querySelector('i.fas').classList.remove('fa-play')
  playBtn.querySelector('i.fas').classList.add('fa-pause')

  audio.play()
}

function pauseSong () {
  musicContainer.classList.remove('play')
  playBtn.querySelector('i.fas').classList.add('fa-play')
  playBtn.querySelector('i.fas').classList.remove('fa-pause')

  audio.pause()
}

function prevSong(){
  artistIndex--
  songIndex--

  if(songIndex < 0 && artistIndex < 0){
    songIndex = songs.length - 1
    artistIndex = artistas.length - 1
  }

  loadSong(songs[songIndex], artistas[artistIndex])

  playSong()
}

function nextSong(){
  artistIndex++
  songIndex++

  if(songIndex > songs.length -1 && artistIndex > artistas.length -1){
    songIndex = 0
    artistIndex = 0
  }

  loadSong(songs[songIndex], artistas[artistIndex])

  playSong()
}

function updateProgress (e) {
  const {duration, currentTime} = e.srcElement
  const progressPercent = (currentTime / duration) * 100
  progress.style.width = `${progressPercent}%`
}

function setProgress(e){
  const width = this.clientWidth
  const clickX = e.offsetX
  const duration = audio.duration

  audio.currentTime = (clickX / width) * duration
}

playBtn.addEventListener('click', () =>{
  const isPlaying = musicContainer.classList.contains('play')

  if(isPlaying){
    pauseSong()
  } else{
    playSong()
  }
})

playSong()

prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)