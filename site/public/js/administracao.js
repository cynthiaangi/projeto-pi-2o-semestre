var idUsuario = sessionStorage.ID_USUARIO;
var nomeUser = sessionStorage.NOME_USUARIO;
var senhaUser = sessionStorage.SENHA_USUARIO;
var conselho = sessionStorage.CONSELHO_USUARIO;
var bemVinda = document.getElementById("nome_usuario");
bemVinda.innerHTML = `${nomeUser}`;
var idFuncionario = 0;

window.onload = listarPerfil();

function listarPerfil() {
    var tabela = document.getElementsByClassName("tabela-perfil")[0];

    fetch("/administracao/listar").then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                var mensagem = document.createElement("span");
                mensagem.innerHTML = "Nenhum resultado encontrado."
                tabela.appendChild(mensagem);
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                var titulo_instancia = document.createElement('tr');
                var titulo_id = document.createElement('th');
                var titulo_name = document.createElement('th');
                var titulo_perfil = document.createElement('th');
                var titulo_funcionario = document.createElement('th');
                var titulo_campanha = document.createElement('th');
                var titulo_button = document.createElement('th');

                titulo_id.innerHTML = "ID Perfil";
                titulo_name.innerHTML = "Tipo Perfil";
                titulo_perfil.innerHTML = "Criar perfil";
                titulo_funcionario.innerHTML = "Cadastrar funcionários";
                titulo_campanha.innerHTML = "Cadastrar campanhas";
                titulo_button.innerHTML = "Edição";

                titulo_instancia.appendChild(titulo_id);
                titulo_instancia.appendChild(titulo_name);
                titulo_instancia.appendChild(titulo_perfil);
                titulo_instancia.appendChild(titulo_funcionario);
                titulo_instancia.appendChild(titulo_campanha);
                titulo_instancia.appendChild(titulo_button);
                tabela.appendChild(titulo_instancia);

                for (let i = 0; i < resposta.length; i++) {
                        var instancia = document.createElement('tr');
                        var id = document.createElement('td');
                        var name = document.createElement('td');
                        var perfil = document.createElement('td');
                        var funcionario = document.createElement('td');
                        var campanha = document.createElement('td');
                        var button = document.createElement('td');
                        
                        const perfilJSON = encodeURIComponent(JSON.stringify(resposta[i]));


                        id.innerHTML = `${resposta[i].idPerfil}`;
                        name.innerHTML = `${resposta[i].nomePerfil}`;
                        perfil.innerHTML = `${resposta[i].podeCadastrarPerfil}`;
                        funcionario.innerHTML = `${resposta[i].podeCadastrarFuncionario}`;
                        campanha.innerHTML = `${resposta[i].podeCriarCampanha}`;
                        button.innerHTML = `<button onclick="habilitarEdicao(JSON.parse(decodeURIComponent('${perfilJSON}')))">Editar</button>`;

                        instancia.appendChild(id);
                        instancia.appendChild(name);
                        instancia.appendChild(perfil);
                        instancia.appendChild(funcionario);
                        instancia.appendChild(campanha);
                        instancia.appendChild(button);
                        tabela.appendChild(instancia);

                }
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

function cadastrarFuncionarios() {
    var areaCadastro = document.getElementsByClassName('cadastro')[0];

    areaCadastro.style.display = 'flex';
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

function acessarGerenciamento(){
    window.location = 'gerenciamento.html';
}

function acessarConta(){
    window.location = 'conta.html';
}

function acessarDashboard(){
    if(conselho.length == 4){
        window.location = 'dashboard.html';
    } else {
        window.location = 'dash-medico.html';
    }
}

function mostrarFuncionarios() {
    var areaCadastro = document.getElementsByClassName('cadastro')[0];

    areaCadastro.style.display = 'none';

    listarFuncionarios();
}

function habilitarMudaSenha() {
    var areaCadastro = document.getElementsByClassName('mensagem')[0];
    var alteraSenha = document.getElementsByClassName('altera-senha')[0];

    areaCadastro.style.display = 'none';
    alteraSenha.style.display = 'flex';
}

function habilitarEdicao(funcionario) {
    console.log(funcionario);

    var bottomsheet = document.getElementsByClassName('mensagem')[0];
    var fundo = document.getElementsByClassName('area-mensagem')[0];

    bottomsheet.style.display = 'flex';
    fundo.style.display = 'flex';

    var cidade_funcionario = "";

    for (let j = 0; j < cidadesSP.length; j++) {
        if (codigosCidade[j] == funcionario.fkCidadeResidente) {
            cidade_funcionario = cidadesSP[j];
        }
    }

    idFuncionario = funcionario.idUsuario;

    document.getElementById("ipt_nome").value = funcionario.nomeCompleto;
    document.getElementById("ipt_number").value = funcionario.numConselho;

    const selCargo = document.getElementById("sel_cargo");
    for (let opcao of selCargo.options) {
        if (opcao.value == funcionario.cargoExercido) {
            opcao.selected = true;
            break;
        }
    }

    const selCidade = document.getElementById("sel_cidade");
    for (let option of selCidade.options) {
        if (option.value === cidade_funcionario) {
            option.selected = true;
            break;
        }
    }

}

function alterarFuncionario() {
    var nome = document.getElementById("ipt_nome").value;
    var cidadeAtuante = document.getElementById("sel_cidade").value;
    var codigoCidade = 0;
    var cargo = document.getElementById("sel_cargo").value;
    var conselho = document.getElementById("ipt_number").value;
    var id = idFuncionario;


    for (let k = 0; k < cidadesSP.length; k++) {
        if (cidadesSP[k] == cidadeAtuante) {
            codigoCidade = codigosCidade[k];
        }
    }

    fetch(`/funcionarios/alterar/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeServer: nome,
            cargoServer: cargo,
            conselhoServer: conselho,
            cidadeServer: codigoCidade

        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                // cardErro.style.display = "block";

                alert("Funcionário atualizado com sucesso! Atualizando lista de funcionários");
                // mensagem_erro.innerHTML = "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

                setTimeout(() => {
                    window.location.href = "gerenciamento.html";
                }, "2000");

                //   finalizarAguardar();
            } else {
                throw alert("Houve um erro ao tentar realizar o cadastro!");
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            // finalizarAguardar();
        });

}

function excluir() {
    var id = idFuncionario;

    return fetch(`/funcionarios/excluir/${id}`, {
                    method: "DELETE",

                })
                    .then(function (resposta) {
                        console.log("resposta: ", resposta);

                        if (resposta.ok) {

                            alert("Funcionário excluído com sucesso! Atualizando lista de funcionários.");

                            setTimeout(() => {
                                window.location.href = "gerenciamento.html";
                            }, "2000");


                        } else {
                            throw alert("Houve um erro ao tentar excluir funcionário!");
                        }
                    })
                    .catch(function (resposta) {
                        console.log(`#ERRO: ${resposta}`);

                    });

}

function cadastrar() {
    console.log("estou no cadastro");
    var nome = ipt_nome_cadastro.value;
    var cargo = sel_cargo_cadastro.value;
    var dataNasc = ipt_data_cadastro.value;
    var conselho = ipt_number_cadastro.value;
    var cidadeAtuante = sel_cidade_cadastro.value;
    var codigoCidade = 0;
    var senhaPadrao = `${conselho}@Immuno`;

    var num_conselho = parseInt(conselho);
    var tam_nome = nome.length;
    var tam_conselho = conselho.length;

    if (nome == "" || cargo == cargos[0] || conselho == "" || cidadeAtuante == cidadesSP[0] || dataNasc == '') {
        alert("Todos os campos devem ser preenchidos");
    } else if (conselho != num_conselho || tam_conselho < 3) {
        alert("O número de conselho deve conter apenas números, com pelo menos 3 digitos");
    } else if (tam_nome < 3) {
        alert("Digite um nome válido")
    } else {
        console.log('passei nas validações')
        for (let k = 0; k < cidadesSP.length; k++) {
            if (cidadesSP[k] == cidadeAtuante) {
                codigoCidade = codigosCidade[k];
            }
        }
        console.log(codigoCidade);
        fetch("/login/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                nomeServer: nome,
                dtNascServer: dataNasc,
                cargoServer: cargo,
                conselhoServer: conselho,
                cidadeServer: codigoCidade,
                senhaServer: senhaPadrao,

            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    // cardErro.style.display = "block";

                    alert("Cadastro realizado com sucesso! Atualizando lista de funcionários");
                    // mensagem_erro.innerHTML = "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

                    setTimeout(() => {
                        window.location.href = "gerenciamento.html";
                    }, "2000");

                    //   finalizarAguardar();
                } else {
                    throw alert("Houve um erro ao tentar realizar o cadastro!");
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
                // finalizarAguardar();
            });

        return false;
    }
}

