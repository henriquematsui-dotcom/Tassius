import {
  auth,
  db,
  ref,
  push,
  set,
  onValue
} from "./firebase.js";

window.salvarTarefaFirebase = async function(texto) {
  const usuario = auth.currentUser;

  if (!usuario) {
    console.log("Nenhum usuário conectado.");
    return;
  }

  const tarefasRef = ref(db, "tarefas/" + usuario.uid);
  const novaTarefaRef = push(tarefasRef);

  await set(novaTarefaRef, {
    texto: texto,
    concluida: false,
    criadaEm: Date.now()
  });

  console.log("Tarefa salva no Firebase!");
};

window.carregarTarefasFirebase = function() {
  const usuario = auth.currentUser;

  if (!usuario) {
    console.log("Nenhum usuário conectado para carregar tarefas.");
    return;
  }

  const tarefasRef = ref(db, "tarefas/" + usuario.uid);

  onValue(tarefasRef, (snapshot) => {
    lista.innerHTML = "";

    const tarefas = snapshot.val();

    if (tarefas) {
      Object.entries(tarefas).forEach(([id, tarefa]) => {
        const item = document.createElement("li");
        const nome = document.createElement("span");

        nome.textContent = tarefa.texto;
        item.appendChild(nome);

        const concluir = document.createElement("button");

        concluir.textContent = tarefa.concluida
          ? "↩ Desfazer"
          : "✓ Concluir";

        concluir.type = "button";
        concluir.className = "botao-concluir";

        if (tarefa.concluida) {
          item.classList.add("concluida");
        }

        concluir.addEventListener("click", async function () {
          const tarefaRef = ref(
            db,
            "tarefas/" + usuario.uid + "/" + id
          );

          await set(tarefaRef, {
            ...tarefa,
            concluida: !tarefa.concluida
          });
        });

        item.appendChild(concluir);

        const excluir = document.createElement("button");

        excluir.textContent = "🗑 Excluir";
        excluir.type = "button";
        excluir.className = "botao-excluir";

        excluir.addEventListener("click", async function () {
          const tarefaRef = ref(
            db,
            "tarefas/" + usuario.uid + "/" + id
          );

          await set(tarefaRef, null);
        });

        item.appendChild(excluir);
        lista.appendChild(item);
      });
    }

    atualizarResumo();
  });
};