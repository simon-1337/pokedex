let currentPokemon;
let loadedPokemon = [];


async function init() {
    loadPokemon();
 }


async function loadPokemon() {
    let start = loadedPokemon.length + 1;
    let end = start + 24;
    if (endReached(end)) {
        end = 899;
    }
    await getPokemons(start, end)
    renderPokedex(start-1);
    loadMoreBtnInvisible();
}


function endReached(end) {
    if (end >= 899) {
        return true
    }
}


async function getPokemons(start, end) {
    for (let i = start; i < end; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        loadedPokemon.push(currentPokemon);
    }
}


function loadMoreBtnInvisible() {
    if (endReached(loadedPokemon.length + 1)) {
        document.getElementById('load-more-container').classList.add('d-none');
    }
}


function renderPokedex(renderStart) {
    pokedexContainer = document.getElementById('pokedex');
    for (let i = renderStart; i < loadedPokemon.length; i++) {
        let number = numberTo3Digits(i + 1)
        let name = loadedPokemon[i]['name'];
        name = capitalizeFirstLetter(name);
        pokedexContainer.innerHTML += generatePokedexHTML(i, number, name);
        renderTypeSectionOverviewCard(i);
    } 
}


function numberTo3Digits(i) {
    number = i.toLocaleString('en-US', {
        minimumIntegerDigits: 3,
        useGrouping: false
      })
    return number
}


function generatePokedexHTML(i, number, name) {
    return /*html*/ `
        <div class="pokemon-overview-card" onclick="showDetails(${i})">
            <img src=${loadedPokemon[i]['sprites']['other']['home']['front_default']}>    
            <h2>${name}</h2> 
            <span>Nr. ${number}</span>
            <div id="types-section-overview-card${i}" class="type-ctn">
            </div>
        </div>
    `;
}

//renders the display of the types on the cards in the Pokedex
function renderTypeSectionOverviewCard(i) {
    let typeContainer = document.getElementById('types-section-overview-card' + i);
    let types = loadedPokemon[i]['types'];
    for (let j = 0; j < types.length; j++) {
        let type = types[j]['type']['name']
        typeCapitalized = capitalizeFirstLetter(type)
        typeContainer.innerHTML += templateTypeSectionOverviewCard(typeCapitalized, i, j);
        addClassesToType(type, i, j);
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
