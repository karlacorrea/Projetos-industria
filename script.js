/* =====================================
   SISTEMA DE CONTROLE DE PRODUÇÃO
===================================== */


/*
    Array que armazenará todas as
    produções cadastradas.

    Cada produção será armazenada
    como um objeto.
*/

let producoes = [];


/* =====================================
   SELECIONANDO ELEMENTOS DO HTML
===================================== */


/*
    Estamos usando document.getElementById()
    para encontrar elementos HTML pelo ID.
*/

const formulario = document.getElementById("formProducao");

const tabela = document.getElementById("tabelaProducao");

const btnLimpar = document.getElementById("btnLimpar");


/* Campos do formulário */

const produto = document.getElementById("produto");

const codigo = document.getElementById("codigo");

const quantidade = document.getElementById("quantidade");

const defeitos = document.getElementById("defeitos");

const operador = document.getElementById("operador");

const data = document.getElementById("data");


/* =====================================
   EVENTO DO FORMULÁRIO
===================================== */


/*
    O evento submit acontece quando
    o usuário clicar em "Cadastrar".
*/

formulario.addEventListener("submit", function(event) {

    /*
        Impede o comportamento padrão
        do formulário, que seria
        recarregar a página.
    */

    event.preventDefault();


    /* =================================
       VALIDAÇÃO
    ================================= */


    /*
        Verificamos se algum campo
        está vazio.
    */

    if (
        produto.value === "" ||
        codigo.value === "" ||
        quantidade.value === "" ||
        defeitos.value === "" ||
        operador.value === "" ||
        data.value === ""
    ) {

        alert("Preencha todos os campos!");

        return;

    }


    /* =================================
       CONVERSÃO DOS VALORES
    ================================= */


    /*
        Os valores dos inputs chegam
        como texto.

        Number() transforma o valor
        em número.
    */

    let quantidadeProduzida = Number(quantidade.value);

    let quantidadeDefeitos = Number(defeitos.value);


    /* =================================
       VALIDAÇÃO DOS DEFEITOS
    ================================= */


    /*
        Não podemos ter mais defeitos
        do que produtos produzidos.
    */

    if (quantidadeDefeitos > quantidadeProduzida) {

        alert(
            "A quantidade de defeitos não pode ser maior que a quantidade produzida!"
        );

        return;

    }


    /* =================================
       CÁLCULOS
    ================================= */


    /*
        Produtos aprovados =
        produtos produzidos - defeitos
    */

    let aprovados =
        quantidadeProduzida - quantidadeDefeitos;


    /*
        Calculamos o percentual
        de produtos defeituosos.
    */

    let percentualDefeitos =
        (quantidadeDefeitos / quantidadeProduzida) * 100;


    /*
        toFixed(2) limita o resultado
        a duas casas decimais.
    */

    percentualDefeitos =
        percentualDefeitos.toFixed(2);


    /* =================================
       CRIANDO O OBJETO
    ================================= */


    /*
        Criamos um objeto representando
        uma produção.
    */

    let novaProducao = {

        produto: produto.value,

        codigo: codigo.value,

        quantidade: quantidadeProduzida,

        defeitos: quantidadeDefeitos,

        aprovados: aprovados,

        percentual: percentualDefeitos,

        operador: operador.value,

        data: data.value

    };


    /* =================================
       ADICIONANDO AO ARRAY
    ================================= */


    /*
        push() adiciona um novo elemento
        ao final do array.
    */

    producoes.push(novaProducao);


    /* =================================
       ATUALIZANDO A TABELA
    ================================= */

    atualizarTabela();


    /* =================================
       ATUALIZANDO AS ESTATÍSTICAS
    ================================= */

    atualizarEstatisticas();


    /* =================================
       LIMPAR FORMULÁRIO
    ================================= */

    formulario.reset();


    /*
        Mensagem informando que o
        cadastro foi realizado.
    */

    alert("Produção cadastrada com sucesso!");

});


/* =====================================
   FUNÇÃO PARA ATUALIZAR A TABELA
===================================== */

function atualizarTabela() {

    /*
        Primeiro limpamos a tabela.
    */

    tabela.innerHTML = "";


    /*
        Percorremos todas as produções
        armazenadas no array.
    */

    producoes.forEach(function(producao, indice) {


        /*
            Criamos uma nova linha
            da tabela.
        */

        let linha = document.createElement("tr");


        /*
            innerHTML permite inserir
            conteúdo HTML dentro da linha.
        */

        linha.innerHTML = `

            <td>${producao.produto}</td>

            <td>${producao.codigo}</td>

            <td>${producao.quantidade}</td>

            <td>${producao.defeitos}</td>

            <td>${producao.aprovados}</td>

            <td>${producao.percentual}%</td>

            <td>${producao.operador}</td>

            <td>${producao.data}</td>

            <td>

                <button
                    class="btn-excluir"
                    onclick="excluirProducao(${indice})"
                >
                    Excluir
                </button>

            </td>

        `;


        /*
            Adicionamos a linha
            dentro do tbody.
        */

        tabela.appendChild(linha);

    });

}


/* =====================================
   FUNÇÃO PARA EXCLUIR PRODUÇÃO
===================================== */

function excluirProducao(indice) {


    /*
        splice() remove um elemento
        do array.

        indice indica qual elemento
        deverá ser removido.

        1 significa remover apenas
        um elemento.
    */

    producoes.splice(indice, 1);


    /*
        Atualizamos novamente
        a tabela.
    */

    atualizarTabela();


    /*
        Atualizamos as estatísticas.
    */

    atualizarEstatisticas();

}


/* =====================================
   FUNÇÃO DAS ESTATÍSTICAS
===================================== */

function atualizarEstatisticas() {


    /*
        Variáveis que irão armazenar
        os totais.
    */

    let totalProduzido = 0;

    let totalDefeitos = 0;

    let totalAprovado = 0;


    /*
        Percorremos todas as produções.
    */

    producoes.forEach(function(producao) {


        totalProduzido += producao.quantidade;

        totalDefeitos += producao.defeitos;

        totalAprovado += producao.aprovados;

    });


    /* =================================
       MOSTRANDO OS RESULTADOS
    ================================= */


    /*
        textContent altera o texto
        de um elemento HTML.
    */

    document.getElementById("totalProduzido").textContent =
        totalProduzido;


    document.getElementById("totalDefeitos").textContent =
        totalDefeitos;


    document.getElementById("totalAprovado").textContent =
        totalAprovado;


    document.getElementById("totalRegistros").textContent =
        producoes.length;

}


/* =====================================
   BOTÃO LIMPAR
===================================== */


/*
    Quando o usuário clicar no botão
    "Limpar", o formulário será resetado.
*/

btnLimpar.addEventListener("click", function() {

    formulario.reset();

});
