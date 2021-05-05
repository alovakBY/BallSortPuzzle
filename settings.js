"use strict"

const buttonSettings = document.querySelector(".settingsBtn") // Кнопка вызова меню настроек
const settings = document.querySelector(".settings") // Контейнер настроек
const settingsBack = document.querySelector(".settings--backBtn") // Кнопка "назад" в меню настроек
const opacity = document.querySelector(".opacity") // Контейнер class = "opacity"
const container = document.querySelector(".container") //Контейнер class = "container"
const music = document.querySelector("audio") // audio тег
const musicSetting = document.querySelector(".settings--music") // контейнер вкл/выкл музыки

const volumeSettings = document.querySelector(".settings--volume")  // контейнер увел/уменьш громкости
const volumeInput = document.querySelector("input[type = 'range']") 
const volumeLine = document.querySelector(".settings--volume--checkbox")
const volumePose = document.querySelector(".settings--volume--checkbox--pose") 
const positionVolumePose = volumeLine.clientWidth - volumePose.clientWidth;

music.addEventListener("loadeddata", () => {
	music.play()
})
volumePose.style.left = `${volumeInput.value*positionVolumePose/100}px`
music.volume = volumeInput.value/100
music.loop = true

buttonSettings.addEventListener("click", ()  => {
	settings.style.top = `25%`
	opacity.style.zIndex = `2`
	settings.style.zIndex = `5`
})

settingsBack.addEventListener("click", () => {
	settings.style.top = `-200%`
	settings.style.zIndex = ``
	opacity.style.zIndex = ``
})

musicSetting.addEventListener("click", () => {
	if (!musicSetting.querySelector("input").checked) {
		music.pause()
		music.currentTime = 0.0
	} else {
		music.play()
	}
})

volumePose.addEventListener("mousedown", start)

let shiftX = 0

function start(e) {
	volumePose.style.backgroundColor = `rgb(238, 183, 81)`
	// Запоминаем разницу расстояний между курсором и началом мяча
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


