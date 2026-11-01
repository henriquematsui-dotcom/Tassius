import { radios } from "./radio.js";

const radioAtual = radios[0];

console.log("Rádio selecionada:", radioAtual.nome);

function selecionarRadio(indice) {
  const radio = radios[indice];

  console.log("Rádio escolhida:", radio.nome);
}

selecionarRadio(0);

console.log("Preparando seleção de rádios...");

const listaRadios =
  document.getElementById("listaRadios");

  const playerRadio =
  document.querySelector("#radio audio");

console.log("Player da rádio encontrado:", playerRadio);
  
const tituloRadio =
  document.createElement("p");

tituloRadio.textContent = "Escolha sua rádio";

listaRadios.appendChild(tituloRadio);

const seletorRadio =
  document.createElement("select");

radios.forEach(function (radio, indice) {

  const opcao =
    document.createElement("option");

  opcao.value = indice;
  opcao.textContent = radio.nome;

  seletorRadio.appendChild(opcao);

});

listaRadios.appendChild(seletorRadio);

seletorRadio.addEventListener(
  "change",
  function () {

    const indice = Number(seletorRadio.value);
    const radio = radios[indice];

    document.getElementById("nomeRadio").textContent =
      "📻 " + radio.nome;

    playerRadio.src = radio.url;
    playerRadio.play();

    selecionarRadio(indice);

  }
);