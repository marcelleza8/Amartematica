(() => {
  const limites = { min: 1, max: 10 };
  const operacoes = { "+": true, "-": true, "*": true, "/": true };
  const variacaoResposta = 3; // Variação para respostas alternativas
  const evitar_negativo = false; // null = sim, false = sim e zero, true = não
  let respostaCorreta = null;

  function gerarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function escolherOperacao() {
    const operacoesAtivas = Object.keys(operacoes).filter(
      (op) => operacoes[op]
    );
    return operacoesAtivas[Math.floor(Math.random() * operacoesAtivas.length)];
  }

  [...document.querySelectorAll(".respostas > button")].forEach(
    (respostaBtn) => {
      respostaBtn.addEventListener("click", (elemento) => {
        if (Number(elemento.currentTarget.innerText) == respostaCorreta) {
          mostrarPergunta();
        } else {
          document.querySelector(".resultado > h1").innerHTML =
            "Tente novamente";
        }
      });
    }
  );

  function mostrarPergunta() {
    const alcance = { ...limites };
    document.querySelector(".resultado > h1").innerHTML = `<a
              href="https://github.com/marcelleza8/amartematica"
              target="_blank"
              rel="noopener noreferrer"
              ><img
                alt=""
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADtklEQVR4nO2ZSWgVQRCGP2OCS3CJYoy7uCtiDi6o8aAIikvQi4oGvCiiRo2E6FXJQdxQg4LgUTx4cyPuHhVRD0bcsyDu4IJrTNTnSEMNPOfNm1czb2YSJD8UDNNT1fV3V1dX90AH/l8UAEuBfUAt8Bj4CLSKmOdH0ma+WQL0pp2gC1AGXAJ+A5ZPMToXgFViK3Z0AyqBVwGcTycvga1A17hILAAaQiTglHpgfpQEzNTXREjAKcdl5kNFf+BOjCQskVtAYVgkhst0W20kT8WHrNBP0qjVxtIAFAUl0bWNwsnyCLNAKfpoO3DecsjhICnWy+B2CbspwA7gWRbOmd1+G1As1cGBDN/P05LoptgnBruEoSH0A7gKVACzgNFAvsgYebcROAN8BTYDnR22ihWLXxVilYpRTLf75mlHy+PbAYr+zUB5oouy7Ah9o0pCkaL/F5lmpUwZ1+MiJFKi9GGll5FLSiPLIyRSrvThfDoDBT5K8eoIiRxT+vAL6OlmYKnSwGdZkFFhPPBT6Uupm4H9SmWT56PGSaUve92Ua5XK02Igskzpy1k35afKuMyNgchYJRFT0KbgvULRfBMHhiiJvHNTblUomm86xUBkoiMKPor8cfjT4qZsZ4rZUu+MAPoAA+XZljiIJCNXtoYC6dtUFYOSBjYFn6TxJnAXaJRQeiPPtqwgehz2iIrvScvAzFIKnkjjNUmxWyRPm4p1khw37VGJGjnS11BggmTKRVI575a7MPsIkIKL0rhLqsuDwCngOlAns/FBpnN1xLPRIqPdBDwAbgPngCNyFtrvVaZUKzOFkW8yU2FjncuC9pKdbkbm+jBgpBlYE1KomZJ8j08SRua4GeuuTMFOuSFryXnS0yBfBqMxQL8tXucie504xZxT1soGlM7wW+AEsEFGaiTQK8l2XznHmOvQKikvvgYgYImYkiotSj1SXomcwd8qw65KbihtFMq75iyct5JkYaa015RGsU7apwJfMpAwpNOhJAQy9eKLJyo8DJhcbpcQFyU07J84z4ErwOJMHQDrsyRSrr3duBckLn0gx6MPK4Pc9VOBzwQSLkYSIe4fGwKQSADT/XZ0JI2xT3KxNlgTpx4YFYBITZCO8qTu8tNRZ5/2/di+7PMC8B/09BnLfqG1+yCMP8DDgIdtSOS+nBhDQQ+pNOMmciWKf/F5UmInYiCSAA5FfdExWc4HURGpA2YQE3IlBTc4fvj7xeskfWNrU0zXTSnIkbLldFL54gelorswyz2pAx0gIvwFLXDNiM6zHVAAAAAASUVORK5CYII="
            /></a>
            <a
              href="https://www.linkedin.com/in/marcelleza/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                alt=""
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAByElEQVR4nO2ZP0/CQBjG22scXI2Tiauy+glc3MC4+iX8DA6G9IiDJsYBBhdNHJwcNRGIHY3xjoBCgkTEAUP8A63yt7ymBVQEIq2mvSb3JM/UN5fnd+97N1wFgYuLi4tpSTJdQTKJI5lqCFNwxDLVRExjkkyW/xRexAQ7FhoPt4hJ0P7OuxwedS2FSMAygDk2DIRHRhdkGrUOgInqdnDUs0wqNgAYCI6//G8AvkgazgsaaA0dlIIG8+G0twCUggbfFb/XvAWgNfQ+ALWuewtA8XoHfJG0CWF0IpZXYS584y0A5JIFDoA7OzFM43yf3b2G7YsSpEpVqDbb8FprmaO4dvoAk5sJtgEW9jLw+NaEUbosvsPMTopdgOxLHX5TLK+CxCrAuPIf5dgE0Ntgzv/S4S2sHucheqcOrdtPPrMJsK4U+2omQgk4yVUG6jJPNTYBpreTA+ssHmQH6sq1FnsA7R/fe57aSo5d63oH7K6FOADmHTDFRwjzQ0z5LYT4NWpRo24Otyx4+mkR07JlAON9noHgYFjE9MwygPFzwe3gqGsJX/ktA3S6QIJuhxcx2bAV/rMTIRIw3uedPRNENcbG9s5zcXFxCU7pA5Jwntel+S2tAAAAAElFTkSuQmCC"
              />
            </a>`;
    const operacao = escolherOperacao();
    const num1 = gerarNumeroAleatorio(alcance.min, alcance.max);

    // para operações com menos, existem regras
    if (operacao == "-") {
      if (evitar_negativo === null) {
        // sendo nulo não deve ser uma conta com resultado negativo
        alcance.max = num1;
        alcance.min = 0;
      } else if (evitar_negativo === false) {
        // se for false não deve ser negativo nem zero
        alcance.max = num1;
        alcance.min = 1;
      }
    }
    if (operacao == "/") {
      alcance.min = 1;
      if (evitar_negativo === null) {
        // sendo nulo não deve ser uma conta com resultado negativo
        alcance.max = num1;
        alcance.min = 0;
      } else if (evitar_negativo === false) {
        // se for false não deve ser negativo nem zero
        alcance.max = num1;
        alcance.min = 1;
      }
    }
    const num2 = gerarNumeroAleatorio(alcance.min, alcance.max);

    document.querySelector(
      ".display"
    ).innerHTML = `${num1} ${operacao} ${num2}`;

    respostaCorreta = eval(`${num1}${operacao}${num2}`);

    // Primeiro gero duas resposta erradas
    let respostas = gerarRespostasErradas(respostaCorreta, 2, variacaoResposta);

    // Depois incluio a respost correta depois usar uma tecnica para misturar as resposta
    respostas = [...respostas, respostaCorreta].sort(() => Math.random() - 0.5);

    const respostasBtn = [...document.querySelectorAll(".respostas > button")];

    for (index in respostasBtn) {
      const respostaBtn = respostasBtn[index];
      respostaBtn.innerHTML = respostas[index];
    }
  }

  function gerarRespostasErradas(respostaCorreta, numeroDeErros, variacao) {
    const respostasErradas = new Set();

    while (respostasErradas.size < numeroDeErros) {
      // Gera um erro que varia dentro do limite de 'variacao'
      let erro = Math.floor(Math.random() * (2 * variacao + 1)) - variacao;

      // Assegura que o erro não é zero (o que tornaria a resposta correta)
      if (erro === 0) continue;

      let respostaErrada = respostaCorreta + erro;

      // Adiciona a resposta errada ao conjunto, evitando duplicatas
      respostasErradas.add(respostaErrada);
    }

    return [...respostasErradas];
  }

  document.addEventListener("DOMContentLoaded", function () {
    mostrarPergunta();
  });
})();
