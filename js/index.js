// Variáveis globais
const API = axios.create({
    //baseURL: 'https://api-pokedex-lab.herokuapp.com/api/',
    baseURL: 'http://localhost:2080/api/',
    timeout: 1000,
    headers: {
        'X-Custom-Header': 'foobar'
    }
});

// Side Bar lateral
$(document).ready(function () {
    $('.sidenav').sidenav();
});

// Modal
$(document).ready(function () {
    $('.modal').modal();
});


// Eggs
// Fa uma requisição para a API
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
        console.log(response.data[0].pokemon.length)
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

