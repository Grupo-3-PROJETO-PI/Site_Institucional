function redirecionamento_login() {
    window.location.href = "../Cadastro_Login/login.html";
}

function redirecionamento_simulador() {
    window.location.href = '../Simulador_financeiro/Simulador.html'
}

function redirecionamento_contato() {
    window.location.href = './contato.html'
}

/*
    Script simulador
*/

/*placeholders baseados em médias:*/

/*criação de váriavies que conectam o JS com o HTML*/
const tamanho = document.getElementById("ipt_tamanho");
const clientes = document.getElementById("ipt_clientes");
const ticket = document.getElementById("ipt_ticket");
const dias = document.getElementById("ipt_dias");

/*função de flexa(arrow), que verifica se o select de default está clicado, se não 
  tem sugestão de valores baseados em cada tipo de select do 1 ao 3*/
tamanho.addEventListener("change", () => {
    const valor = tamanho.value;

    if (valor === "default") {
        clientes.placeholder = "Exp: 20";
        ticket.placeholder = "Exp: 150.00";
        dias.placeholder = "Exp: 28";
        return;
    }

    const sugestoes = {
        1: {
            clientes: "Média: 100 a 300",
            ticket: "Média: 20 a 50",
            dias: "Média: 26 a 30",
        },
        2: {
            clientes: "Média: 500 a 1500",
            ticket: "Média: 40 a 100",
            dias: "Média: 28 a 30",
        },
        3: {
            clientes: "Média: 2000+",
            ticket: "Média: 80 a 200",
            dias: "Média: 30",
        },
    };

    /*alocação dos valores*/
    clientes.placeholder = sugestoes[valor].clientes;
    ticket.placeholder = sugestoes[valor].ticket;
    dias.placeholder = sugestoes[valor].dias;
});

