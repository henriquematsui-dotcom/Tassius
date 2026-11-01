const formulario =
  document.getElementById("formulario");

const entrada =
  document.getElementById("entrada");

const lista =
  document.getElementById("lista");

const mensagem =
  document.getElementById("mensagem");

/* =========================
   ADICIONAR TAREFA
========================= */

function adicionarTarefa(evento) {

  evento.preventDefault();

  const texto =
    entrada.value.trim();

  if (texto === "") {

    mensagem.textContent =
      "Digite uma tarefa válida.";

    entrada.focus();

    return;

  }

  const item =
    document.createElement("li");

  const nome =
    document.createElement("span");

  nome.textContent =
    texto;

  item.appendChild(nome);

  /* BOTÃO CONCLUIR */

  const concluir =
    document.createElement("button");

  concluir.textContent =
    "✓ Concluir";

  concluir.type =
    "button";

  concluir.className =
    "botao-concluir";

  concluir.addEventListener(
    "click",
    function () {

      item.classList.toggle(
        "concluida"
      );

      if (
        item.classList.contains("concluida")
      ) {

        concluir.textContent =
          "↩ Desfazer";

      } else {

        concluir.textContent =
          "✓ Concluir";

      }

      window.atualizarResumo();

    }
  );

  /* BOTÃO EXCLUIR */

  const excluir =
    document.createElement("button");

  excluir.textContent =
    "🗑 Excluir";

  excluir.type =
    "button";

  excluir.className =
    "botao-excluir";

  excluir.addEventListener(
    "click",
    function () {

      item.remove();

      window.atualizarResumo();

      mensagem.textContent =
        "Tarefa removida.";

    }
  );

  /* COLOCA OS BOTÕES */

  item.appendChild(concluir);

  item.appendChild(excluir);

  /* COLOCA NA LISTA */

  lista.appendChild(item);

  if (window.salvarTarefaFirebase) {
    window.salvarTarefaFirebase(texto);
  }

  /* LIMPA O CAMPO */

  entrada.value = "";

  mensagem.textContent =
    "Tarefa adicionada!";

  entrada.focus();

  window.atualizarResumo();
}
window.adicionarTarefa = adicionarTarefa;

formulario.addEventListener(
  "submit",
  adicionarTarefa
);