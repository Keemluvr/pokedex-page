// Variáveis globais
const API = axios.create({
    baseURL: 'https://api-pokedex-lab.herokuapp.com/api/',
    //baseURL: 'http://localhost:2080/api/',
    timeout: 1000,
    headers: {
        'X-Custom-Header': 'foobar'
    }
});
let curr_pokemon;

// Side Bar lateral
$(document).ready(function () {
    $('.sidenav').sidenav();
});

// Modal
$(document).ready(function () {
    $('.modal').modal();
});


// Eggs
// Faz uma requisição para a API
API.get('/egg')
    .then(function (response) {
        // Sucesso
        for (i = 0; i < response.data.length; i++) {
            document.getElementById("list-eggs").innerHTML +=
                `<tr>
                    <td class="capitalize">${response.data[i].name}</td>
                    <td>${response.data[i].pokemon.length}</td>
                </tr>
                `;
        }
    })
    .catch(function (error) {
        // Erro
        document.getElementById("error").innerHTML =
            `<div class="">
                <i class="large material-icons center-align report">report</i> 
                <h5 class="center-align">Erro na requisição! Tente novamente mais tarde.</h5>
            </div>
            `;
        console.log(error);
    });

// Pokemons
// Faz uma requisição para a API
API.get('/pokemon')
    .then(function (response) {
        // Sucesso
        for (i = 0; i < response.data.length; i++) {
            document.getElementById("list-pokemons").innerHTML +=
                `<div class="card medium col s12 m6 l3 modal-trigger" href="#pokemon" onclick="changeCurrentPokemon(${response.data[i].id})">
                <div id="img-pokemon" class="card-image waves-effect waves-block waves-light" >
                  <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${response.data[i].id}.png" class="imagem-pokemon">
                </div>
                <div class="card-content center-align">
                  <span class="card-title activator grey-text text-darken-1">#00${response.data[i].id}</span>
                  <p><a class="card-title activator grey-text text-darken-4">${response.data[i].name}</a></p>
                  <span class="new badge red" data-badge-caption="">tipo2</span>
                  <span class="new badge blue" data-badge-caption="">tipo1</span>
                </div>
              </div>
                `;
        }
    })
    .catch(function (error) {
        // Erro
        document.getElementById("error").innerHTML =
            `<div class="">
                <i class="large material-icons center-align report">report</i> 
                <h5 class="center-align">Erro na requisição! Tente novamente mais tarde.</h5>
            </div>
            `;
    });

// Coloca o pokémon que foi clicado na variável global para poder ser usado na modal
function changeCurrentPokemon(id) {
    curr_pokemon = id;

    // Pokemon pelo id
    // Faz uma requisição para a API
    API.get(`/pokemon/${curr_pokemon}`)
        .then(function (response) {
            console.log(response)
            let eggs = '<div>';
            response.data.egg.forEach(element => {
                eggs += `<span class="new badge  purple lighten-3" data-badge-caption="">${element.name}</span>`
            });
            eggs += '</div>';

            // Sucesso
            document.getElementById("info-pokemon").innerHTML =
                `<h4>${response.data.name}</h4>
                <p>Descrição: ${response.data.description}</p>
                <div class="row">
                    <div id="img-pokemon" class="card-image waves-effect waves-block waves-light col 6" >
                        <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${response.data.id}.png" class="imagem-pokemon">
                    </div>
                    <div class="col 6 infos">
                        <p>Altura: ${response.data.height}m</p>
                        <p>Peso: ${response.data.weight}kg</p>
                        <p>Tipos:</p>
                        <span class="new badge red" data-badge-caption="">tipo2</span>
                        <span class="new badge blue" data-badge-caption="">tipo1</span>

                        <h5 class="estatistics">Estatísticas</h5>
                        <div class="stat">
                            <p>Ataque: ${response.data.attack}</p>
                            <div class="progress">
                                <div class="determinate" style="width: ${response.data.attack}%"></div>
                            </div>
                        </div>
                        <div class="stat">
                            <p>Defesa: ${response.data.defense}</p>
                            <div class="progress">
                                <div class="determinate blue" style="width: ${response.data.defense}%"></div>
                            </div>
                        </div>
                        <div class="stat">
                            <p>Velocidade de ataque: ${response.data.speedAttack}</p>
                            <div class="progress">
                                <div class="determinate deep-orange accent-2" style="width: ${response.data.speedAttack}%"></div>
                            </div>
                        </div>
                        <div class="stat">
                            <p>Velocidade de defesa: ${response.data.speedDefense}</p>
                            <div class="progress">
                                <div class="determinate brown lighten-2" style="width: ${response.data.speedDefense}%"></div>
                            </div>
                        </div>
                        <div class="stat">
                            <p>Velocidade: ${response.data.speed}</p>
                            <div class="progress">
                                <div class="determinate yellow" style="width: ${response.data.speed}%"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <p>Ovos:</p>
                <div id="egg-pokemon"> 
                    ${eggs}
                </div>
            `;
        })
        .catch(function (error) {
            // Erro
            document.getElementById("error").innerHTML =
                `<div class="">
                <i class="large material-icons center-align report">report</i> 
                <h5 class="center-align">Erro na requisição! Tente novamente mais tarde.</h5>
            </div>
            `;
        });
}

// Naturezas
// Faz uma requisição para a API
API.get('/nature')
    .then(function (response) {
        // Sucesso
        console.log(response.data)
        for (i = 0; i < response.data.length; i++) {
            document.getElementById("list-natures").innerHTML +=
                `<tr>
                    <td class="capitalize">${response.data[i].name}</td>
                    <td>${response.data[i].attributeIncrease}</td>
                    <td>${response.data[i].attributeDecrease}</td>
                </tr>
                `;
        }
    })
    .catch(function (error) {
        // Erro
        document.getElementById("error").innerHTML =
            `<div class="">
                <i class="large material-icons center-align report">report</i> 
                <h5 class="center-align">Erro na requisição! Tente novamente mais tarde.</h5>
            </div>
            `;
    });

// Items
// Faz uma requisição para a API
API.get('/nature')
    .then(function (response) {
        // Sucesso
        for (i = 0; i < response.data.length; i++) {
            document.getElementById("list-items").innerHTML +=
                `<tr>
                    <td class="capitalize">
                        <img src="https://img.pokemondb.net/sprites/items/${response.data[i].name}.png" class="imagem-pokemon">
                        ${response.data[i].name}
                    </td>
                    <td>${response.data[i].attributeIncrease}</td>
                    <td>${response.data[i].attributeDecrease}</td>
                </tr>
                `;
        }
    })
    .catch(function (error) {
        // Erro
        document.getElementById("error").innerHTML =
            `<div class="">
                <i class="large material-icons center-align report">report</i> 
                <h5 class="center-align">Erro na requisição! Tente novamente mais tarde.</h5>
            </div>
            `;
    });