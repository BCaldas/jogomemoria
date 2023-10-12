//Colocar pointer na segunda grid
//contador de pontos
//Animação de transição de grid
//Animação ao clicar na img certa

var interval;

const imagens = ["vitoria.png", "sport.png", "palmeiras.png", "goias.png", "flamengo.png", "chapecoense.png", "bahia.png", "vasco.png", "saopaulo.png", "internacional.png", "fortaleza.png", "cruzeiro.png", "bragantino2.png", "atletico.png", "tupi.png", "santos.png", "gremio.png", "fluminense.png", "corinthians.png", "botafogo.png"];
const grid = document.querySelector('.grid');
var primeiroGrid = [];
var segundoGrid = [];

window.onload = function () {
    var duracao = 2;
    display = document.querySelector('#timer');
    starTimer(duracao, display);

    primeiroGrid = [...imagens.sort(() => Math.random() - 0.5).splice(0, 15)]

    gerarGrid(primeiroGrid)
}

function starTimer(duracao, display) {
    var timer = duracao, minutos, segundos;
    interval = setInterval(function () {
        minutos = parseInt(timer / 60, 10);
        segundos = parseInt(timer % 60, 10);
        minutos = minutos < 10 ? "0" + minutos : minutos;
        segundos = segundos < 10 ? "0" + segundos : segundos;
        display.textContent = minutos + ":" + segundos;
        if (--timer < 0) {
            clearInterval(interval);
            rearranjarImagens();
        }
    }, 1000);

}

function rearranjarImagens() {
    segundoGrid = [...primeiroGrid.sort(() => Math.random() - 0.5)];
    segundoGrid.splice(0, 5);
    segundoGrid = segundoGrid.concat(imagens)
    segundoGrid.sort(() => Math.random() - 0.5)
    gerarGrid(segundoGrid)

    var cards = grid.querySelectorAll('div')

    var contador = 0;

    cards.forEach(card => {
        card.addEventListener('click', function () {

            if (contador === 10) {
                alert('O jogo Acabou')
                return
            }

            var imgTag = card.getElementsByTagName('img')[0];

            var srcImage = imgTag.getAttribute('src');

            var imgName = srcImage.slice(srcImage.indexOf('/') + 1);

            if (primeiroGrid.includes(imgName)) {
                contador++
                card.style.display = 'none'
            } else {
                alert('Burrasso, hein!')
            }

            if (contador === 10) {
                //Gambi para o alert aparecer depois do card sumir
                setTimeout(function () {
                    alert('GANHOU!!!')
                }, 100);

            }

        })
    });
}

function gerarGrid(imagens) {
    grid.innerHTML = '';
    for (let i = 0; i < 15; i++) {

        var img = imagens[i];

        var divImagem = document.createElement('div');
        divImagem.className = 'card';
        var escudo = document.createElement('img');
        escudo.src = 'img/' + img;
        divImagem.appendChild(escudo)
        grid.appendChild(divImagem);

    }
}
