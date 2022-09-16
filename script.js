let currentPokemon;
let currentPokemonSpecies;
let loadedPokemon = [];
let loadedPokemonSpecies = [];
let images = [];

async function init() {
    loadPokemon();
    loadPokemonsSpecies();
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
        pushImages(currentPokemon);
    }
}


function pushImages(currentPokemon) {
        images.push(currentPokemon['sprites']['other']['home']['front_default']);
}


async function loadPokemonsSpecies() {
    let start = loadedPokemonSpecies.length + 1;
    let end = start + 24;
    if (endReached(end)) {
        end = 899;
    }
    await getPokemonsSpecies(start, end)
}


async function getPokemonsSpecies(start, end) {
    for (let i = start; i < end; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon-species/${i}`;
        let response = await fetch(url);
        currentPokemonSpecies = await response.json();
        loadedPokemonSpecies.push(currentPokemonSpecies);
    }
}


//loadmore-btn will be invisible
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
        pokedexContainer.innerHTML += templatePokedexOverview(i, number, name);
        renderTypeSection('types-section-overview-card', 'overview', i);
    } 
}


function numberTo3Digits(i) {
    number = i.toLocaleString('en-US', {
        minimumIntegerDigits: 3,
        useGrouping: false
      })
    return number
}


//renders the display of the types on the cards in the Pokedex
function renderTypeSection(sectionID, section, i) {
    let typeContainer = document.getElementById(sectionID + i);
    let types = loadedPokemon[i]['types'];
    for (let j = 0; j < types.length; j++) {
        let type = types[j]['type']['name']
        typeCapitalized = capitalizeFirstLetter(type)
        typeContainer.innerHTML += templateTypeSection(typeCapitalized, section, i, j);
        addClassesToType(type, section, i, j);
    }
}



function addClassesToType(type, section, i, j) {
    document.getElementById(`type${section}${i},${j}`).classList.add(type)
}


function searchPokemons() {
    let input = document.getElementById('searchbar').value;
    input=input.toLowerCase();
    let pokemons = document.getElementsByClassName('pokemon-overview-card');
    let pokemonnames = document.getElementsByClassName('pokemon-name')    
    for (i = 0; i < pokemons.length; i++) {
        if (!pokemonnames[i].innerHTML.toLowerCase().includes(input)) {
            pokemons[i].classList.add('d-none');
        }
        else {
            pokemons[i].classList.remove('d-none');                 
        }
    }
}


function renderDetails(i) {
    let detailContainer = document.getElementById('details-ctn');
    enableFullScreen(detailContainer);
    detailContainer.innerHTML = templateShowDetails(i);
    renderTypeSection('types-section-details', 'details', i,)
}


function enableFullScreen(detailContainer) {
    detailContainer.classList.remove('d-none');
    addPositionFixedToNav();
}


//disables Scrolling by fixing the nav bar on top.
function addPositionFixedToNav() {
    document.getElementById('nav').classList.add('position-fixed');
}


function closeDetails() {
    let detailContainer = document.getElementById('details-ctn')
    detailContainer.classList.add('d-none');
    removePositionFixedFromNav()
}


function removePositionFixedFromNav() {
    document.getElementById('nav').classList.remove('position-fixed');
}


async function renderEvolutions(i) {
    let url = loadedPokemonSpecies[i]['evolution_chain']['url'];
    let response = await fetch(url);
    let evolutionChain = await response.json();
    getEvolutionsURLs(evolutionChain);
}


function getEvolutionsURLs(evolutionChain) {
    let evolutions = []
    evolutions.push(getBaseEvolutionURL(evolutionChain));
    evolutions.push(getSecondEvolutionURL(evolutionChain));
    if (checkIfTheirdEvolution(evolutionChain)) {
        evolutions.push(getTheirdEvolution(evolutionChain));
    }
    getEvolutionsIDs(evolutions);   
}


function getBaseEvolutionURL(evolutionChain) {
    return evolutionChain['chain']['species']['url'];
}


function getSecondEvolutionURL(evolutionChain) {
    return evolutionChain['chain']['evolves_to']['0']['species']['url'];
}


function checkIfTheirdEvolution(evolutionChain) {
    if (evolutionChain['chain']['evolves_to']['0']['evolves_to'].length > 0) {
        return true;
    }
}


function getTheirdEvolution(evolutionChain) {
    return evolutionChain['chain']['evolves_to']['0']['evolves_to']['0']['species']['url'];
}


async function getEvolutionsIDs(evolutions) {
    let evolutionIDs = [];
    for (let i = 0; i < evolutions.length; i++) {
        let url = evolutions[i];
        let response = await fetch(url);
        currentPokemon = await response.json();
        evolutionIDs.push(currentPokemon['id'] - 1); 
    }
    renderEvolutionsImages(evolutionIDs)
}


function renderEvolutionsImages(id) {
    let container = document.getElementById('evolution-chain');
    for (let i = 0; i < id.length; i++) {
        let image = id[i]
        container.innerHTML += templateEvolutions(image); 
    }
}


function capitalizeFirstLetter(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}