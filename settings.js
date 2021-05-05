"use strict"

const buttonSettings = document.querySelector(".settingsBtn")
const settings = document.querySelector(".settings")
const settingsBack = document.querySelector(".settings--backBtn")
const opacity = document.querySelector(".opacity")
const container = document.querySelector(".container")
const music = document.querySelector("audio")
const musicSetting = document.querySelector(".settings--music")

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
	} else {
		music.play()
	}
})

