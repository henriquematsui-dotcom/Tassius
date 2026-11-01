import {
  auth,
  db,
  ref,
  set,
  onValue,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "./firebase.js";

const formLogin = document.getElementById("formLogin");
const emailLogin = document.getElementById("emailLogin");
const senhaLogin = document.getElementById("senhaLogin");
const mensagemLogin = document.getElementById("mensagemLogin");
const botaoCadastro = document.getElementById("botaoCadastro");
const nomeCadastro = document.getElementById("nomeCadastro");

// =========================
// CADASTRO
// =========================

// Criar uma nova conta
botaoCadastro.addEventListener("click", async () => {
  const nome = document.getElementById("nomeCadastro").value.trim();
  const email = emailLogin.value.trim();
  const senha = senhaLogin.value;

  if (!nome || !email || !senha) {
    mensagemLogin.textContent =
      "Digite seu nome, e-mail e senha para criar a conta.";
    return;
  }

  if (senha.length < 6) {
    mensagemLogin.textContent =
      "A senha precisa ter pelo menos 6 caracteres.";
    return;
  }

  mensagemLogin.textContent = "Criando sua conta...";

  try {
    const resultado = await createUserWithEmailAndPassword(
      auth,
      email,
      senha
    );

    const usuario = resultado.user;

    const usuarioRef = ref(db, "usuarios/" + usuario.uid);

    await set(usuarioRef, {
      nome: nome,
      email: email
    });

    mensagemLogin.textContent = "";
  } catch (erro) {
    if (erro.code === "auth/email-already-in-use") {
      mensagemLogin.textContent =
        "Esse e-mail já está cadastrado. Clique em Entrar.";
    } else if (erro.code === "auth/invalid-email") {
      mensagemLogin.textContent =
        "Digite um endereço de e-mail válido.";
    } else {
      mensagemLogin.textContent =
        "Não foi possível criar a conta. Confira os dados.";
      console.error(erro);
    }
  }
});

// =========================
// SAIR DA CONTA
// =========================

// Botão para sair da conta
const botaoSair = document.getElementById("botaoSair");

botaoSair.addEventListener("click", async () => {

  const playerRadio =
    document.querySelector("#radio audio");

  if (playerRadio) {
    playerRadio.pause();
  }

  try {
    await signOut(auth);
    mensagemLogin.textContent = "";
    senhaLogin.value = "";
  } catch (erro) {
    console.error("Erro ao sair:", erro);
    alert("Não foi possível sair da conta. Tente novamente.");
  }
});

// =========================
// AUTENTICAÇÃO
// =========================

// Entrar com e-mail e senha
formLogin.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  mensagemLogin.textContent = "Verificando acesso...";

  try {
    await signInWithEmailAndPassword(
      auth,
      emailLogin.value.trim(),
      senhaLogin.value
    );

    mensagemLogin.textContent = "";
  } catch (erro) {
    mensagemLogin.textContent =
      "Não foi possível entrar. Confira o e-mail e a senha.";
    console.error(erro);
  }
});