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
        const operacoesAtivas = Object.keys(operacoes).filter(op => operacoes[op]);
        return operacoesAtivas[Math.floor(Math.random() * operacoesAtivas.length)];
    }

    [...document.querySelectorAll('.respostas > button')].forEach((respostaBtn) => {
        respostaBtn.addEventListener('click', (elemento) => {
            if(Number(elemento.currentTarget.innerText) == respostaCorreta){
                mostrarPergunta();
            }else{
                document.querySelector('.resultado > h1').innerHTML = "Tente novamente";
            }
        })
    })

    function mostrarPergunta() {
        const alcance = {...limites};
        document.querySelector('.resultado > h1').innerHTML = "&nbsp";
        const operacao = escolherOperacao();
        const num1 = gerarNumeroAleatorio(alcance.min, alcance.max);

        // para operações com menos, existem regras
        if (operacao == '-') {
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
        if (operacao == '/') {
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

        document.querySelector('.display').innerHTML = `${num1} ${operacao} ${num2}`;

        respostaCorreta = eval(`${num1}${operacao}${num2}`);

        // Primeiro gero duas resposta erradas
        let respostas = gerarRespostasErradas(respostaCorreta, 2, variacaoResposta);

        // Depois incluio a respost correta depois usar uma tecnica para misturar as resposta
        respostas = [...respostas, respostaCorreta].sort(() => Math.random() - 0.5)

        const respostasBtn = [...document.querySelectorAll('.respostas > button')];

        for (index in respostasBtn) {
            const respostaBtn = respostasBtn[index];
            respostaBtn.innerHTML = respostas[index]
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

    document.addEventListener('DOMContentLoaded', function() {
        mostrarPergunta();
    });
})();
