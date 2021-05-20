"use strict"
const buttonStartGame = document.querySelector(".startBtn") // Старт игры
const buttonSettings = document.querySelector(".settingsBtn") // Кнопка вызова меню настроек
const settings = document.querySelector(".settings") // Контейнер настроек
const settingsBack = document.querySelector(".settings--backBtn") // Кнопка "назад" в меню настроек
const opacity08 = document.querySelector(".opacity08") // Контейнер class = "opacity0.8"
const opacity = document.querySelector(".opacity") // Контейнер class = "opacity0.8"
const container = document.querySelector(".container") //Контейнер class = "container"
const music = new Audio// audio тег
const soundFinishBottle = new Audio(`sound/finishBottle.mp3`)
const soundFinishLvl = new Audio(`sound/finishLvl.mp3`)
const musicSetting = document.querySelector(".settings--music") // контейнер вкл/выкл музыки
const soundSetting = document.querySelector(".settings--sound") // контейнер вкл/выкл звуков
const volumeSettings = document.querySelector(".settings--volume")  // контейнер увел/уменьш громкости
const volumeInput = document.querySelector("input[type = 'range']") // input громкости
const volumeLine = document.querySelector(".settings--volume--checkbox") // Линия по которой ходит ползунок громкости
const volumePose = document.querySelector(".settings--volume--checkbox--pose") // Ползунок громкости
const musicTrackList = ["sound/soundTrack/bensound-memories.mp3", "sound/soundTrack/bensound-ukulele.mp3","sound/soundTrack/bensound-cute.mp3"] // трек-лист
buttonStartGame.textContent = "Играть"

soundFinishBottle.load()
soundFinishLvl.load()

// Функция открыть настройки
function openSettings () {
	settings.style.top = `20%`
	opacity08.style.zIndex = `2`
	settings.style.zIndex = `5`
}

// Функция, которая запускает музыку и меняет src по окончанию трека. 
function nextTrack(ind) {
	music.src = `${musicTrackList[ind]}`
	music.load()
	music.play()
	music.addEventListener("canplaythrough", () => {
		music.play()
	})
	music.addEventListener("ended", () => {
		if (ind === musicTrackList.length-1) nextTrack(0)
		else nextTrack(ind+1)
	})
}

// Функция срабатывания звуков

function sounds(sound) {
	if (soundSetting.querySelector("input").checked) {
		sound.load()
		sound.addEventListener("canplaythrough", () => {
			sound.play()
		})
	}
}


buttonSettings.addEventListener("click", openSettings)

settingsBack.addEventListener("click", () => {
	settings.style.top = `-200%`
	settings.style.zIndex = ``
	opacity08.style.zIndex = ``
}) 

// Вкл./Выкл. музыки
musicSetting.addEventListener("click", (e) => {
	if(e.target.tagName !== "INPUT") return
	if (!musicSetting.querySelector("input").checked) {
		music.pause()
	} else {
		nextTrack(Math.floor(Math.random()*musicTrackList.length)) // Играет случайный трек из массива musicTrackList
	}
})


// Настройка ползунка громкости

let shiftX = 0
const positionVolumePose = volumeLine.clientWidth - volumePose.clientWidth // расстояние по которому может ходить ползунок
volumePose.style.left = `${volumeInput.value*positionVolumePose/100}px` // Ставим ползунок в положение, в котором стоит при загрузке input type = range
// Ставим громкость === значению input
music.volume = volumeInput.value/100 
soundFinishBottle.volume = volumeInput.value/100
soundFinishLvl.volume = volumeInput.value/100

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
	soundFinishBottle.volume = volumeInput.value/100
	soundFinishLvl.volume = volumeInput.value/100
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
// Код для окна игры
//


const restartBtn = document.querySelector(".startGame-navigation-restart") // Кнопка рестарта
const windowGame = document.querySelector(".startGame") // Окно игры
const windowMainMenu = document.querySelector(".main") // Окно главного меню
const windowGameToMenu = document.querySelector(".startGame-navigation-mainMenu") // Кнопка "Главное меню"
const windowGameSettings = document.querySelector(".startGame-navigation-settings") // Кнопка "Настройки"
const levelBoard = document.querySelector(".startGame-game-lvl") // Котейнер текущего уровня
const bottles = document.querySelector(".startGame-game-bottles") // Контейнер, где находятся наши пробирки
const confetti = document.querySelector(".confetti")// Конфетти
let lvlBoard = 1
let lvl = 1 // Стартовый уровень
let nextLvl = 1 
let coupleOfBootles // Массив, в который мы будем пушить две пробирки для сравнения


