## Projeto Prático do B2

Estrutura criada por Thamily Silva Nogueira. 

Este projeto foi aplicado pelo professor de Construção de Software para Web da Universidade Vila Velha, que consistia em otimizar um gerador de números da megasena, de forma que evitasse a geração de números repetidos de forma desnecessária. 
O código utilizado era: 

```
function gerarAleatorios(quantidade){
  var vetor = [];
  var geracoes = [];

  while(vetor.length < quantidade){
    var aleatorio = Math.floor(Math.random()*60 + 1);
    geracoes.push(aleatorio);
    if(vetor.includes(aleatorio)){
      continue;
    }else{
      vetor.push(aleatorio);
    }
  }

  console.log("Gerações: ", geracoes);
  console.log("Finais: ", vetor);
}

function main(quantidade){
  console.time("timer");
  gerarAleatorios(quantidade);
  console.timeEnd("timer");
}

```


## Solução Proposta

O primeiro código consome muitos recursos computacionais porque gera números aleatórios sem se preocupar previamente em garantir que estes fossem únicos. Isto causa muitas repetições inúteis, devido ao fato de que números que já foram gerados terem que ser descartados e novos números precisarem ser gerados até preencher a quantidade desejada. Pode não parecer, mas isso abre um problema na questão da eficiência, especialmente porque:

1. Como dito anteriormente, o algoritmo continua gerando números aleatórios até que o número gerado seja único e isso se torna cada vez mais custoso à medida que a lista de números gerados se aproxima do limite do intervalo (ex.: 50 de 60).
2. Cada novo número gerado precisa ser verificado contra os números já existentes. Se isso fosse feito com arrays, por exemplo o processo teria complexidade O(n) por número, resultando em uma complexidade geral O(n²) no pior caso para verificar as repetições.
3. No geral, há muitas gerações e verificações repetidas para alcançar o resultado final, o que significa mais processamento desnecessário.

Portanto, precisamos de uma solução que solucione os problemas citados acima. Para isso, podemos usar uma abordagem baseada em marcação. A ideia é a seguinte:
1. Criar uma função que marque quais números já foram escolhidos.
2. Gerar números aleatórios dentro do intervalo de 1 a 60.
3. Garantir que os números escolhidos sejam únicos diretamente no momento de escolha.
   
Portanto, o a solução proposta para projetar essas necessidades é a seguinte: 
```
function gerarNumerosMegaSena(qtdNumeros) {
    if (qtdNumeros > 60 || qtdNumeros < 1) {
        console.log("A quantidade de números deve ser entre 1 e 60.");
        return;
    }

    let numerosMarcados = {};
    let numerosGerados = [];
    let tentativas = 0;

    while (numerosGerados.length < qtdNumeros) {
        let numeroAleatorio = Math.floor(Math.random() * 60) + 1;
        tentativas++;

        if (!numerosMarcados[numeroAleatorio]) {
            numerosMarcados[numeroAleatorio] = true;
            numerosGerados.push(numeroAleatorio);
        }
    }

    console.log(`Números gerados: ${numerosGerados.join(", ")}`);
    console.log(`Tentativas realizadas: ${tentativas}`);
    return numerosGerados;
}

// E, para medir o tempo de execução
console.time("Tempo da Mega-Sena");
gerarNumerosMegaSena(6);
console.timeEnd("Tempo da Mega-Sena");
```


## O quão eficiente é este código?

O código, nos testes, se mostra muito eficiente em comparação com o primeiro exemplo. O número do contador do console.time pode variar de navegador para navegador, mas eu utilizo o Microsoft Edge e os resultados se mostraram satisfatórios. O código otimizado resolve os problemas propostos pois:

1. Evita as repetições diretamente:
- O objeto de marcação (numerosMarcados) garante que a verificação de repetições é instantânea (O(1)).
- O que já elimina a necessidade de loops adicionais para verificar se o número gerado já existe.
  
2. Minimiza tentativas desnecessárias:
- Como o sistema marca números já usados, o número de tentativas extras diminui drasticamente.
  
3. Maior eficiência em cenários críticos:
- Ao pedir um grande número de valores do intervalo disponível (ex.: 50 números de 60), a nova abordagem ainda se mantém eficiente, enquanto a anterior perdia desempenho conforme se aproximava dos numeros finais de geração.

Após executar os dois códigos 20 vezes utilizando console.time e console.timeEnd e tirando uma média, os resultados médios foram:

- Tempo médio de execução do gerarAleatorios: 6.52 µs
- Tempo médio de execução do gerarNumerosMegaSena: 5.75 µs
- Otimização percentual: 11.88%

Esses dados confirmam que a função criada é cerca de 11.88% mais eficiente que a função original em termos de tempo de execução. Embora eu reconheça que usar sets e arrays possa otimizar muito mais os recursos computacionais gastos neste gerador de números aleatórios, o professor não chegou a aplicar o resultado utilizando destes recursos do javascipt, então o desafio estava em aplicar isso de formas alternativas, e o resultado mais eficiente que encontrei foi este.
