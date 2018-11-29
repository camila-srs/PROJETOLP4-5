/** module.exports:
 *      O module.exports é um objeto especial que é incluído em todos os arquivos JS no aplicativo Node.js por padrão. 
 *      module é uma variável que representa o módulo atual e as exportações são um objeto que será exposto como um módulo. 
 *      Então, o que você designar para module.exports, será exposto como um módulo.
 */
module.exports = function(app){
    
    app.get('/teste', function(request, response){
        console.log('retorna lista de teste');
        response.send('lista');
    });
    
    app.post('/teste', function(req, resp){
        console.log('teste criado');
        resp.send('criado');
    });
    
    app.put('/teste', function(req, resp){
        console.log('teste alterado');
        resp.send('alterado');
    });

    app.delete('/teste', function(req, resp){
        console.log('teste deletetado');
        resp.send('deletado');
    })
}