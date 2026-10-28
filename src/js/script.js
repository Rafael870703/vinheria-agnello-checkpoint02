

const ANO_ATUAL = new Date().getFullYear();
const LIMITE_ESTOQUE_BAIXO = 5;
const MAX_VINHOS = 5; 



function lerTexto(mensagem) {
  let entrada = prompt(mensagem);
  while (entrada !== null && entrada.trim() === "") {
    alert("Entrada inválida! O campo não pode ficar vazio.");
    entrada = prompt(mensagem);
  }
  return entrada === null ? null : entrada.trim();
}


function lerNumero(mensagem, minimo, maximo) {
  let entrada = prompt(mensagem);
  while (entrada !== null) {
    const numero = Number(entrada);
    if (entrada.trim() !== "" && Number.isInteger(numero) && numero >= minimo && numero <= maximo) {
      return numero;
    }
    alert("Valor inválido! Digite um número inteiro entre " + minimo + " e " + maximo + ".");
    entrada = prompt(mensagem);
  }
  return null;
}

function estoqueBaixo(quantidade) {
  return quantidade < LIMITE_ESTOQUE_BAIXO;
}


function classificarVinho(safra) {
  const idade = ANO_ATUAL - safra; 
  if (idade <= 3) {
    return "Jovem";
  } else if (idade <= 10) {
    return "Amadurecido";
  }
  return "Antigo";
}


function exibirVinho(numero, nome, safra, quantidade) {
  const classe = classificarVinho(safra);
  const alerta = estoqueBaixo(quantidade) ? " ⚠️ ESTOQUE BAIXO" : "";
  const texto = "Vinho " + numero + ": " + nome + " | Safra: " + safra +
                " | Estoque: " + quantidade + " | " + classe + alerta;
  console.log(texto);
  alert(texto);
}




let nome1 = "", safra1 = 0, quant1 = 0;
let nome2 = "", safra2 = 0, quant2 = 0;
let nome3 = "", safra3 = 0, quant3 = 0;
let nome4 = "", safra4 = 0, quant4 = 0;
let nome5 = "", safra5 = 0, quant5 = 0;

let contador = 0;         
let totalEstoqueBaixo = 0; 
let safraMaisAntiga = 0;   
let nomeMaisAntigo = "";   
let continuar = true;

while (continuar) {
  if (contador >= MAX_VINHOS) {
    alert("Limite de " + MAX_VINHOS + " vinhos atingido.");
    break;
  }

  const nome = lerTexto("Nome do vinho:");
  if (nome === null) break;
  const safra = lerNumero("Ano da safra (ex: 2018):", 1900, ANO_ATUAL);
  if (safra === null) break;
  const quantidade = lerNumero("Quantidade em estoque:", 0, 100000);
  if (quantidade === null) break;

  contador++;

 
  if (contador === 1) { nome1 = nome; safra1 = safra; quant1 = quantidade; }
  else if (contador === 2) { nome2 = nome; safra2 = safra; quant2 = quantidade; }
  else if (contador === 3) { nome3 = nome; safra3 = safra; quant3 = quantidade; }
  else if (contador === 4) { nome4 = nome; safra4 = safra; quant4 = quantidade; }
  else if (contador === 5) { nome5 = nome; safra5 = safra; quant5 = quantidade; }

 
  if (estoqueBaixo(quantidade)) {
    totalEstoqueBaixo++;
  }

  
  if (contador === 1 || safra < safraMaisAntiga) {
    safraMaisAntiga = safra;
    nomeMaisAntigo = nome;
  }

  exibirVinho(contador, nome, safra, quantidade);

  continuar = confirm("Deseja cadastrar outro vinho?");
}



if (contador === 0) {
  alert("Nenhum vinho foi cadastrado.");
  console.log("Nenhum vinho foi cadastrado.");
} else {
  console.log("===== VINHOS CADASTRADOS =====");
  if (contador >= 1) console.log(nome1 + " | " + safra1 + " | " + quant1);
  if (contador >= 2) console.log(nome2 + " | " + safra2 + " | " + quant2);
  if (contador >= 3) console.log(nome3 + " | " + safra3 + " | " + quant3);
  if (contador >= 4) console.log(nome4 + " | " + safra4 + " | " + quant4);
  if (contador >= 5) console.log(nome5 + " | " + safra5 + " | " + quant5);

  const resumo = "RESUMO FINAL\n" +
    "Cadastros feitos: " + contador + "\n" +
    "Vinhos com estoque baixo: " + totalEstoqueBaixo + "\n" +
    "Safra mais antiga: " + nomeMaisAntigo + " (" + safraMaisAntiga + ")";
  console.log(resumo);
  alert(resumo);
}