function alterarSenha() {
    var senhaPadrao = ipt_senha.value;
    var senhaNova = ipt_nova.value;

    var tam_senha = senhaNova.length;
    var maiuscula_senha = senhaNova.toUpperCase();
    var minuscula_senha = senhaNova.toLowerCase();
    var especial = "!@#$%&*";
    var senhaOk = 0;

    if (senhaNova == "" || senhaPadrao == "") {
        alert("Todos os campos devem ser preenchidos");
        return;
    } else if(senhaPadrao != senhaUser){
        alert("A senha padrão não está correta, digite a mesma senha que usou para acessar.")
        return;
    } else if (tam_senha < 8) {
        alert("A senha deve conter no mínimo 8 caracteres");
        return;
    } else if (senhaNova == maiuscula_senha || senhaNova == minuscula_senha) {
        alert("A senha deve conter no mínimo uma letra maiúscula e uma letra minúscula");
        return;
    } else {
        for (let i = 0; i < tam_senha; i++) {
            if (especial.includes(senhaNova[i])) {
                senhaOk++;
                break;
            }
        }
        for (let j = 0; j < tam_senha; j++) {
            if (Number(senhaNova[j]) != NaN) {
                senhaOk++;
                break;
            }
        }
        if (senhaOk != 2) {
            alert("A senha deve conter pelo menos 1 número e 1 caractere especial (!@#$%&*)");
            return;
        } else {
            fetch(`/funcionarios/alterarSenha/${idUsuario}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            senhaServer: senhaNova,
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                // cardErro.style.display = "block";

                alert("Senha atualizada com sucesso! Encaminhando para sua página");
                // mensagem_erro.innerHTML = "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

                setTimeout(() => {
                    window.location.href = "dash-medico.html";
                }, "2000");

                //   finalizarAguardar();
            } else {
                throw alert("Houve um erro ao tentar atualizar a senha!");
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            // finalizarAguardar();
        });

        }
    }
}