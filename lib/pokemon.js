// TODO write your code here
const url = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0'
const cardTemplate = document.getElementById('cardTemplate')
const cardsContainer = document.getElementById('cardsContainer')
const infoTemplate = document.getElementById('infoTemplate')
const infoContainer = document.getElementById('infoContainer')

fetch(url)
  .then(response => response.json())
  .then((data) => {
    data.results.forEach((pokemonData) => {
      fetch(pokemonData.url) // return each pokemon info
        .then(response => response.json())
        .then((pokemon) => {
          const cardClone = cardTemplate.content.cloneNode(true)
          cardClone.querySelector('img').src = pokemon.sprites.front_default
          cardClone.querySelector('h2').innerText = pokemon.name
          cardClone.querySelector('p').innerText = pokemon.types.map(t => t.type.name)
          cardClone.querySelector('a').addEventListener('click', () => {
            infoContainer.innerHTML = ''
            const infoClone = infoTemplate.content.cloneNode(true)

            infoClone.querySelector('img').src = pokemon.sprites.front_default
            infoClone.querySelector('h2').innerText = pokemon.name
            infoClone.querySelector('p').innerText = pokemon.types.map(t => t.type.name)
            infoContainer.appendChild(infoClone)
          })
          cardsContainer.appendChild(cardClone)
        })
    })
  })