// Кнопка "Играть"
buttonStartGame.addEventListener("click", (e) => {
	if (e.target.textContent === "Играть") {
		startGame(lvl,nextLvl)
	}
	e.target.textContent = "Продолжить"
	windowGame.style.left = `0%`
	windowMainMenu.style.left = `-100%`
}) 


// Кнопка рестарта раунда
restartBtn.addEventListener("click", () => startGame(lvl,nextLvl)) 

windowGameToMenu.addEventListener("click", () => {
	windowGame.style.left = `100%`
	windowMainMenu.style.left = `0%`
})

windowGameSettings.addEventListener("click", openSettings)

// Старт игры

function startGame(lvl,nextLvl) {
// Функция отрисовки пробирок и шариков
	coupleOfBootles = []
	const amountColors = lvl + 1
	let amountBottle 
	const randomColor = []
	function getColor () {
		return "#" + ((1 << 24) * Math.random() | 0).toString(16)
	}
	
	for (let i = 0; i < amountColors; i++) {
		const obj = {
			color: getColor(),
			number: 0,
			text: i + 1,
		}
		randomColor.push(obj)
	}

	while (bottles.firstChild) {
		bottles.removeChild(bottles.firstChild);
	}

	levelBoard.textContent = `Уровень ${lvlBoard}`

	// Рисуем пробирки в зависимости от количества цветов
	if (lvl === 1) {
		amountBottle = amountColors + 1
	} else {
		amountBottle = amountColors + 2
	}
	
// создаем пробирок сколько нужно
	for (let i = 0; i < amountBottle; i++) {
		const bottle = document.createElement("div")
		bottle.classList.add("bottle")
		bottles.appendChild(bottle)
	} 

	const bottle = document.querySelectorAll(".bottle")

// Распределяем цвета по пробиркам. Берем сколько нужно цветов и делаем 4 шара каждого цвета
	for (let i = 0; i < amountColors; i++) {
		let getClassListBall
		for (let j = 0; j < 4; j++) {
			const index = Math.floor(Math.random() * (randomColor.length))
			const ball = document.createElement("div")
			ball.textContent = `${randomColor[index].text}`
			ball.classList.add("ball")
			bottle[i].appendChild(ball)
			ball.style.bottom = `${j * ball.offsetHeight}px`
			ball.style.left = `${(bottle[i].clientWidth - ball.offsetWidth)/2}px`
			ball.style.backgroundColor = `${randomColor[index].color}`
			ball.classList.add(`${randomColor[index].color}`)
			randomColor[index].number++
			if (randomColor[index].number === 4) {
				randomColor.splice(index,1)
			}
			getClassListBall = ball.classList.value
		}
		// Если в пробирке все шары будут одного цвета, то удаляются все пробирки и функция startGame запустится заново
		if ([...bottle[i].children].every( e => e.classList.value === getClassListBall)) {
			while (bottles.firstChild) {
				bottles.removeChild(bottles.firstChild);
			}
			startGame(lvl,nextLvl)
		}
	}
}



