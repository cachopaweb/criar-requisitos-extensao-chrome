function getTextoSelecionado() {
  const selection = window.getSelection();
  console.log(selection.toString())
  return selection ? selection.toString().trim() : "";
}

function classificarMensagem(mensagem) {
  const texto = mensagem.toLowerCase();
  if (texto.includes("o sistema") || texto.includes("o usuário") || texto.includes("deveria")) {
    return "RF";
  } else if (texto.includes("deve") || texto.includes("criar") || texto.includes("funcionalidade")) {
    return "RN";
  }
  return "Não classificado";
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  alert(request.acao)
  if (request.acao === "extrair") {
    const texto = getTextoSelecionado();
    alert('texto selecionado: '+texto)
    const linhas = texto.split("\n").map(l => l.trim()).filter(l => l.length > 0);

    const conversas = linhas.map(linha => ({
      usuario: "Selecionado",
      mensagem: linha,
      classificacao: classificarMensagem(linha)
    }));

    sendResponse({ conversas });
    return true; // 👈 IMPORTANTE para manter sendResponse assíncrono
  }
});