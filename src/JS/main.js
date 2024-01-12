function pesquisarPokemon() {
    let inputPesquisa = document.querySelector('.inputDePesquisa');
    let valorPesquisa = inputPesquisa.value.trim();

    if (valorPesquisa !== '') {
        if (valorPesquisa.startsWith('#')) {
            valorPesquisa = valorPesquisa.substring(1);
        }

        if (!isNaN(valorPesquisa) && parseInt(valorPesquisa) < 100) {
            valorPesquisa = parseInt(valorPesquisa).toString();
        }

        if (valorPesquisa !== '') {
            let urlPokeApi = `https://pokeapi.co/api/v2/pokemon/${valorPesquisa.toLowerCase()}`;

            fetch(urlPokeApi)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Pokemon não encontrado');
                    }
                    return response.json();
                })
                .then((pokemonData) => {
                    const pokemonLista = document.getElementById('pokemonLista');
                    pokemonLista.innerHTML = pokemonNoHTML(pokemonData);
                })
                .catch((error) => {
                    console.error('Erro ao buscar o Pokémon:', error);
                });

            inputPesquisa.value = valorPesquisa;
        } else {
            if (
                valorPesquisa.length === 6 &&
                valorPesquisa[0] === '0' &&
                valorPesquisa[1] === '0' &&
                valorPesquisa[2] === '0' &&
                valorPesquisa[3] !== '0' &&
                valorPesquisa[4] !== '0' &&
                valorPesquisa[5] !== '0' 
            ) {
                const urlPokeApi = `https://pokeapi.co/api/v2/pokemon/${valorPesquisa.toLowerCase()}`;

                fetch(urlPokeApi)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('Pokemon não encontrado');
                        }
                        return response.json();
                    })
                    .then((pokemonData) => {
                        const pokemonLista = document.getElementById('pokemonLista');
                        pokemonLista.innerHTML = pokemonNoHTML(pokemonData);
                    })
                    .catch((error) => {
                        console.error('Erro ao buscar o Pokémon:', error);
                    });

                inputPesquisa.value = valorPesquisa;
            } else {
                let pokemonLista = document.getElementById('pokemonLista');
                let urlPokeApi = 'https://pokeapi.co/api/v2/pokemon?limit=20';

                fetch(urlPokeApi)
                    .then((response) => response.json())
                    .then((jsonBody) => {
                        const pokemonsLista = jsonBody.results;
                        const promises = pokemonsLista.map((pokemon) => {
                            return fetch(pokemon.url).then((response) => response.json());
                        });
                        return Promise.all(promises);
                    })
                    .then((pokemonDataList) => {
                        pokemonLista.innerHTML = '';
                        pokemonDataList.forEach((pokemonData) => {
                            pokemonLista.innerHTML += pokemonNoHTML(pokemonData);
                        });
                    })
                    .catch((error) => console.log(error));

                inputPesquisa.value = '';
            }
        }
    } else {
        let pokemonLista = document.getElementById('pokemonLista');
        let urlPokeApi = 'https://pokeapi.co/api/v2/pokemon?limit=20';

        fetch(urlPokeApi)
            .then((response) => response.json())
            .then((jsonBody) => {
                const pokemonsLista = jsonBody.results;
                const promises = pokemonsLista.map((pokemon) => {
                    return fetch(pokemon.url).then((response) => response.json());
                });
                return Promise.all(promises);
            })
            .then((pokemonDataList) => {
                pokemonLista.innerHTML = '';
                pokemonDataList.forEach((pokemonData) => {
                    pokemonLista.innerHTML += pokemonNoHTML(pokemonData);
                });
            })
            .catch((error) => console.log(error));

        inputPesquisa.value = '';
    }
}

let pokemonLista = document.getElementById('pokemonLista');
let urlPokeApi = 'https://pokeapi.co/api/v2/pokemon?limit=50';

fetch(urlPokeApi)
    .then((response) => response.json())
    .then((jsonBody) => {
        const pokemonsLista = jsonBody.results;
        const promises = pokemonsLista.map((pokemon) => {
            return fetch(pokemon.url).then((response) => response.json());
        });
        return Promise.all(promises);
    })
    .then((pokemonDataList) => {
        pokemonDataList.forEach((pokemonData) => {
            pokemonLista.innerHTML += pokemonNoHTML(pokemonData);
        });
    })
    .catch((error) => console.log(error));

