/****************************************************
 * AULA INTRODUTÓRIA NODE.JS
 ****************************************************/

/** objeto node*/
var antigo = {
    "nome": "hagamenon",
    "telefone": "123456",
    "cpf": "123456"
};

var novo = {
    "nome": "hagamenon nicolau"
};
/*array de objetos node*/ 
var pessoas = [
    {
        "nome": "nome1",
        "telefone": "123456",
        "cpf": "123456"
    },
    {
        "nome": "nome2",
        "telefone": "123456",
        "cpf": "123456"
    }
];

//console.log(funcao());

/** função assíncrona, ou seja, quando executado o setTimeout o primeiro parâmetro é uma função anônima (nao possui nome), e o segundo parâmetro é o tempo de espera.  é uma função assíncrona pq não se sabe o tempo de execução e quando irá retornar, assim enquanto espera-se o tempo de execução da função, o resto do codigo é executado*/
setTimeout(function(){
  //  console.log('função assíncrona terminou!');
}, 3000);
//console.log('executou o resto do código');



/**
 *  insere as configurações do custom-express, que tem: express e consign
 *         O consign integra os controllers, em um primeiro momento.
 */
var config = require('./config/custom-express');

/**
 *  cria uma instância do config dentro do app, assim permite criar a aplicação com o listener 
 *  e deixar a aplicação escutando a porta 3000
 */
var app = config();

app.listen(3000, function(){
    console.log('escutando a porta 3000');
})