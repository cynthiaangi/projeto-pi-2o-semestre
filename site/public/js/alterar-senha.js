var idUsuario = sessionStorage.ID_USUARIO;
var nomeUser = sessionStorage.NOME_USUARIO;
var senhaUser = sessionStorage.SENHA_USUARIO;
var bemVinda = document.getElementById("nome_usuario");
bemVinda.innerHTML = `${nomeUser}`;

function voltarHome() {
    window.location = "index.html";
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
        method: "PUT",
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