function verificarTeclaPressionada(event) {
    if (event.key === 'Enter') {
        pesquisarPokemon();
    }
}

function popUP(pokemonData) {
    let imagemDoPokemon = '';
    let nomePokemonAtualizado = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);
    let type1 = pokemonData.types[0].type.name.charAt(0).toUpperCase() + pokemonData.types[0].type.name.slice(1);
    let type2 = pokemonData.types.length > 1 ? pokemonData.types[1].type.name.charAt(0).toUpperCase() + pokemonData.types[1].type.name.slice(1) : '';
    let tamanhoPokemon = (pokemonData.height / 10).toFixed(1);
    let pesoPokemon = (pokemonData.weight / 10).toFixed(1);
    let tamanhoIMG = '';
    let valorSelecionadoArte = valorSelecionadoBotaoArte();

    if (valorSelecionadoArte === 'cartoon') {
        if (pokemonData.sprites.other.dream_world.front_default) {
            imagemDoPokemon = pokemonData.sprites.other.dream_world.front_default;
            tamanhoIMG = "80%";
        } else {
            imagemDoPokemon = pokemonData.sprites.other['official-artwork'].front_default;
            tamanhoIMG = "70%";
        }
    } else {
        if (valorSelecionadoArte === 'pixel') {
            imagemDoPokemon = pokemonData.sprites.front_default;
            tamanhoIMG = "120%";
        }
    }

    let backgroundColorStyle = corBackGround(type1);

    let additionalInfo = '';
    if (pokemonData.description) {
        additionalInfo = `<span class="descricaoPokemon" style="font-weight: bold;">${pokemonData.description}</span>`;
    }

    return `<div class="corpoPokemon" style="${backgroundColorStyle}; top: 0; border-radius: 0.3rem;">
                <h2 class="nomePokemonPOPUP" style="margin: 0 auto; text-align: center; color: white; font-size: 35px;">
                    ${nomePokemonAtualizado}
                </h2>
                <h3 class="numeros" style="margin: 0 auto; text-align: center; opacity: 0.45">#${pokemonData.id.toString().padStart(3, '0')}</h3>

                <div class="infoAdicional" style="display: flex; flex-direction: column; align-items: flex-start; margin-right: 20px; color: white; padding: 1rem;">
                    <span class="tipo1" style="text-transform: uppercase; font-weight: bold;">${type1}</span>
                    ${type2 ? `<span class="tipo2" style="text-transform: uppercase; font-weight: bold;">${type2}</span>` : ''}
                    <span class="tamanho" style="text-transform: uppercase; font-weight: bold;">Tamanho: ${tamanhoPokemon} m</span>
                    <span class="peso" style="text-transform: uppercase; font-weight: bold;">Peso: ${pesoPokemon} kg</span>
                    <span>${additionalInfo}</span>

                </div>

                <div style="display: flex; justify-content: center;">
                    <img style="z-index: 2; width: ${tamanhoIMG};" src="${imagemDoPokemon}" alt="Imagem do Pokémon: ${nomePokemonAtualizado}">
                </div>


            </div>
            <button onclick="hidePopup()" style="background:none; color: white; margin-top: 1rem; margin-left: auto; margin-right: auto; display: block;">
                <i class="fas fa-times"></i>
            </button>`;
}
    

function showPopup(listItem) {
    let nomePokemonElement = listItem.querySelector('.nome');
    let nomePokemon = nomePokemonElement.textContent;

    document.getElementById('overlay').style.opacity = "100%";
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('popUP').style.display = 'block';

    let urlPokeApi = `https://pokeapi.co/api/v2/pokemon/${nomePokemon.toLowerCase()}`;
    let popupContainer = document.getElementById('popUP');
    popupContainer.innerHTML = ''; // Limpar o conteúdo anterior

    fetch(urlPokeApi)
        .then((response) => response.json())
        .then((pokemonData) => {
            popupContainer.innerHTML = popUP(pokemonData);
        })
        .catch((error) => console.log(error));
}


function hidePopup() {
    document.getElementById('overlay').style.opacity = "0%";
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('popUP').style.display = 'none';
}

const inputPesquisa = document.querySelector('.inputDePesquisa');
inputPesquisa.addEventListener('keyup', verificarTeclaPressionada);
