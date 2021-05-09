"use strict"
const buttonStartGame = document.querySelector(".startBtn") // Старт игры
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





//
// Код для страницы игры
//
const windowGame = document.querySelector(".startGame")
const windowMainMenu = document.querySelector(".main")
const windowGameToMenu = document.querySelector(".startGame-navigation-mainMenu")
const windowGameSettings = document.querySelector(".startGame-navigation-settings")

buttonStartGame.addEventListener("click", () => {
	windowGame.style.left = `0%`
	windowMainMenu.style.left = `-100%`
}) 

windowGameToMenu.addEventListener("click", () => {
	windowGame.style.left = `100%`
	windowMainMenu.style.left = `0%`
})

windowGameSettings.addEventListener("click", openSettings)




const bottles = document.querySelector(".startGame-game-bottles");
const amountBottle = 8
const amountColors = (amountBottle - 2);
const randomColor = [];
// создаем пробирок сколько нужно
for (let i = 0; i < amountBottle; i++) {
	const bottle = document.createElement("div")
	bottle.classList.add("bottle")
	bottles.appendChild(bottle)
} 

const bottle = document.querySelectorAll(".bottle");
const colors = [
{
	color: "cornflowerblue",
	number: 0,
},
{
	color: "crimson",
	number: 0,
},
{
	color: "darkgreen",
	number: 0,
},
{
	color: "goldenrod",
	number: 0,
},
{
	color: "aquamarine",
	number: 0,
},
{
	color: "blueviolet",
	number: 0,
}
]
// Берем из массива COLORS сколько нужно для раунда цветов 
for (let i = 0; i < amountColors; i++) {
	let index = Math.floor(Math.random() * (colors.length))
	if (randomColor.includes(colors[index])) {
		i--
		continue
	}
	randomColor.push(colors[index])
}

// Распределяем цвета по пробиркам
for (let i = 0; i < amountColors; i++) {
	for (let j = 0; j < 4; j++) {
		const liquid = document.createElement("div");
		liquid.classList.add("liquid")
		bottle[i].appendChild(liquid)
		liquid.style.bottom = `${j * liquid.offsetHeight}px`
		const index = Math.floor(Math.random() * (randomColor.length))
		liquid.style.backgroundColor = `${randomColor[index].color}`
		liquid.classList.add(`${randomColor[index].color}`)
		randomColor[index].number++
		if (randomColor[index].number === 4) {
			randomColor.splice(index,1)
		}
	}
} 



