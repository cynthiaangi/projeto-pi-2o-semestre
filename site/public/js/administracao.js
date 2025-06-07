var idUsuario = sessionStorage.ID_USUARIO;
var nomeUser = sessionStorage.NOME_USUARIO;
var senhaUser = sessionStorage.SENHA_USUARIO;
var conselho = sessionStorage.CONSELHO_USUARIO;
var bemVinda = document.getElementById("nome_usuario");
bemVinda.innerHTML = `${nomeUser}`;
var idPerfil = 0;

window.onload = listarPerfil();

function listarPerfil() {
    var tabela = document.getElementsByClassName("tabela-perfil")[0];

    fetch("/administracao/listar")
        .then(function (resposta) {
            if (resposta.ok) {
                if (resposta.status == 204) {
                    var mensagem = document.createElement("span");
                    mensagem.innerHTML = "Nenhum resultado encontrado.";
                    tabela.appendChild(mensagem);
                    throw "Nenhum resultado encontrado!!";
                }

                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));
                    var titulo_instancia = document.createElement("tr");
                    var titulo_id = document.createElement("th");
                    var titulo_name = document.createElement("th");
                    var titulo_perfil = document.createElement("th");
                    var titulo_funcionario = document.createElement("th");
                    var titulo_campanha = document.createElement("th");
                    var titulo_button = document.createElement("th");

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
                        var instancia = document.createElement("tr");
                        var id = document.createElement("td");
                        var name = document.createElement("td");
                        var perfil = document.createElement("td");
                        var funcionario = document.createElement("td");
                        var campanha = document.createElement("td");
                        var button = document.createElement("td");

                        const perfilJSON = encodeURIComponent(JSON.stringify(resposta[i]));

                        valor_perfil = "Não";
                        valor_funcionario = "Não";
                        valor_campanha = "Não";

                        if (resposta[i].podeCadastrarPerfil == 1) {
                            valor_perfil = "Sim";
                        }

                        if (resposta[i].podeCadastrarFuncionario == 1) {
                            valor_funcionario = "Sim";
                        }

                        if (resposta[i].podeCadastrarCampanha == 1) {
                            valor_campanha = "Sim";
                        }

                        id.innerHTML = `${resposta[i].idPerfil}`;
                        name.innerHTML = `${resposta[i].nomePerfil}`;
                        perfil.innerHTML = `${valor_perfil}`;
                        funcionario.innerHTML = `${valor_funcionario}`;
                        campanha.innerHTML = `${valor_campanha}`;
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
                throw "Houve um erro na API!";
            }
        })
        .catch(function (resposta) {
            console.error(resposta);
        });
}

function fecharMensagem() {
    var bottomsheet = document.getElementsByClassName("mensagem")[0];
    var fundo = document.getElementsByClassName("area-mensagem")[0];

    bottomsheet.style.display = "none";
    fundo.style.display = "none";
}

function voltarHome() {
    window.location = "index.html";
}

function habilitarEdicao(perfil) {
    console.log(perfil);

    var bottomsheet = document.getElementsByClassName("mensagem")[0];
    var fundo = document.getElementsByClassName("area-mensagem")[0];

    bottomsheet.style.display = "flex";
    fundo.style.display = "flex";

    idPerfil = perfil.idPerfil;

    document.getElementById("edit_nome").value = perfil.nomePerfil;

}

function alterarPerfil() {
   var nome = edit_nome.value;
    var perfil = document.getElementById("edit_perfil");
    var funcionario = document.getElementById("edit_func");
    var campanha = document.getElementById("edit_campanha");
    var valor_perfil = 0;
    var valor_funcionario = 0;
    var valor_campanha = 0;
    var id = idPerfil;

    if (nome == "") {
        alert("Preencha o tipo de perfil para cadastrar");
    } else {
        console.log("passei nas validações");
        if (perfil.checked) {
            valor_perfil = 1;
        }

        if (funcionario.checked) {
            valor_funcionario = 1;
        }

        if (campanha.checked) {
            valor_campanha = 1;
        }

    fetch(`/administracao/alterar/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeServer: nome,
            perfilServer: valor_perfil,
            funcionarioServer: valor_funcionario,
            campanhaServer: valor_campanha
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                // cardErro.style.display = "block";

                alert(
                    "Perfil atualizado com sucesso! Atualizando lista de perfis"
                );
                // mensagem_erro.innerHTML = "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

                setTimeout(() => {
                    window.location.href = "administracao.html";
                }, "2000");

                //   finalizarAguardar();
            } else {
                throw alert("Houve um erro ao tentar atualizar perfil!");
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            // finalizarAguardar();
        });
    }
}

function excluir() {
    var id = idPerfil

    return fetch(`/administracao/excluir/${id}`, {
        method: "DELETE",
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                alert(
                    "Perfil excluído com sucesso! Atualizando lista de perfis."
                );

                setTimeout(() => {
                    window.location.href = "administracao.html";
                }, "2000");
            } else {
                throw alert("Houve um erro ao tentar excluir perfil!");
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function cadastrar() {
    console.log("estou no cadastro");
    var nome = ipt_nome.value;
    var perfil = document.getElementById("ipt_perfil");
    var funcionario = document.getElementById("ipt_func");
    var campanha = document.getElementById("ipt_campanha");
    var valor_perfil = 0;
    var valor_funcionario = 0;
    var valor_campanha = 0;

    if (nome == "") {
        alert("Preencha o tipo de perfil para cadastrar");
    } else {
        console.log("passei nas validações");
        if (perfil.checked) {
            valor_perfil = 1;
        }

        if (funcionario.checked) {
            valor_funcionario = 1;
        }

        if (campanha.checked) {
            valor_campanha = 1;
        }

        fetch("/administracao/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nomeServer: nome,
                perfilServer: valor_perfil,
                funcionarioServer: valor_funcionario,
                campanhaServer: valor_campanha
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    // cardErro.style.display = "block";

                    alert(
                        "Cadastro realizado com sucesso! Atualizando lista de perfis"
                    );
                    // mensagem_erro.innerHTML = "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

                    setTimeout(() => {
                        window.location.href = "administracao.html";
                    }, "2000");

                    //   finalizarAguardar();
                } else {
                    throw alert("Houve um erro ao tentar realizar o cadastro!");
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
                
            });

        return false;
    }
}
