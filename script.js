let currentPokemon

async function loadPokemon() {
    let url =  'https://pokeapi.co/api/v2/pokemon/charmander';
    let response = await fetch(url);
    currentPokemon = await response.json();

    console.log(currentPokemon);
    renderPokemonInfo();
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
