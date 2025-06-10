var idUsuario = sessionStorage.ID_USUARIO;
var nomeUser = sessionStorage.NOME_USUARIO;
var cidadeUser = "Barueri"
var bemVinda = document.getElementById("nome_usuario");
bemVinda.innerHTML = `${nomeUser}`;

// graficos Coqueluche
var ctx = myChartCanvas
var cty = myChartCanvas2
var ctz = myChartCanvas3
var ctw = myChartCanvas4

// graficos Meningite
var cta = myChartCanvas5
var ctb = myChartCanvas6
var ctc = myChartCanvas7
var ctd = myChartCanvas8

// graficos Poliomielite
var cti = myChartCanvas9
var ctj = myChartCanvas10
var ctk = myChartCanvas11
var ctl = myChartCanvas12

var dados1 = [];
var dados2 = [];
var dados3 = [];
var dados4 = [];
var dados5 = [];
var dados6 = [];
var dados7 = [];
var dados8 = [];
var dados9 = []
var dados10 = []
var dados11 = []
// var dados12 = []
// var dados13 = []
// var dados14 = []
// var dados15 = []
// var dados16 = []
// var dados17 = []
// var dados18 = []

const doencas = ['Coqueluche', 'Meningite', 'Poliomielite'];

const doencaInput = document.getElementById('ipt_doencas');

const doencaSelect = document.createElement("select");
doencaSelect.name = 'doencas';
doencaSelect.id = 'sel_doenca';
doencaSelect.className = 'select-ano';

doencas.forEach((doenca) => {
    const escolha = document.createElement("option");
    escolha.value = doenca;
    escolha.textContent = doenca;
    doencaSelect.appendChild(escolha);
});

doencaInput.replaceWith(doencaSelect);

// const anos = ["Selecione o ano", "2018", "2019", "2020", "2021", "2022", "2023", "2024"];

// const anoAntesInput = document.getElementById("ipt_ano_antes");
// const anoDepoisInput = document.getElementById("ipt_ano_depois");

// const selectAnoAntes = document.createElement("select");
// const selectAnoDepois = document.createElement("select");
// selectAnoAntes.name = "ano_antes";
// selectAnoAntes.id = "sel_ano_antes";
// selectAnoAntes.className = "select-ano";
// selectAnoDepois.name = "ano";
// selectAnoDepois.id = "sel_ano_depois";
// selectAnoDepois.className = "select-ano";

// anos.forEach((ano) => {
//     const opcao = document.createElement("option");
//     opcao.value = ano;
//     opcao.textContent = ano;
//     selectAnoAntes.appendChild(opcao);
// });

// anos.forEach((ano) => {
//     const opcao = document.createElement("option");
//     opcao.value = ano;
//     opcao.textContent = ano;
//     selectAnoDepois.appendChild(opcao);
// });

// anoAntesInput.replaceWith(selectAnoAntes);
// anoDepoisInput.replaceWith(selectAnoDepois);

