"use strict"
const bottles = document.querySelector(".bottles");
const amountBottle = 4
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
console.log(randomColor)

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
		console.log(randomColor[index].number)
		if (randomColor[index].number === 4) {
			randomColor.splice(index,1)
		}
	}
}



