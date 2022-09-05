let currentPokemon;
let loadedPokemon = [];


async function init() {
    loadPokemon();
 }


async function loadPokemon() {
    let start = loadedPokemon.length + 1;
    let end = start + 14;
    for (let i = start; i < end; i++) {
        let url =  `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        loadedPokemon.push(currentPokemon);
    }
    renderPokedex(start-1);
}


function renderPokedex(renderStart) {
    pokedexContainer = document.getElementById('pokedex');
    for (let i = renderStart; i < loadedPokemon.length; i++) {
        let name = loadedPokemon[i]['name'];
        name = capitalizeFirstLetter(name)
        pokedexContainer.innerHTML += generatePokedexHTML(i, name);
    } 
}


function generatePokedexHTML(i, name) {
    return /*html*/ `
        <div class="pokemon-card-preview" onclick="showDetails(${i})">
            <img src=${loadedPokemon[i]['sprites']['other']['home']['front_default']}>    
            <h2>${name}</h2>
        </div>
    `;
}


function renderPokemonInfo() {
    let name = currentPokemon['name']
    name = capitalizeFirstLetter(name);
    document.getElementById('pokemonName').innerHTML = name;
    document.getElementById('pokemonImg').src = currentPokemon['sprites']['other']['home']['front_default'];
}


function capitalizeFirstLetter(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}