let myChart2 = new Chart(cty, {
    type: 'doughnut',
    data: {
        labels: ['Onde estamos %'],
        datasets: [{
            data: dados1,
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
                text: 'Meta vacinal para Coqueluche',
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
let myChart6 = new Chart(ctb, {
    type: 'doughnut',
    data: {
        labels: ['Onde estamos %'],
        datasets: [{
            data: dados1,
            backgroundColor: ['#99ccff', '#E0E0E0'],
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
                text: 'Meta vacinal para Meningite',
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

let myChart10 = new Chart(ctj, {
    type: 'doughnut',
    data: {
        labels: ['Onde estamos %'],
        datasets: [{
            data: dados1,
            backgroundColor: ['#8a8a8a', '#E0E0E0'],
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
                text: 'Meta vacinal para Poliomielite',
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
            labels: dados2,
            datasets: [{
                label: 'Coqueluche',
                data: dados4,
                fill: false,
                borderColor: '#0A4D68',
                backgroundColor: '#0A4D68',
                tension: 0.1
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Quantidade de casos de Coqueluche por ano',
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

let myChart5 = new Chart(cta,
    {
        type: 'line',
        data: {
            labels: dados2,
            datasets: [{
                label: 'Meningite',
                data: dados4,
                borderColor: "#99ccff",
                backgroundColor: "#99ccff",
                tension: 0.1
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Quantidade de casos de Meningite por ano',
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

let myChart9 = new Chart(cti,
    {
        type: 'line',
        data: {
            labels: dados2,
            datasets: [{
                label: 'Poliomielite',
                data: dados4,
                borderColor: "#8a8a8a",
                backgroundColor: "#8a8a8a",
                tension: 0.1
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Quantidade de casos de Poliomielite por ano',
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
    type: 'bar',
    data: {
        labels: dados8,
        datasets: [{
            data: dados7,
            backgroundColor: ['#0A4D68', '#EBCF1C', '#EB3B30', '#2E8B57', '#FF7F50', '#9370DB'],
            borderColor: ['#0A4D68', '#EBCF1C', '#EB3B30', '#2E8B57', '#FF7F50', '#9370DB'],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        indexAxis: 'y',
        barThickness: 15,
        maxBarThickness: 20,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Ranking de vacinação',
                color: '#2e2e2e',
                font: {
                    size: 20
                }
            },
            legend: {
                display: false
            },
            tooltip: { enabled: true }
        },
        scales: {
            x: {
                ticks: {
                    color: '#2e2e2e',
                },
                title: {
                    display: true,
                    text: 'porcentagem (%)',
                    color: '#2e2e2e',
                    font: {
                        size: 12
                    }
                }
            }
        }
    }

});

let myChart7 = new Chart(ctc, {
    type: 'bar',
    data: {
        labels: dados8,
        datasets: [{
            data: dados7,
            backgroundColor: ['#0A4D68', '#EBCF1C', '#EB3B30', '#2E8B57', '#FF7F50', '#9370DB'],
            borderColor: ['#0A4D68', '#EBCF1C', '#EB3B30', '#2E8B57', '#FF7F50', '#9370DB'],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        indexAxis: 'y',
        barThickness: 15,
        maxBarThickness: 20,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Ranking de vacinação',
                color: '#2e2e2e',
                font: {
                    size: 20
                }
            },
            legend: {
                display: false
            },
            tooltip: { enabled: true }
        },
        scales: {
            x: {
                ticks: {
                    color: '#2e2e2e',
                },
                title: {
                    display: true,
                    text: 'porcentagem (%)',
                    color: '#2e2e2e',
                    font: {
                        size: 12
                    }
                }
            }
        }
    }

});
let myChart11 = new Chart(ctk, {
    type: 'bar',
    data: {
        labels: dados8,
        datasets: [{
            data: dados7,
            backgroundColor: ['#0A4D68', '#EBCF1C', '#EB3B30', '#2E8B57', '#FF7F50', '#9370DB'],
            borderColor: ['#0A4D68', '#EBCF1C', '#EB3B30', '#2E8B57', '#FF7F50', '#9370DB'],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        indexAxis: 'y',
        barThickness: 15,
        maxBarThickness: 20,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Ranking de vacinação',
                color: '#2e2e2e',
                font: {
                    size: 20
                }
            },
            legend: {
                display: false
            },
            tooltip: { enabled: true }
        },
        scales: {
            x: {
                ticks: {
                    color: '#2e2e2e',
                },
                title: {
                    display: true,
                    text: 'porcentagem (%)',
                    color: '#2e2e2e',
                    font: {
                        size: 12
                    }
                }
            }
        }
    }

});


// Adicionando gráfico criado em div na tela
let myChart4 = new Chart(ctw, {
    type: 'bar',
    data: {
        labels: dados9,
        datasets: [{
            label: 'Cidade',
            data: dados10,
            borderWidth: 1,
            borderColor: '#0A4D68',
            backgroundColor: '#0A4D68'
        },
        {
            label: 'Estado',
            data: dados11,
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
                text: 'Situação vacinal cidade/estado',
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
                    text: 'porcentagem (%)',
                    color: 'rgb(9, 9, 9)',
                    font: {
                        size: 16
                    }
                }
            }
        }
    }
});

let myChart8 = new Chart(ctd, {
    type: 'bar',
    data: {
        labels: dados9,
        datasets: [{
            label: 'Cidade',
            data: dados10,
            borderWidth: 1,
            borderColor: '#0A4D68',
            backgroundColor: '#0A4D68'
        },
        {
            label: 'Estado',
            data: dados11,
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
                text: 'Situação vacinal cidade/estado',
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
                    text: 'porcentagem (%)',
                    color: 'rgb(9, 9, 9)',
                    font: {
                        size: 16
                    }
                }
            }
        }
    }
});

let myChart12 = new Chart(ctl, {
    type: 'bar',
    data: {
        labels: dados9,
        datasets: [{
            label: 'Cidade',
            data: dados10,
            borderWidth: 1,
            borderColor: '#0A4D68',
            backgroundColor: '#0A4D68'
        },
        {
            label: 'Estado',
            data: dados11,
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
                text: 'Situação vacinal cidade/estado',
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
                    text: 'porcentagem (%)',
                    color: 'rgb(9, 9, 9)',
                    font: {
                        size: 16
                    }
                }
            }
        }
    }
});

const help1 = "Exibe a divisão percentual entre pessoas vacinadas e não vacinadas, apresentando um comparativo direto da cobertura vacinal na população.";
const titulo1 = "Total de vacinados e não vacinados";
const help2 = "Mostra o percentual de aumento ou redução da cobertura vacinal em relação a um período anterior, indicando a tendência de adesão à vacina.";
const titulo2 = "Variação da cobertura vacinal";
const help3 = "Apresenta a mudança percentual no número de casos registrados da doença em relação ao período anterior, indicando aumento ou redução.";
const titulo3 = "Variação da quantidade de casos";
const help4 = "Indica a porcentagem atual da população vacinada em comparação à meta estabelecida, exibindo se o objetivo foi atingido ou não.";
const titulo4 = "Meta vacinal para coqueluche";
const help5 = "Exibe as 5 cidades com maior valor de cobertura vacinal e a posição que a cidade apresentada está atualmente.";
const titulo5 = "Ranking de vacinação"
const help6 = "Gráfico que apresenta a evolução do número de casos ao longo do tempo, exibindo comparativos mensais e tendências da doença.";
const titulo6 = "Quantidade de casos por ano";
const help7 = "Exibe uma comparação da cidade com o estado geral na situação vacinal.";
const titulo7 = "Situação vacinal cidade/estado";

var idEmpresa = sessionStorage.ID_USUARIO;

function abrirMensagem(mensagem) {
    var mensagemTitulo = document.getElementsByClassName('titulo-mensagem')[0];
    var mensagemCorpo = document.getElementsByClassName('corpo-mensagem')[0];
    var bottomsheet = document.getElementsByClassName('mensagem')[0];
    var fundo = document.getElementsByClassName('area-mensagem')[0];

    bottomsheet.style.display = 'flex';
    fundo.style.display = 'flex';

    if (mensagem == 'help1') {
        mensagemTitulo.innerHTML = titulo1;
        mensagemCorpo.innerHTML = help1;
    }
    if (mensagem == 'help2') {
        mensagemTitulo.innerHTML = titulo2;
        mensagemCorpo.innerHTML = help2;

    }
    if (mensagem == 'help3') {
        mensagemTitulo.innerHTML = titulo3;
        mensagemCorpo.innerHTML = help3;

    }
    if (mensagem == 'help4') {
        mensagemTitulo.innerHTML = titulo4;
        mensagemCorpo.innerHTML = help4;

    }
    if (mensagem == 'help5') {
        mensagemTitulo.innerHTML = titulo5;
        mensagemCorpo.innerHTML = help5;

    }
    if (mensagem == 'help6') {
        mensagemTitulo.innerHTML = titulo6;
        mensagemCorpo.innerHTML = help6;

    }
    if (mensagem == 'help7') {
        mensagemTitulo.innerHTML = titulo7;
        mensagemCorpo.innerHTML = help7;

    }
}
var codigoCidade = sessionStorage.CODCIDADE_USUARIO;
var idDoenca = 1;
window.onload = montarGraficoCidade(codigoCidade, idDoenca);

function fecharMensagem() {
    var bottomsheet = document.getElementsByClassName('mensagem')[0];
    var fundo = document.getElementsByClassName('area-mensagem')[0];

    bottomsheet.style.display = 'none';
    fundo.style.display = 'none';
}

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
    var notificacao = document.getElementsByClassName('notificacoes')[0];

    lateral.style.display = 'flex';
    lateralExtendido.style.display = 'none';
    dashboard.style.marginLeft = '5%';
    notificacao.style.display = 'none';
}

function fecharNotificacao() {
    var notificacao = document.getElementsByClassName('notificacoes')[0];

    notificacao.style.display = 'none';
}

function abrirNotificacao() {
    var notificacao = document.getElementsByClassName('notificacoes')[0];

    notificacao.style.display = 'flex';
}

function acessarConta(){
    window.location = 'conta.html';
}

function acessarDashboard(){
    window.location = 'dash-medico.html';
}

function acessarCampanha(){
    window.location = 'cidades-alerta.html';
}

function alterarDoencaCidade(){
    var doenca = doencaSelect.value;
    var coqueluche = document.getElementsByClassName('coqueluche');
    var meningite = document.getElementsByClassName('meningite');
    var poliomielite = document.getElementsByClassName('poliomielite');
    console.log(doenca);

fetch("/medidas/alterarDoenca", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        doencaServer: doenca,
    })
}).then(function (resposta) {
    console.log("ESTOU NO THEN DO entrar()!")

    if (resposta.ok) {
        console.log(resposta);

        resposta.json().then(json => {
            console.log(json);
            console.log(JSON.stringify(json));

            if( json.nomeDoenca == 'Coqueluche'){
                for(var i = 0; i < coqueluche.length; i++){
                    coqueluche[i].style.display = 'flex';
                    meningite[i].style.display = 'none';
                    poliomielite[i].style.display = 'none';
                }
            }else if(json.nomeDoenca == 'Meningite'){
                for(var j = 0; j < meningite.length; j++){
                    coqueluche[j].style.display = 'none';
                    meningite[j].style.display = 'flex';
                    poliomielite[j].style.display = 'none';
                }
            }else if(json.nomeDoenca == 'Poliomelite'){
                for(var k = 0; k < poliomielite.length; k++){
                    coqueluche[k].style.display = 'none';
                    meningite[k].style.display = 'none';
                    poliomielite[k].style.display = 'flex';
                }
            }

        montarGraficoCidade(codigoCidade, json[0].idDoenca);

        });

    } else {

        console.log("Houve um erro ao tentar realizar o login!");

        resposta.text().then(texto => {
            console.error(texto);
            // finalizarAguardar(texto);
        });
    }

}).catch(function (erro) {
    console.log(erro);
})

}

function variacaoCasosCidade(codigoCidade, idDoenca) {
  fetch(`/medidas/variacaoCasosCidade`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        cidadeServer: codigoCidade,
        doencaServer: idDoenca
    })
  })
    .then(function (resposta) {
      if (resposta.ok) {
        resposta.json().then((json) => {
          var variacao = document.getElementsByClassName("valor-caso")[idDoenca - 1];
          if(json[0].variacaoPercentual == null){
            variacao.innerHTML = `${0}`;
          } else{
            variacao.innerHTML = json[0].variacaoPercentual;
          }
        });
      } else {
        console.log("Houve um erro ao tentar calcular variação de casos");

        resposta.text().then((texto) => {
          console.error(texto);
          // finalizarAguardar(texto);
        });
      }
    })
    .catch(function (erro) {
      console.log(erro);
    });
}

async function gerarGraficoVacinaEstadoCidade(codigoCidade, idDoenca){
try{
  var respostaEstado = await fetch(`/medidas/gerarGraficoVacinaEstado/${idDoenca}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
      if (respostaEstado.ok) {
        const json = await respostaEstado.json();
          console.log(json);

          dados9 = [];
          dados11 = [];

          for (var i = 0; i < json.length; i++) {
            dados9.push(json[i].anoReferencia);
            dados11.push(json[i].coberturaEstado);
          }

          console.log(dados9);
          console.log(dados11);
      } else {
        console.log("Houve um erro ao tentar calcular variação vacinal");
        respostaEstado.text().then((texto) => {
          console.error(texto);
        });
      }

      var respostaCidade = await fetch(`/medidas/gerarGraficoVacinaCidade`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        cidadeServer: codigoCidade,
        doencaServer: idDoenca
    })
  });
      if (respostaCidade.ok) {
        const json = await respostaCidade.json();
          console.log(json);

          dados10 = [];

          for (var i = 0; i < json.length; i++) {
            dados10.push(json[i].coberturaCidade);
          }

          console.log(dados10);
      } else {
        console.log("Houve um erro ao tentar calcular variação vacinal");
        respostaCidade.text().then((texto) => {
          console.error(texto);
        });
      }

      if (idDoenca == 1) {
            myChart4.data.datasets[0].data = dados10;
            myChart4.data.datasets[1].data = dados11;
            myChart4.data.labels = dados9;
            myChart4.update();
          } else if (idDoenca == 2) {
            myChart8.data.datasets[0].data = dados10;
            myChart8.data.datasets[1].data = dados11;
            myChart8.data.labels = dados9;
            myChart8.update();
          } else {
            myChart12.data.datasets[0].data = dados10;
            myChart12.data.datasets[1].data = dados11;
            myChart12.data.labels = dados9;
            myChart12.update();
          }
  }
  catch (erro) {
    console.error("Erro na criação do gráfico:", erro);
  }
}

function variacaoCoberturaVacinalCidade(codigoCidade, idDoenca) {
  fetch(`/medidas/variacaoCoberturaVacinalCidade`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        cidadeServer: codigoCidade,
        doencaServer: idDoenca
    })
  })
    .then(function (resposta) {
      if (resposta.ok) {
        resposta.json().then((json) => {
          var variacao = document.getElementsByClassName("valor-vacina")[idDoenca - 1];
          if(json[0].variacaoPercentual == null){
            variacao.innerHTML = `${0}`;
          } else{
            variacao.innerHTML = json[0].variacaoPercentual;
          }
        });
      } else {
        console.log("Houve um erro ao tentar calcular variação vacinal");

        resposta.text().then((texto) => {
          console.error(texto);
          // finalizarAguardar(texto);
        });
      }
    })
    .catch(function (erro) {
      console.log(erro);
    });
}

async function gerarGraficoRankingMelhores(codigoCidade, idDoenca) {
  try{
    var respostaRanking = await fetch(`/medidas/graficoRankingMelhores/${idDoenca}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
      if (respostaRanking.ok) {
        const json = await respostaRanking.json();
          console.log(json);

          dados7 = [];
          dados8 = [];

          for (var i = 0; i < json.length; i++) {
            dados7.push(json[i].cidade);
            dados8.push(json[i].coberturaVacinal);
          }

          console.log(dados7);
          console.log(dados8);
      } else {
        console.log("Houve um erro ao tentar calcular variação vacinal");
        resposta.text().then((texto) => {
          console.error(texto);
        });
      }
    
    var respostaCobertura = await fetch(`/medidas/variacaoVacinadosCidade`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        cidadeServer: codigoCidade,
        doencaServer: idDoenca
    })
  });
      if (respostaCobertura.ok) {
        const json = await respostaCobertura.json();
          console.log(json);

          dados8.push(json[0].total_vacinados);

          console.log(dados7);
          console.log(dados8);
      } else {
        console.log("Houve um erro ao tentar calcular variação vacinal");
        resposta.text().then((texto) => {
          console.error(texto);
        });
      }

      if (idDoenca == 1) {
            myChart3.data.datasets[0].data = dados8;
            myChart3.data.labels = dados7;
            myChart3.update();
          } else if (idDoenca == 2) {
            myChar7.data.datasets[0].data = dados8;
            myChar7.data.labels = dados7;
            myChar7.update();
          } else {
            myChart11.data.datasets[0].data = dados8;
            myChart11.data.labels = dados7;
            myChart11.update();
          }
  }
  catch (erro) {
    console.error("Erro na criação do gráfico:", erro);
  }
}

function gerarGraficoCasosAnoCidade(codigoCidade, idDoenca) {
  fetch(`/medidas/graficoCasosAnoCidade`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        cidadeServer: codigoCidade,
        doencaServer: idDoenca
    })
  })
    .then(function (resposta) {
      if (resposta.ok) {
        resposta.json().then((json) => {
          console.log(json);

          dados2 = [];
          dados4 = [];

          for (var i = 0; i < json.length; i++) {
            dados2.push(json[i].anoReferencia);
            dados4.push(json[i].totalCasos);
          }

          console.log(dados2);
          console.log(dados4);

          if (idDoenca == 1) {
            myChart.data.datasets[0].data = dados4;
            myChart.data.labels = dados2;
            myChart.update();
          } else if (idDoenca == 2) {
            myChart5.data.datasets[0].data = dados4;
            myChart5.data.labels = dados2;
            myChart5.update();
          } else {
            myChart9.data.datasets[0].data = dados4;
            myChart9.data.labels = dados2;
            myChart9.update();
          }
        });
      } else {
        console.log("Houve um erro ao tentar calcular variação vacinal");

        resposta.text().then((texto) => {
          console.error(texto);
          // finalizarAguardar(texto);
        });
      }
    })
    .catch(function (erro) {
      console.log(erro);
    });
}

function gerarGraficoMetaVacinalCidade(codigoCidade, idDoenca) {
  fetch(`/medidas/variacaoVacinadosCidade`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        cidadeServer: codigoCidade,
        doencaServer: idDoenca
    })
  })
    .then(function (resposta) {
      if (resposta.ok) {
        resposta.json().then((json) => {
          console.log(json);
          var vacinados = json[0].total_vacinados;
          var naoVacinados = 100 - vacinados;
          dados1 = [vacinados, naoVacinados];

          if (idDoenca == 1) {
            myChart2.data.datasets[0].data = dados1;
            myChart2.update();
          } else if (idDoenca == 2) {
            myChart6.data.datasets[0].data = dados1;
            myChart6.update();
          } else {
            myChart10.data.datasets[0].data = dados1;
            myChart10.update();
          }
        });
      } else {
        console.log("Houve um erro ao tentar calcular variação vacinal");

        resposta.text().then((texto) => {
          console.error(texto);
          // finalizarAguardar(texto);
        });
      }
    })
    .catch(function (erro) {
      console.log(erro);
    });
}

function variacaoVacinadosCidade(codigoCidade, idDoenca) {
  fetch(`/medidas/variacaoVacinadosCidade`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        cidadeServer: codigoCidade,
        doencaServer: idDoenca
    })
  })
    .then(function (resposta) {
      if (resposta.ok) {
        resposta.json().then((json) => {
          var diferenca =
            document.getElementsByClassName("valor-vacinado")[idDoenca - 1];
          var vacinados = json[0].total_vacinados;
          var naoVacinados = (100 - vacinados).toFixed(2);
          diferenca.innerHTML = `${vacinados}% / ${naoVacinados}%`;
        });
      } else {
        console.log("Houve um erro ao tentar calcular variação vacinal");

        resposta.text().then((texto) => {
          console.error(texto);
          // finalizarAguardar(texto);
        });
      }
    })
    .catch(function (erro) {
      console.log(erro);
    });
}

function montarGraficoCidade(codigoCidade, idDoenca) {
  variacaoCoberturaVacinalCidade(codigoCidade, idDoenca);
  variacaoCasosCidade(codigoCidade, idDoenca);
  variacaoVacinadosCidade(codigoCidade, idDoenca);
  gerarGraficoMetaVacinalCidade(codigoCidade, idDoenca);
  gerarGraficoCasosAnoCidade(codigoCidade, idDoenca);
  gerarGraficoRankingMelhores(codigoCidade, idDoenca);
  gerarGraficoVacinaEstadoCidade(codigoCidade, idDoenca);
}