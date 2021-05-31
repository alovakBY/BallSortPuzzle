/* "use strict"

const buttonSettings = document.querySelector(".settingsBtn") // Кнопка вызова меню настроек
const settings = document.querySelector(".settings") // Контейнер настроек
const settingsBack = document.querySelector(".settings--backBtn") // Кнопка "назад" в меню настроек
const opacity = document.querySelector(".opacity") // Контейнер class = "opacity"
const container = document.querySelector(".container") //Контейнер class = "container"
const music = new Audio// audio тег
const musicSetting = document.querySelector(".settings--music") // контейнер вкл/выкл музыки
const volumeSettings = document.querySelector(".settings--volume")  // контейнер увел/уменьш громкости
const volumeInput = document.querySelector("input[type = 'range']") // input громкости
const volumeLine = document.querySelector(".settings--volume--checkbox") // Линия по которой ходит ползунок громкости
const volumePose = document.querySelector(".settings--volume--checkbox--pose") // Ползунок громкости
const musicTrackList = ["sound/soundTrack/bensound-memories.mp3", "sound/soundTrack/bensound-ukulele.mp3","sound/soundTrack/bensound-cute.mp3"] // трек-лист


// Функция, которая будет менять src по окончанию трека. 
function nextTrack(ind) {
	music.src = `${musicTrackList[ind]}`
	music.addEventListener("canplaythrough", () => {
		if (!musicSetting.querySelector("input").checked) return
		music.play()
	})
	music.addEventListener("ended", () => {
		if (ind === musicTrackList.length-1) nextTrack(0)
		else nextTrack(ind+1)
	})
}



function openSettings () {
	settings.style.top = `25vh`
	opacity.style.zIndex = `2`
	settings.style.zIndex = `5`
}

buttonSettings.addEventListener("click", openSettings)

settingsBack.addEventListener("click", () => {
	settings.style.top = `-100vh`
	settings.style.zIndex = ``
	opacity.style.zIndex = ``
}) 

// Вкл./Выкл. музыки
musicSetting.addEventListener("click", () => {
	if (!musicSetting.querySelector("input").checked) {
		music.pause()
	} else {
		nextTrack(Math.floor(Math.random()*musicTrackList.length)) // Играет случайный трек из массива musicTrackList
	}
})

// Настройка ползунка громкости
let shiftX = 0
const positionVolumePose = volumeLine.clientWidth - volumePose.clientWidth // расстояние по еоторому может ходить ползунок
volumePose.style.left = `${volumeInput.value*positionVolumePose/100}px` // Ставим ползунок в положение, в котором стоит при загрузке input type = range
music.volume = volumeInput.value/100 // Ставим громкость === значению input

function start(e) {
	volumePose.style.backgroundColor = `rgb(238, 183, 81)`

	shiftX = e.pageX - e.target.getBoundingClientRect().x
	e.target.ondragstart = function() {
		return false
	}
	document.addEventListener("mousemove", move)
	document.addEventListener("mouseup", end)
}

function move(e) {
	volumeInput.value = parseInt(volumePose.style.left) / positionVolumePose*100
	music.volume = volumeInput.value/100
	volumePose.style.left = `${e.pageX - volumeLine.getBoundingClientRect().x - shiftX}px`
	if (volumePose.getBoundingClientRect().left - volumeLine.getBoundingClientRect().left <= 0) volumePose.style.left = `0px`
	if (volumePose.getBoundingClientRect().right - volumeLine.getBoundingClientRect().right >= 0) volumePose.style.left = `${positionVolumePose}px`
}

function end() {
	volumePose.style.backgroundColor = `rgb(238, 235, 81)`
	volumePose.removeEventListener("mousedown", start)
	document.removeEventListener("mousemove", move)
	volumePose.addEventListener("mousedown", start)
}

volumePose.addEventListener("mousedown", start)


 */