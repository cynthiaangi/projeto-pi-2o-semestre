var idUsuario = sessionStorage.ID_USUARIO;
var nomeUser = sessionStorage.NOME_USUARIO;
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
            data: [75, 100 - 75],
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
            data: [75, 100 - 75],
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
            labels: ['2018', '2019', '2020', '2021', '2022'],
            datasets: [{
                label: 'Coqueluche',
                data: ['100', '400', '342', '298', '792'],
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
            labels: ['2018', '2019', '2020', '2021', '2022'],
            datasets: [{
                label: 'Meningite',
                data: ['100', '400', '342', '298', '792'],
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
            labels: ['2018', '2019', '2020', '2021', '2022'],
            datasets: [{
                label: 'Poliomielite',
                data: ['100', '400', '342', '298', '792'],
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
        labels: ['Sorocaba', 'Franca', 'Itapetininga', 'Guarujá', 'Jaú', 'Barretos'],
        datasets: [{
            data: ['87', '83', '81', '78', '72', '66'],
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
        labels: ['Sorocaba', 'Franca', 'Itapetininga', 'Guarujá', 'Jaú', 'Barretos'],
        datasets: [{
            data: ['87', '83', '81', '78', '72', '66'],
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
        labels: ['Sorocaba', 'Franca', 'Itapetininga', 'Guarujá', 'Jaú', 'Barretos'],
        datasets: [{
            data: ['87', '83', '81', '78', '72', '66'],
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
        labels: ['2018', '2019', '2020', '2021', '2022'],
        datasets: [{
            label: 'Cidade',
            data: [15, 85, 5, 80, 20],
            borderWidth: 1,
            borderColor: '#0A4D68',
            backgroundColor: '#0A4D68'
        },
        {
            label: 'Estado',
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
        labels: ['2018', '2019', '2020', '2021', '2022'],
        datasets: [{
            label: 'Cidade',
            data: [25, 15, 10, 8, 24],
            borderWidth: 1,
            borderColor: '#0A4D68',
            backgroundColor: '#0A4D68'
        },
        {
            label: 'Estado',
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
        labels: ['2018', '2019', '2020', '2021', '2022'],
        datasets: [{
            label: 'Cidade',
            data: [45, 15, 50, 68, 79],
            borderWidth: 1,
            borderColor: '#0A4D68',
            backgroundColor: '#0A4D68'
        },
        {
            label: 'Estado',
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

function alterarDoenca() {
    var doenca = doencaSelect.value;
    var coqueluche = document.getElementsByClassName('coqueluche');
    var meningite = document.getElementsByClassName('meningite');
    var poliomielite = document.getElementsByClassName('poliomielite');
    console.log(doenca);

    if (doenca == 'Coqueluche') {
        for (var i = 0; i < coqueluche.length; i++) {
            coqueluche[i].style.display = 'flex';
            meningite[i].style.display = 'none';
            poliomielite[i].style.display = 'none';
        }
    } else if (doenca == 'Meningite') {
        for (var j = 0; j < meningite.length; j++) {
            coqueluche[j].style.display = 'none';
            meningite[j].style.display = 'flex';
            poliomielite[j].style.display = 'none';
        }
    } else {
        for (var k = 0; k < poliomielite.length; k++) {
            coqueluche[k].style.display = 'none';
            meningite[k].style.display = 'none';
            poliomielite[k].style.display = 'flex';
        }
    }

}