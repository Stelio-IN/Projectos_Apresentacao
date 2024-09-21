const mpesa = require('mpesa-node-api');

// Exemplo de uma transação C2B
mpesa.initiate_c2b(10, 258842156451, 'T12344C', 'ref1sdasdsadvcv')
    .then(function(response) {
        console.log("Resposta C2B:", response.output_ResponseDesc);
    })
    .catch(function(error) {
        console.error("Erro C2B:", error);
    });
