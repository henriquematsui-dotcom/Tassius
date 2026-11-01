const lista = document.getElementById("lista");
const resumo = document.getElementById("resumo");

/* =========================
   ATUALIZAR RESUMO
========================= */

function atualizarResumo() {

  let total = 0;

  let concluidas = 0;

  for (const item of lista.children) {

    total++;

    if (
      item.classList.contains("concluida")
    ) {

      concluidas++;

    }

  }

  resumo.textContent =
    "Total: " + total +
    " | Concluídas: " + concluidas;
}

export {
  atualizarResumo
};

window.atualizarResumo = atualizarResumo;