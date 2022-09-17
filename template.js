function templatePokedexOverview(i, number, name) {
    return /*html*/ `
        <div class="pokemon-overview-card" onclick="renderDetails(${i}), renderEvolutions(${i})">
            <img src=${images[i]}>    
            <h2 class="pokemon-name">${name}</h2> 
            <span>Nr. ${number}</span>
            <div id="types-section-overview-card${i}" class="type-section-overview">
            </div>
        </div>
    `;
}


function templateTypeSection(type, section, i, j) {
    return /*html*/ `
        <span id="type${section}${i},${j}" class="type">${type}</span>
    `;
}


function templateShowDetails(i) {
    return /*html*/ `
        <div class="details">
            <div class="details-child">
                <img src="${images[i]}">
                <div class="details-child-susbsection">
                    <h2>${capitalizeFirstLetter(loadedPokemon[i]['name'])}</h2>
                    <div class="type-container-details">
                        <h4 class="type-headline">Type:</h4>
                        <div id="types-section-details${i}" class="types-section-details"></div>
                    </div>
                    <div class="habitat">
                        <h4>Habitat:</h4>
                        <span>
                            ${capitalizeFirstLetter(loadedPokemonSpecies[i]['habitat']['name'])}
                        </span>
                    </div>
                    <div>
                        <h4>About:</h4>
                        <span>
                            ${loadedPokemonSpecies[i]['flavor_text_entries'][10]['flavor_text']}
                        </span>
                    </div>
                </div>
            </div>
            <div class="evolution-chain-container">
                <h4 class="evolutions-headline">Evolutions:</h4>
                <div id="evolution-chain"></div>
            </div>
        </div>
        <img class="close-btn" onclick="closeDetails()" src="./img/close.png">
    `;
}


function templateEvolutions(image) {
    return /*html*/ `
        <img class="evolution-image" src="${images[image]}">
    `;
}