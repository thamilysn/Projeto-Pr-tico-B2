//Solução utilizada
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

// Cálculo utilizado para medir o tempo de exercução
console.time("Tempo da Mega-Sena");
gerarNumerosMegaSena(6);
console.timeEnd("Tempo da Mega-Sena");
