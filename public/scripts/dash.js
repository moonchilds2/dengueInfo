const ctx = document.getElementById('grafico');
let valores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
let grafico = new Chart(ctx, {
type: 'bar',
data: {
    labels: ['29', '30', '31','32', '33', '34', '35', '36', '37', '38'],
    datasets: [{
    label: 'Quantidade de casos de Dengue',
    data: valores,
    borderWidth: 2,
    borderColor: '#A642F4',
    backgroundColor: '#A642F4',
    }]
},
options: {
    scales: {
    y: {
        beginAtZero: true
    }
    }
}
});

const casosC = document.getElementById("casosC")
const casos30d = document.getElementById("casos30d") 
const taxa = document.getElementById("taxa")
const casosAnoP = document.getElementById("casosAnoP")

// Fazendo a requisição para a API
fetch('https://integrasus.saude.ce.gov.br/api/cenario-arbovirose/grafico-casos-confirmados?ano=2024&tipoArbovirose=Dengue&codigoSuperintendencia=&codigoAds=&codigoMunicipio=')
.then(response => response.json()) // Converte a resposta para JSON
.then(data => {
    // Encontrando o registro onde "tipoArbovirose" é "Dengue"
    let casosCeara = data.find(registro => registro.tipoArbovirose === "Dengue");
    casosC.innerHTML = casosCeara.quantidadeCasos
})

// Fazendo a requisição para a API
fetch('https://integrasus.saude.ce.gov.br/api/cenario-arbovirose/grafico-casos-semana?ano=2024&tipoArbovirose=Dengue&codigoSuperintendencia=&codigoAds=&codigoMunicipio=')
.then(response => response.json()) // Converte a resposta para JSON
.then(data => {
    
    // Encontrando o registro onde "semanaEpidemiologica" e os valores requisitados
    const casosS29 = data.find(registro => registro.semanaEpidemiologica === "29");
    const casosS30 = data.find(registro => registro.semanaEpidemiologica === "30");
    const casosS31 = data.find(registro => registro.semanaEpidemiologica === "31");
    const casosS32 = data.find(registro => registro.semanaEpidemiologica === "32");
    const casosS33 = data.find(registro => registro.semanaEpidemiologica === "33");
    const casosS34 = data.find(registro => registro.semanaEpidemiologica === "34");
    const casosS35 = data.find(registro => registro.semanaEpidemiologica === "35");
    const casosS36 = data.find(registro => registro.semanaEpidemiologica === "36");
    const casosS37 = data.find(registro => registro.semanaEpidemiologica === "37");
    const casosS38 = data.find(registro => registro.semanaEpidemiologica === "38");

    //Colocando os valores no array para o gráfico
    valores[0] = casosS29.quantidadeCasos
    valores[1] = casosS30.quantidadeCasos
    valores[2] = casosS31.quantidadeCasos
    valores[3] = casosS32.quantidadeCasos
    valores[4] = casosS33.quantidadeCasos
    valores[5] = casosS34.quantidadeCasos
    valores[6] = casosS35.quantidadeCasos
    valores[7] = casosS36.quantidadeCasos
    valores[8] = casosS37.quantidadeCasos
    valores[9] = casosS38.quantidadeCasos

    quantidadeCasos = (casosS35.quantidadeCasos + casosS36.quantidadeCasos + casosS37.quantidadeCasos + casosS38.quantidadeCasos)

    grafico.update()

    casos30d.innerHTML = quantidadeCasos

    //Crescimento ou diminuição casoso
    let casos = data.find(registro => registro.semanaEpidemiologica === "38");

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
  

  
  