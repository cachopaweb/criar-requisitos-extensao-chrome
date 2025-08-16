document.getElementById("extrair").addEventListener("click", () => {  
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { acao: "extrair" }, response => {
      alert("Resposta recebida:", response); // 👈 Veja se aparece algo aqui

      const container = document.getElementById("resultado");
      container.innerHTML = "";

      if (!response || !response.conversas) {
        container.innerHTML = "<em>Erro: nenhuma resposta recebida.</em>";
        console.error("Erro na resposta:", response);
        return;
      }

      response.conversas.forEach(c => {
        const div = document.createElement("div");
        div.className = "mensagem";
        div.innerHTML = `<strong>${c.usuario}</strong>: ${c.mensagem}<br><em>Classificação: ${c.classificacao}</em>`;
        container.appendChild(div);
      });
    });
  });
});