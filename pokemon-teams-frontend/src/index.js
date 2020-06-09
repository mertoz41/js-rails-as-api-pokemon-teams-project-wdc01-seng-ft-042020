const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', function(){
    getTrainers()
})

function getTrainers(){
fetch(TRAINERS_URL)
.then(resp => resp.json())
.then(data => {
    data.forEach(trainer => {
        renderTrainer(trainer)
    })
})
}

function renderTrainer(trainer){
    let container = document.querySelector('main')
    let card = document.createElement('div')
    let name = document.createElement('h2')
    let ul = document.createElement('ul')
    ul.id = `ul-${trainer.id}`
    trainer.pokemons.forEach(poke => {
        let li = document.createElement('li')
        let buton = document.createElement('button')
        buton.className = "release"
        buton.innerText = "Release"
        li.id = `poke-id-${poke.id}`
        buton.setAttribute('data-pokemon-id', `${poke.id}`)
        buton.addEventListener('click', (e) => releasePokemon(e, poke))
        li.innerText = `${poke.nickname} (${poke.species})`
        li.appendChild(buton)
        ul.append(li)
        
    })
    let addButton = document.createElement('button')
    addButton.setAttribute('data-trainer-id', `${trainer.id}`)
    addButton.innerText = "Add Pokemon"

    
    name.innerText = trainer.name 
    card.className = 'card'
    card.setAttribute('data-id', `${trainer.id}`)
    card.append(name, addButton, ul)
    container.appendChild(card)
    
        addButton.addEventListener('click', (e) => pokemonAdder(e, trainer))
    
}

function pokemonAdder(e, trainer){
    if (trainer.pokemons.length < 6){
        fetch(POKEMONS_URL , {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                trainer_id: trainer.id
            })
        })
        .then(resp => resp.json())
        .then(poke => {
            renderOnePoke(poke)
        })
    } else {
        alert("no")
    }
    
}
function renderOnePoke(poke){
    let ul = document.getElementById(`ul-${poke.trainer_id}`)
    let li = document.createElement('li')
    li.innerText = `${poke.nickname} (${poke.species})`
    let button = document.createElement('button')
    li.id = `poke-id-${poke.id}`
    button.className = "release"
    button.innerText = "Release"
    button.setAttribute('data-pokemon-id', `${poke.id}`)
    button.addEventListener('click', (e) => releasePokemon(e, poke))
    li.appendChild(button)
    ul.appendChild(li)

}

function releasePokemon(e, poke){
    let num = e.target.dataset.pokemonId
    fetch( `${POKEMONS_URL}/${num}`, {
        method: "DELETE"
    })
    .then(resp => resp.json())
    .then(data => {
        document.getElementById(`poke-id-${num}`).remove()
        
    })
}