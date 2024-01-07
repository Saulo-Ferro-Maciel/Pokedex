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
                valorPesquisa.length === 4 &&
                valorPesquisa[0] === '0' &&
                valorPesquisa[1] === '0' &&
                valorPesquisa[2] === '0' &&
                valorPesquisa[3] !== '0'
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

const inputPesquisa = document.querySelector('.inputDePesquisa');
inputPesquisa.addEventListener('keyup', verificarTeclaPressionada);