bottles.addEventListener("click", (e) => {	
	// Если клик не по пробирке, то return
	if(!e.target.closest(".bottle")) return 
	// Если по пустой пробирке клик, то return
	if (e.target.closest(".bottle").children.length === 0 && coupleOfBootles.length === 0) return
	const bottle = e.target.closest(".bottle") 
	// находим расстояния bottleSidePosition.top, bottleSidePosition.right, bottleSidePosition.bottom,bottleSidePosition.left 
	const bottleSidePosition = bottle.getBoundingClientRect() 
	// пушим в массив кликаемые пробирки
	coupleOfBootles.push(bottle) 
	// Если пробирка в массиве одна то берем из нее шарик и поднимаем над пробиркой
	if(coupleOfBootles.length === 1) { 
		bottle.lastChild.style.bottom = `${bottleSidePosition.bottom - bottleSidePosition.top}px`
		return
	}
	// Если пробирок в массиве две, то заходим в условие
	if (coupleOfBootles.length === 2) {
		// Если пробирки равны значит опускаем шарик обратно, очищаем массив, return и ждем клика заново
		if (coupleOfBootles[0] === coupleOfBootles[1]) {
			bottle.lastChild.style.bottom = `${(bottle.children.length - 1)*bottle.lastChild.offsetHeight}px`
			coupleOfBootles = []
			return
		}
		// Если вторая пробирка не пустая, то заходим в условие
		if (coupleOfBootles[1].children.length !== 0) {
			// Если во второй пробирке 4 шарика уже есть или верхние шарики двух пробирок не совпадают по цвету, то шарик первой пробирки опускаем обратно, а второй - поднимаем. Первую пробирку удаляем из нашего массива.
			if (coupleOfBootles[1].children.length === 4 || coupleOfBootles[1].lastChild.classList.value !== coupleOfBootles[0].lastChild.classList.value) {
				coupleOfBootles[0].lastChild.style.bottom = `${(coupleOfBootles[0].children.length - 1)*coupleOfBootles[0].lastChild.offsetHeight}px`
				coupleOfBootles[1].lastChild.style.bottom = `${bottleSidePosition.bottom - bottleSidePosition.top}px`
				coupleOfBootles.splice(0,1)
				return
			}
		}
		// Если пробирки не равны, то заходим в условие
		if (coupleOfBootles[0] !== coupleOfBootles[1]) {
			// Если вторая пробирка пустая или верхние шарики двух пробирок совпадают по цвету, то закидываем шарик из первой пробирки во вторую.
			if (coupleOfBootles[1].children.length === 0 || coupleOfBootles[1].lastChild.classList.value === coupleOfBootles[0].lastChild.classList.value) {
				runBall(coupleOfBootles)
				coupleOfBootles = [];
			}
		}
	}
})


function runBall([firstBottle, lastBottle]) {
	const ball = firstBottle.lastChild.cloneNode(true)
	opacity.style.zIndex = 50
	// Анимация движения шарика
	let animationRunBall = firstBottle.lastChild.animate([
		{ left: `${lastBottle.getBoundingClientRect().left - firstBottle.getBoundingClientRect().left + (lastBottle.clientWidth - firstBottle.lastChild.offsetWidth)/2}px`,
		bottom: `${firstBottle.getBoundingClientRect().bottom - lastBottle.getBoundingClientRect().top}px`,
	}
	], {
		duration: 100,
		iterations: 1
	})
	firstBottle.lastChild.style.zIndex = `1`
	animationRunBall.addEventListener("finish", () => {
		opacity.style.zIndex = -2
		lastBottle.appendChild(ball)
		lastBottle.lastChild.style.bottom = `${(lastBottle.children.length - 1)*lastBottle.lastChild.offsetHeight}px`
		firstBottle.removeChild(firstBottle.lastChild)
		lastBottle.lastChild.addEventListener("transitionend", function checkPosition() {
				if (lastBottle.children.length === 0) return
			// Проверка, если все шарики в колбах одного цвета или в колбе нету шариков, то переходим на следующий уровень
			if ([...bottles.children].every((bottle) => {
				if (bottle.children.length === 0) {
					return true
				} 
				if (bottle.children.length === 4) {
					const className = bottle.children[0].className
					return  ([...bottle.children].every(ball => ball.className === className)) 
				}
			})) {
				opacity.style.zIndex = 50
				sounds(soundFinishLvl)
				let animationNextLvl = levelBoard.animate([
					{ transform: `scale(2)`,
				}
				], {
					duration: 2500,
					iterations: 1
				})
				animationNextLvl.addEventListener("finish", () =>{
					opacity.style.zIndex = -2
					if (nextLvl === lvl) {
						lvlBoard ++
						lvl++
						nextLvl = 1
						startGame(lvl,nextLvl)
					} else {
						lvlBoard ++
						nextLvl++
						startGame(lvl,nextLvl)
					}
				})
				return
			}
			// Если в пробирке собраны все цвета, то на пробирке выстрелит конфетти
			const className = lastBottle.children[0].className
			if ([...lastBottle.children].every(ball => ball.className === className) && lastBottle.children.length === 4 && !lastBottle.classList.contains("confettiPass")) {
				lastBottle.classList.add("confetti")
				lastBottle.classList.add("confettiPas")
				sounds(soundFinishBottle)
				setTimeout(() => lastBottle.classList.remove("confetti"),1000)
			}
			lastBottle.lastChild.removeEventListener("transitionend", checkPosition) 
		})
	})
} 



