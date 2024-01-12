function corBackGround(type1) {
    let type = type1.toLowerCase();
    return (
        type === "grass" ? 'background-color: #14A06F;' : type === "fire" ? 'background-color: #eb5b33fb' : type === "water" ? 'background-color: #3bafddd2' : type === "rock" ? 'background-color: #dd9f3bd2' : type === "poison" ? 'background-color: #a636c8d2' : type === "flying" ? 'background-color: #85e3ebd2' : type === "bug" ? 'background-color: #76e987d2' : type === "fighting" ? 'background-color: #cac64de9' : type === "ghost" ? 'background-color: #913da4e9' : type === "ground" ? 'background-color: #81b244e9' : type === "normal" ? 'background-color: #abdfdbe9' : type === "electric" ? 'background-color: #c6cd3cc2' : type === "steel" ? 'background-color: #32717ac2' : type === "ice" ? 'background-color: #21acc2c2' : type === "psychic" ? 'background-color: #c221bfc2' : type === "dark" ? 'background-color: #270b26c2' : type === "dragon" ? 'background-color: #ab2323c0' : type === "fairy" ? 'background-color: #ae1366c0' : ''
    );
}

function valorSelecionadoBotaoArte() {
    let botaoPixel = document.getElementById("pixelArtBtn");
    let botaoCartoon = document.getElementById("cartoonBtn");
  
    if (botaoPixel.classList.contains("active")) {
        return "pixel";
    } else if (botaoCartoon.classList.contains("active")) {
        return "cartoon";
    }
}  

function pokemonNoHTML(pokemon) {
    let imagemDoPokemon = '';
    let nomePokemon = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    let type1 = pokemon.types[0].type.name.charAt(0).toUpperCase() + pokemon.types[0].type.name.slice(1);
    let type2 = pokemon.types.length > 1 ? pokemon.types[1].type.name.charAt(0).toUpperCase() + pokemon.types[1].type.name.slice(1) : '';
    
    let valorSelecionadoArte = valorSelecionadoBotaoArte();

    if (valorSelecionadoArte === 'cartoon') {
        if (pokemon.sprites.other.dream_world.front_default) {
            imagemDoPokemon = pokemon.sprites.other.dream_world.front_default;
        } else {
            imagemDoPokemon = pokemon.sprites.other['official-artwork'].front_default;
        }
    } else {
        if (valorSelecionadoArte === 'pixel') {
            imagemDoPokemon = pokemon.sprites.front_default;
        }
    }

    let backgroundColorStyle = corBackGround(type1);

    return `<li class="pokemon" style="${backgroundColorStyle}; cursor:pointer;" onclick="showPopup(this)">
            <span class="numeros">#${pokemon.id.toString().padStart(3, '0')}</span>
            <span class="nome" style="position: relative; z-index: 0;"><strong>${nomePokemon}</strong></span>
            <div class="detail">
                <ol class="tipos">
                    <li class="tipo1">${type1}</li>
                    ${type2 ? `<li class="tipo2">${type2}</li>` : ''}
                </ol>
                <img class="pokemon-img" src="${imagemDoPokemon}" alt="${nomePokemon}">
                <img class="logoPokebola" src="./src/img/pokebola_minimalista_Pokedex_Node_de_Saulo_Ferro.png" alt="Pokebola">
            </div>
        </li>
    `;
}

let pixelArtBtn = document.getElementById('pixelArtBtn');
let cartoonBtn = document.getElementById('cartoonBtn');

function removeActiveClass() {
    pixelArtBtn.classList.remove('active');
    cartoonBtn.classList.remove('active');
}

pixelArtBtn.addEventListener('click', function() {
    if (!pixelArtBtn.classList.contains('active')) {
        removeActiveClass();
        pixelArtBtn.classList.add('active');
    }
});

cartoonBtn.addEventListener('click', function() {
    if (!cartoonBtn.classList.contains('active')) {
        removeActiveClass();
        cartoonBtn.classList.add('active');
    }
});
