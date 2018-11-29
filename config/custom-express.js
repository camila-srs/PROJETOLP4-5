/*  custom-exress.js:
*      Responsável por ter a configuração da aplicação
*/

/** require: 
 *      é a forma de importar as dependências que foram instaladas pelo npm
 *      necessário que as dependências sejam instaldas pelo: 
 *      npm install --save nomeDependencia (o --save é para inserir no packge.json)
 */

/** express: 
 *     O Express é um framework para aplicativo da web do Node.js mínimo e flexível que fornece 
 *     um conjunto robusto de recursos para aplicativos REST.  Configuração de rotas, recursos HTTP*/
var express = require('express');

/** consign:
 *     O Consign facilita o desenvolvimento de aplicativos com separação lógica de arquivos e carregamento automático de scripts. 
 *     Consign pode ser usado para carregar automaticamente modelos, rotas, esquemas, configurações, controladores, mapas de objetos ... etc
*/
var consign = require('consign');

/** body-parser:
 *  Permite manipular corpos da requisição http disponível sob a propriedade req.body.
 *  Nota Como a forma do req.body é baseada na entrada controlada pelo usuário, todas as 
 *  propriedades e valores neste objeto não são confiáveis e devem ser validados.
 * 
 */
var bodyParse = require('body-parser');

module.exports = function(){
    var app = express();
    
    /**
     * configurar para que eu consiga manipular o body do http usando json
    */
    app.use(bodyParse.urlencoded({ extended: false }));
    app.use(bodyParse.json());

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost:8100");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
        next();
    });

    /**
     * arquitetura do projeto, temos:
     *  -controllers: aqui temos toda regra de negocio voltada para servir por meio das rotas e verbos http
     *  -persistencia: diretório que se encontra tudo relacionado com dao e banco
     */
    consign()
        .include('controllers')
        .then('persistencia')
        .then('services')
        .into(app);

    return app;
}