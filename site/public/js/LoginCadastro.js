// Selecionar o botão "Entrar" e adicionar o evento para alternar para o formulário de login
const signInButton = document.getElementById("signIn");
const signUpButton = document.getElementById("signUp");
const container = document.getElementById("container");

// Quando o botão "Entrar" for clicado, ativa a transição para a área de login
signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

// Quando o botão "Cadastrar" for clicado, ativa a transição para a área de cadastro
signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});