var ctx = myChartCanvas

const anos = ["Selecione o ano","2018", "2019", "2020", "2021", "2022", "2023", "2024"];

const anoAntesInput = document.getElementById("ipt_ano_antes");
const anoDepoisInput = document.getElementById("ipt_ano_depois");

const selectAnoAntes = document.createElement("select");
const selectAnoDepois = document.createElement("select");
selectAnoAntes.name = "ano_antes";
selectAnoAntes.id = "sel_ano_antes";
selectAnoAntes.className = "select-ano";
selectAnoDepois.name = "ano";
selectAnoDepois.id = "sel_ano_depois";
selectAnoDepois.className = "select-ano";

anos.forEach((ano) => {
    const opcao = document.createElement("option");
    opcao.value = ano;
    opcao.textContent = ano;
    selectAnoAntes.appendChild(opcao);
});

anos.forEach((ano) => {
    const opcao = document.createElement("option");
    opcao.value = ano;
    opcao.textContent = ano;
    selectAnoDepois.appendChild(opcao);
});

anoAntesInput.replaceWith(selectAnoAntes);
anoDepoisInput.replaceWith(selectAnoDepois);

// Adicionando gráfico criado em div na tela
let myChart = new Chart(ctx,
    {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Umidade',
                data: [],
                fill: false,
                borderColor: "rgb(229, 240, 255)",
                backgroundColor: "rgb(229, 240, 255)",
                tension: 0.1
            },
            {
                label: 'Temperatura',
                data: [],
                borderColor: "rgb(153, 204, 255)",
                backgroundColor: "rgb(153, 204, 255)",
                tension: 0.1
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Variação de temperatura e umidade em tempo real',
                    color: 'rgb(255, 255, 255)',
                    font: {
                        size: 24
                    },
                    padding: {
                        bottom: 40
                    }
                },
                legend: {
                    labels: {
                        color: 'rgb(255, 255, 255)',
                        font: {
                            size: 16
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: 'rgb(255, 255, 255)',
                    },
                    title: {
                        display: true,
                        text: 'horas',
                        color: 'rgb(255, 255, 255)',
                        font: {
                            size: 16
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'rgb(255, 255, 255)',
                    },
                    title: {
                        display: true,
                        text: 'medida',
                        color: 'rgb(255, 255, 255)',
                        font: {
                            size: 16
                        }
                    }
                }
            }
        }
    });

var idEmpresa = sessionStorage.ID_USUARIO;

function abrirMenuExtendido(){
    var lateral = document.getElementsByClassName('lateral')[0];
    var lateralExtendido = document.getElementsByClassName('lateral-extendido')[0];
    var dashboard = document.getElementsByClassName('dashboard-conteudo')[0];

        lateralExtendido.style.display = 'flex';
        lateral.style.display = 'none';
        dashboard.style.marginLeft = '20%';
}

function recolherMenu(){
    var lateral = document.getElementsByClassName('lateral')[0];
    var lateralExtendido = document.getElementsByClassName('lateral-extendido')[0];
    var dashboard = document.getElementsByClassName('dashboard-conteudo')[0];

        lateral.style.display = 'flex';
        lateralExtendido.style.display = 'none';
        dashboard.style.marginLeft = '5%';
}

function obterDadosGrafico(idEmpresa) {
    console.log('Entrei na Obter')
    fetch(`/medidas/ultimas/${idEmpresa}`, { method: 'GET' }, { cache: 'no-store' }).then(function (response) {
        console.log(response);

        if (response.ok) {

            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                atualizarGrafico();

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

var umidade_atual = 0;
var temperatura_atual = 0;
var dataHoraAtual = 0;

function atualizarGrafico() {
    fetch(`/medidas/tempo-real/${idEmpresa}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {
                console.log('estou aqui')
                obterdados(idEmpresa);
                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico:`);


                novoRegistro.forEach((valor) => {
                    if (myChart.data.labels.length == 10 && myChart.data.datasets[0].data.length == 10) {
                        myChart.data.datasets[0].data.shift();  // apagar o primeiro de umidade
                        myChart.data.labels.shift(); // apagar o primeiro
                        myChart.data.datasets[1].data.shift();  // apagar o primeiro de temperatura;
                    }

                    temperatura_atual = valor.temperatura;
                    umidade_atual = valor.umidade;
                    dataHoraAtual = new Date(valor.DataHora);
                    var dataHoraBR = dataHoraAtual.toLocaleDateString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    });
                    myChart.data.datasets[0].data.push(parseFloat(valor.umidade)); // incluir uma nova medida de umidade
                    myChart.data.labels.push(dataHoraBR); // incluir um novo momento
                    myChart.data.datasets[1].data.push(parseFloat(valor.temperatura)); // incluir uma nova medida de temperatura
                })
                myChart.update();

                var kpi_temp = document.getElementById('temp_kpi')
                var kpi_umid = document.getElementById('umid_kpi')

                kpi_temp.innerHTML = ''
                kpi_umid.innerHTML = ''
                console.log(temperatura_atual)

                // criando e manipulando elementos do HTML via JavaScript
                var divPublicacao = document.createElement("div");
                var divPublicacao2 = document.createElement("div");
                var spankpiTemp = document.createElement("span");
                var spankpiUmid = document.createElement("span");

                spankpiTemp.innerHTML = temperatura_atual + '°C';
                spankpiUmid.innerHTML = umidade_atual + "%";


                divPublicacao.className = "publicacao-temp";
                divPublicacao2.className = "publicacao-umid";
                spankpiTemp.className = "publicacao";
                spankpiUmid.className = "publicacao";

                divPublicacao.appendChild(spankpiTemp);
                divPublicacao2.appendChild(spankpiUmid);

                kpi_temp.appendChild(divPublicacao);
                kpi_umid.appendChild(divPublicacao2);

                if (temperatura_atual <= 20) {
                    kpi_temp.style.backgroundColor = '#00ff00'
                } else if (temperatura_atual <= 27) {
                    kpi_temp.style.backgroundColor = '#ffff00'
                } else {
                    kpi_temp.style.backgroundColor = '#ff0000'
                }

                if (umidade_atual <= 50) {
                    kpi_umid.style.backgroundColor = '#00ff00'
                } else if (umidade_atual <= 60) {
                    kpi_umid.style.backgroundColor = '#ffff00'
                } else {
                    kpi_umid.style.backgroundColor = '#ff0000'
                }


            }
            );
        } else {
            console.error('Nenhum dado encontrado ou erro na API');

        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

setInterval(() => { atualizarGrafico() }, 2000);