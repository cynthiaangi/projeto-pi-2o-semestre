var ctx = myChartCanvas
var cty = myChartCanvas2

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

let myChart2 = new Chart(cty, {
    type: 'doughnut',
    data: {
        labels: ['75%'],
      datasets: [{
        data: [75, 100 - 75],
        backgroundColor: ['#0A4D68', '#E0E0E0'],
        borderWidth: 0,
        circumference: 180,
        rotation: 270,
        cutout: '70%',
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
            display: true,
            text: 'Meta vacinal',
            color: '#2e2e2e',
            font: {
                size: 24
            }
            // padding: {
            //     bottom: 
            // }
        },
        legend: {
            labels: {
                color: '#2e2e2e',
                font: {
                    size: 16
                }
            }
        },
        // legend: { display: true },
        tooltip: { enabled: true }
      }
    },
    plugins: [{
        id: 'marcadorMeta',
        afterDatasetsDraw(chart) {
          const {ctx, chartArea} = chart;
          if (!chartArea) return;
      
          const posicao = 83; // Meta (%)
          const angle = Math.PI * (1 - posicao / 100); // Invertido (vai de 0% à esquerda até 100% à direita)
      
          const centerX = (chartArea.left + chartArea.right) / 2;
          const centerY = chartArea.bottom;
          const radius = (chartArea.right - chartArea.left) / 2 * 0.8;
      
          const x = centerX + radius * Math.cos(angle - 0.5);
          const y = centerY - radius * Math.cos(angle + 0.5);
      
          const marcadorComprimento = 22;
          const inclinacao = 0.5; // controla a inclinação da marquinha
      
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(
            x - marcadorComprimento * Math.cos(angle - inclinacao),
            y + marcadorComprimento * Math.sin(angle - inclinacao)
          );
          ctx.lineTo(
            x + marcadorComprimento * Math.cos(angle + inclinacao),
            y - marcadorComprimento * Math.sin(angle + inclinacao)
          );
          ctx.strokeStyle = 'limegreen';
          ctx.lineWidth = 3;
          ctx.stroke();
          ctx.restore();
        }
      }]
           
      
  });
  

// Adicionando gráfico criado em div na tela
let myChart = new Chart(ctx,
    {
        type: 'line',
        data: {
            labels: ['2018', '2019', '2020', '2021', '2022'],
            datasets: [{
                label: 'Coqueluche',
                data: ['100', '400', '342', '298', '792'],
                fill: false,
                borderColor: '#0A4D68',
                backgroundColor: '#0A4D68',
                tension: 0.1
            },
            {
                label: 'Poliomielite',
                data: [],
                borderColor: "#8a8a8a",
                backgroundColor: "#8a8a8a",
                tension: 0.1
            },
            {
                label: 'Meningite',
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
                    text: 'Quantidade de casos por ano',
                    color: '#2e2e2e',
                    font: {
                        size: 24
                    }
                    // padding: {
                    //     bottom: 40
                    // }
                },
                legend: {
                    labels: {
                        color: '#2e2e2e',
                        font: {
                            size: 16
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#2e2e2e',
                    },
                    title: {
                        display: true,
                        text: 'anos',
                        color: '#2e2e2e',
                        font: {
                            size: 16
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#2e2e2e',
                    },
                    title: {
                        display: true,
                        text: 'qtde. casos',
                        color: '#2e2e2e',
                        font: {
                            size: 16
                        }
                    }
                }
            }
        }
    });

var idEmpresa = sessionStorage.ID_USUARIO;

function voltarHome(){
    window.location = "index.html";
}

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