function calcular() {
    let clientes = Number(ipt_clientes.value);
    let ticket = Number(ipt_ticket.value);
    let dias = Number(ipt_dias.value);
    let conversaoAtual = Number(ipt_taxa.value);

    let tamanho = Number(ipt_tamanho.value);

    let sensores;
    let arduinos;
    let jumpers;
    let comissao = 0;

    // DEFINIÇÃO REAL POR PORTE
    if (tamanho == 1) {
        //  Mercado pequeno
        sensores = 3;
        arduinos = 1;
        jumpers = 15;

        comissao = 20;
    } else if (tamanho == 2) {
        //  Supermercado médio
        sensores = 8;
        arduinos = 2;
        jumpers = 40;

        comissao = 22;
    } else {
        //  Hipermercado grande
        sensores = 25;
        arduinos = 5;
        jumpers = 120;

        comissao = 25;
    }

    let custoSistema =
        (sensores * 55 + arduinos * 260 + jumpers * 2.5) * comissao;

    // MELHORIA
    let novaConversao = conversaoAtual + (100 - conversaoAtual) * 0.25;
    if (novaConversao > 100) novaConversao = 100;

    // RECEITAS
    let receitaMax = clientes * ticket * dias;
    let receitaAtual = receitaMax * (conversaoAtual / 100);
    let receitaNova = receitaMax * (novaConversao / 100);

    // PERDAS E GANHOS
    let perdaMes = receitaMax - receitaAtual;
    let perdaAno = perdaMes * 12;

    let ganho = receitaNova - receitaAtual;
    let ganhoAno = ganho * 12;

    let payback = ganho > 0 ? custoSistema / ganho : 0;

    // SEM SISTEMA
    resultadoSem.innerHTML = `

        <div class="res-content">
            <div class="res-left">
                <h2>Visão Geral</h2> <br>
                <p title="Taxa de Conversão Atual: Total de clientes / Total de clientes que compram algo.">
                    Conversão: <b>${conversaoAtual.toFixed(2)}%</b><br><br>
                </p>
                <p title="Clientes que frequentam seu mercado por dia.">
                    Clientes: <b>${clientes}</b><br><br>
                </p>
                <p title="Gasto em Reais Médio: Gasto Total / Clientes.">
                    Ticket: <b>R$${ticket.toFixed(2)}</b><br><br>
                </p>
                <p title="Total de dinheiro recebido no mês.">
                    Receita: <b>R$${receitaAtual.toFixed(2)}</b>  
                </p>
            </div>

            <div class="res-right">
                <h2>Perdas</h2> <br>
                
                    <p title="Perda de receita MENSAL baseada na Conversão de Venda (${conversaoAtual}%)">
                        Mensal:<br>
                    
                      <span style="color:red;" title="Perda de receita no mês baseada na Conversão de Venda (${conversaoAtual})">
                          <b>R$${perdaMes.toFixed(2)}</b><br>
                      </span><br>
                    </p>

                    <p title="Perda de receita ANUAL baseada na Conversão de Venda (${conversaoAtual}%)">
                      Anual:<br>

                      <span style="color:red;">
                          <b>R$${perdaAno.toFixed(2)}</b><br><br>
                      </span>
                    </p>

                    <p title="Investimento para instalação do projeto">
                      Investimento total:<br>

                      <b> ${custoSistema.toFixed(2)} </b>
                    </p>
            </div>
        </div>
    `;

    // COM SISTEMA
    if (payback < 1) {
        payback = payback * 30;

        resultadoCom.innerHTML = `

                    <div class="res-content">
                        <div class="res-left-2">
                            <h2>Impacto</h2> <br>
                              <p title="Taxa de Conversão Pós Implementação do projeto: Total de clientes / Total de clientes que compram algo.">
                                  Nova conversão:<br>
                                  <b>${novaConversao.toFixed(2)}%</b><br><br>
                              </p>

                              <p title="Total de dinheiro recebido no mês pós ganho com nova conversão (${novaConversao}%)">
                                  Nova receita:<br>
                                  <b>R$${receitaNova.toFixed(2)}</b>
                              </p>
                        </div>

                        <div class="res-right-2">
                            <h2>Retorno</h2> <br>
                            <p title="Ganho Após a implementação do projeto.">
                              Mensal:<br>
                              <span style="color:green;">
                                  <b>R$${ganho.toFixed(2)}</b>
                              </span><br><br>
                            </p>

                            <p title="Ganho ANUAL pós a implementação do projeto.">
                              Anual:<br>
                              <span style="color:green;">
                                  <b>R$${ganhoAno.toFixed(2)}</b>
                              </span><br><br>
                            </p>
                            <p title="Enquanto tempo o seu mercado demora para pagar o custo do projeto">
                              Payback:<br>
                              <b>Em ${Math.ceil(payback)} dias.
                            </p>
                        </div>
                    </div>
                 `;
    } else {
        resultadoCom.innerHTML = `

                    <div class="res-content">
                        <div class="res-left-2">
                            <h2>Impacto</h2> <br>
                            <p title="Taxa de Conversão Pós Implementação do projeto: Total de clientes / Total de clientes que compram algo.">
                                Nova conversão:<br>
                                <b>${novaConversao.toFixed(2)}%</b><br><br>
                            </p>

                            <p title="Total de dinheiro recebido no mês pós ganho com nova conversão (${novaConversao}%)">
                                Nova receita:<br>
                                <b>R$${receitaNova.toFixed(2)}</b>
                            </p>
                        </div>

                        <div class="res-right-2">
                            <h2>Retorno</h2> <br>
                            <p title="Ganho Após a implementação do projeto.">
                                Mensal:<br>
                                <span style="color:green;">
                                    <b>R$${ganho.toFixed(2)}</b>
                                </span><br><br>
                            </p>

                            <p title="Ganho ANUAL pós a implementação do projeto.">
                                Anual:<br>
                                <span style="color:green;">
                                    <b>R$${ganhoAno.toFixed(2)}</b>
                                </span><br><br>
                            </p>    

                            <p title="Enquanto tempo o seu mercado demora para pagar o custo do projeto">
                                Payback:<br>
                                <b>Em ${payback.toFixed(1)} meses.
                            </p>
                        </div>
                    </div>
                 `;
    }

    /*if de confirmação de preenchimento dos campos:*/

    if (
        clientes == "0" ||
        dias == "0" ||
        ticket == "0" ||
        tamanho == "Default"
    ) {
        alert("Preencha todos os campos corretamente!");
        resultadoSem.innerHTML = ``;
        resultadoCom.innerHTML = ``;
    }
}