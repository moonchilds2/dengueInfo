document.getElementById('menu-btn').addEventListener('click', function() {
    const menu = document.querySelector('nav ul');
    menu.classList.toggle('active');
});

const casosRus = document.getElementById("numero-casos-anuais")
const casosObit = document.getElementById("numero-mortes-anuais")
const casosSem = document.getElementById("numero-casos-semanais")
const casosAnoP = document.getElementById("casosAnoP")
const casosNot = document.getElementById("casos-notificados")



fetch('https://integrasus.saude.ce.gov.br/api/cenario-arbovirose/card-mapa-tabela?ano=2024&tipoArbovirose=Dengue&codigoSuperintendencia=&codigoAds=&codigoMunicipio=')
.then(response => response.json()) // Converte a resposta para JSON
.then(data => {
    // Encontrando o registro onde "municipio" é "RUSSAS"
    let casosRussas = data.find(registro => registro.municipio === "RUSSAS");

    casosRus.innerHTML = casosRussas.casosConfirmados
    casosObit.innerHTML = casosRussas.casosObitos + " Mortes"
    casosNot.innerHTML = casosRussas.casosNotificados

})

fetch('https://integrasus.saude.ce.gov.br/api/cenario-arbovirose/grafico-casos-semana?ano=2024&tipoArbovirose=Dengue&codigoSuperintendencia=&codigoAds=&codigoMunicipio=')
.then(response => response.json()) // Converte a resposta para JSON
.then(data => {
    let casos = data.find(registro => registro.semanaEpidemiologica === "38");
    casosSem.innerHTML = casos.quantidadeCasos

    let anoPassado = casos.quantidadeCasosAnoAnterior;
    let anoAtual = casos.quantidadeCasos;

    let dif = anoAtual - anoPassado;
    let porcentagem = (dif / anoPassado) * 100;

    if (porcentagem > 0) {
        casosAnoP.innerHTML= "+" + porcentagem.toFixed(1) + "%";
    } else if (porcentagem < 0) {
        casosAnoP.innerHTML = porcentagem.toFixed(1) + "%";
    } else {
        casosAnoP.innerHTML = "+" + porcentagem.toFixed(1) + "%";
    }

})

