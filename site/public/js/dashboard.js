var ctx = myChartCanvas
var cty = myChartCanvas2
var ctz = myChartCanvas3
var ctw = myChartCanvas4

const anos = ["Selecione o ano", "2018", "2019", "2020", "2021", "2022", "2023", "2024"];

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
        labels: ['Onde estamos %'],
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
                text: 'Meta vacinal para coqueluche',
                color: '#2e2e2e',
                font: {
                    size: 24
                }
            },
            legend: {
                labels: {
                    color: '#2e2e2e',
                    font: {
                        size: 16
                    }
                }
            },
            tooltip: { enabled: true }
        }
    },
    plugins: [{
        id: 'marcadorMeta',
        afterDatasetsDraw(chart) {
            const { ctx, chartArea } = chart;
            if (!chartArea) return; // garante que o gráfico será desenhado apenas após a caixa dele estiver pronta

            const posicao = 85; // ajuste na inclinação e posição da marca no gráfico
            const angle = Math.PI * (1 - posicao / 100); // Invertido (vai de 0% à esquerda até 100% à direita)

            const centerX = (chartArea.left + chartArea.right) / 2;
            const centerY = chartArea.bottom;
            const radius = (chartArea.right - chartArea.left) / 2 * 0.8;

            const x = centerX + radius * Math.cos(angle - 0.5);
            const y = centerY - radius * Math.cos(angle + 0.5);

            const marcadorComprimento = 30; // comprimento da marca da meta
            const inclinacao = 0.5; // controla a inclinação da marca da meta

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(
                x - marcadorComprimento * Math.cos(angle - inclinacao),
                y + marcadorComprimento * Math.sin(angle - inclinacao)
            ); // de onde começa
            ctx.lineTo(
                x + marcadorComprimento * Math.cos(angle + inclinacao),
                y - marcadorComprimento * Math.sin(angle + inclinacao)
            ); // onde termina
            ctx.strokeStyle = 'limegreen';
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.restore();

            ctx.save();
            ctx.fillStyle = '#444';
            ctx.font = 'bold 14px Arial';

            // Posição meta
            const posicaoMeta = Math.PI;
            const xMeta = x + marcadorComprimento * Math.cos(angle + inclinacao);
            const yMeta = y - marcadorComprimento * Math.sin(angle + inclinacao);
            ctx.fillText('95', xMeta - 5, yMeta - 10);

            // Posição do 0 (lado esquerdo)
            const posicao0 = Math.PI;
            const x0 = centerX + (radius + 30) * Math.cos(posicao0);
            const y0 = (centerY - 20) - (radius + 15) * Math.sin(posicao0);
            ctx.fillText('0', x0, y0); // ajustezinho fino

            // Posição do 100 (lado direito)
            const posicao100 = 0;
            const x100 = centerX + (radius + 20) * Math.cos(posicao100);
            const y100 = (centerY - 25) - (radius + 15) * Math.sin(posicao100);
            ctx.fillText('100', x100 - 15, y100 + 5); // ajustezinho fino

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
                borderColor: "#99ccff",
                backgroundColor: "#99ccff",
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

let myChart3 = new Chart(ctz, {
    type: 'doughnut',
    data: {
        labels: ['Acima da meta', 'Abaixo sem risco', 'Com risco epidemiológico'],
        datasets: [{
            data: ['62', '25', '13'],
            backgroundColor: ['#0A4D68', '#EBCF1C', '#EB3B30'],
            borderWidth: 0,
            circumference: 360,
            rotation: 270,
            cutout: '45%',
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Situação da cobertura vacinal no estado (%)',
                color: '#2e2e2e',
                font: {
                    size: 24
                }
            },
            legend: {
                labels: {
                    color: '#2e2e2e',
                    font: {
                        size: 10
                    }
                }
            },
            tooltip: { enabled: true }
        }
    }

});


// Adicionando gráfico criado em div na tela
let myChart4 = new Chart(ctw, {
    type: 'bar',
    data: {
        labels: ['2018', '2019', '2020', '2021', '2022'],
        datasets: [{
            label: 'Vacinados',
            data: [15, 85, 5, 80, 20],
            borderWidth: 1,
            borderColor: '#0A4D68',
            backgroundColor: '#0A4D68'
        },
        {
            label: 'Não vacinados',
            data: [15, 85, 5, 80, 20],
            borderWidth: 1,
            borderColor: '#99ccff',
            backgroundColor: '#99ccff'
        }
        ]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Situação vacinal ao longo dos anos',
                color: 'rgb(0,0,0)',
                font: {
                    size: 24
                }
            },
            legend: {
                labels: {
                    color: 'rgb(0, 0, 0)',
                    font: {
                        size: 16
                    }
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: 'rgb(9, 9, 9)',
                },
                title: {
                    display: true,
                    text: 'anos',
                    color: 'rgb(9, 9, 9)',
                    font: {
                        size: 16
                    }
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: 'rgb(9, 9, 9)',
                },
                title: {
                    display: true,
                    text: 'qtde. de pessoas (x1000)',
                    color: 'rgb(9, 9, 9)',
                    font: {
                        size: 16
                    }
                }
            }
        }
    }
});

var idEmpresa = sessionStorage.ID_USUARIO;

function voltarHome() {
    window.location = "index.html";
}

function abrirMenuExtendido() {
    var lateral = document.getElementsByClassName('lateral')[0];
    var lateralExtendido = document.getElementsByClassName('lateral-extendido')[0];
    var dashboard = document.getElementsByClassName('dashboard-conteudo')[0];

    lateralExtendido.style.display = 'flex';
    lateral.style.display = 'none';
    dashboard.style.marginLeft = '20%';
}

function recolherMenu() {
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