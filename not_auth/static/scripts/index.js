/*================ FETCH API ================*/
async function fetchApi() {
	const response = await fetch('https://www.whenisthenextmcufilm.com/api')
	const data = await response.json()
	const son = data.following_production

	const root = document.getElementById('root')
	const cardType = document.getElementById('card-type')
	cardType.innerText = ` ${data.type}`

	card = createCard(data, 1)
	root.innerHTML = `<main class="card"> ${card.innerHTML} </main>`

	const arrow = document.getElementById('arrow')
	arrow.addEventListener('click', function(){updateCard(root, data, 2)})
	
}

fetchApi()


/*================ CREATE AND UPDATE THE CARD TO DISPLAY ================*/

function createCard(data, idx) {
	const card = document.createElement('div')
	card.innerHTML = `
		<h2 class="card-title">${data.title}<h2>
		<img
			src="${data.poster_url}" 
			alt="${data.title} Poster"
			class="card-image"
		/>
		<div class="card-wrapper">
			<span>${data.release_date}</span>
			<span>${data.type}</span>
		</div>
		<h3 class="card-days_until">Just ${data.days_until} days!</h3>
		<span
			class="${idx == 1 ? 'right-arrow arrow' : 'left-arrow arrow'}"
			id="arrow"
		>
		${idx == 1 ? '→' : '←'}
		</span>
		`
	return card

}

function updateCard(card, data, idx) {
	const cardType = document.getElementById('card-type')
	cardType.innerText = idx === 2?` ${data.following_production.type}`:` ${data.type}`
	if (idx === 2) {
		card.innerHTML = `
		<main class="card">
		 ${createCard(data.following_production, idx).innerHTML}
		</main>
		`
	} else {
		card.innerHTML = `
		<main class="card">
		 ${createCard(data, idx).innerHTML}
		</main>
		`
	}

	const arrow = document.getElementById('arrow')
	arrow.addEventListener('click', function(){updateCard(card, data, idx===2?1:2)})

}