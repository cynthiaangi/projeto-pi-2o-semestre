function entrar(){
    var conselho = number.value;
    var senha = password.value;
    // var mensagem = document.getElementById("div_mensagem")


    if (conselho == "" || senha == "") {
        alert("Preencha seu número de conselho e senha para entrar");
        return false;
    } 

    console.log("FORM LOGIN: ", conselho);
    console.log("FORM SENHA: ", senha);

    fetch("/login/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            conselhoServer: conselho,
            senhaServer: senha
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                sessionStorage.CONSELHO_USUARIO = json.conselho;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_USUARIO = json.id;

                setTimeout(function () {
                    window.location = "./dashboard.html";
                }, 5000); // apenas para exibir o loading

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

    return false;
}