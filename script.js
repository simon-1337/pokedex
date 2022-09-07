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
        name = capitalizeFirstLetter(name);
        pokedexContainer.innerHTML += generatePokedexHTML(i, name);
        renderTypeSectionOverviewCard(i);
    } 
}


function generatePokedexHTML(i, name) {
    return /*html*/ `
        <div class="pokemon-overview-card" onclick="showDetails(${i})">
            <img src=${loadedPokemon[i]['sprites']['other']['home']['front_default']}>    
            <h2>${name}</h2>
            <div id="types-section-overview-card${i}">
            </div>
        </div>
    `;
}

//renders the display of the types on the cards in the Pokedex
function renderTypeSectionOverviewCard(i) {
    let typeContainer = document.getElementById('types-section-overview-card' + i);
    let types = loadedPokemon[i]['types'];
    for (let j = 0; j < types.length; j++) {
        typeContainer.innerHTML += templateTypeSectionOverviewCard(types[j]['type']['name'], i, j);
        addClassesToType(types[j]['type']['name'], i, j);
    }
}


function templateTypeSectionOverviewCard(type, i, j) {
    return /*html*/ `
        <span id="type${i},${j}" class="type">${type}</span>
    `;
}


function addClassesToType(type, i, j) {
    document.getElementById(`type${i},${j}`).classList.add(type)
}


function capitalizeFirstLetter(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}
