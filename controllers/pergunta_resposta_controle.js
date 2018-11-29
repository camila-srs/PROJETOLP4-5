/** module.exports:
 *      O module.exports é um objeto especial que é incluído em todos os arquivos JS no aplicativo Node.js por padrão. 
 *      module é uma variável que representa o módulo atual e as exportações são um objeto que será exposto como um módulo. 
 *      Então, o que você designar para module.exports, será exposto como um módulo.
 */
module.exports = function(app){
 
    /** GET /usuario
     *  rota que obtém lista de usuários (find all)
     */
    app.get('/pergunta_resposta', function(req, resp){
        var con = app.persistencia.connectionFactory;
        var dao = new app.persistencia.pergunta_respostaDao(con);
        
        dao.findAll(function(exception, result){
            if(exception){
                resp.status(500);
                resp.send({"message":"Error inesperado"});
                return;
            }

            if(result.length == 0){
                resp.status(404);
                resp.send({"message":"pergunta  não encontrada !!"});
                return;
            }
            

            /**
             * exceção genérica
             */
            if(exception){
                resp.status(500);
                resp.send({"mensagem":"erro ao buscar pergunta !!"});
                console.log(exception);
                return;
            }

            var service = new app.services.pergunta_respostaService();
            var dados = service.voltarJson(result);

            
            resp.status(200);
            resp.send(dados);
        });
    });

    /** GET /usuario:id
     *  rota que obtém um único usuário pelo id passado por parâmetro (find by id)
     *  quando queremos definir um parâmetro definimos :id, assim, o que vier na rota /usuario/2 o 2 é o id de um usuário
     */
    app.get('/pergunta_resposta/:id', function(req, resp){
        data = req.params;
        var con = app.persistencia.connectionFactory;
        var dao = new app.persistencia.pergunta_respostaDao(con);

        /**
         * função assíncrona para obter o usuário pelo id
         */

        dao.findById(data.id, function(exception, result){
            
            /** 
             * tratamento se result vier vazio, quer dizer que não foi encontrado 
             *  nenhum usuário, assim retorna 404, código http para não encontrado
            */
            if(result.length == 0){
                resp.status(404);
                resp.send({"message":"pergunta não encontrada !!"});
                return;
            }

            /**
             * exceção genérica
             */
            if(exception){
                resp.status(500);
                resp.send({"mensagem":"erro ao buscar pergunta !!"});
                console.log(exception);
                return;
            }

            /**
             * se usuário é encontrado, retorna a posição 0, pq como buscamos pelo id, deve ter apenas um usuário
             */
            //resp.send(result[0]);
            var service = new app.services.pergunta_respostaService();
            var dados = service.voltarJson(result);

            
            resp.status(200);
            resp.send(dados[0]);
        });
        
    });
    
    /** POST /usuario 
     *  rota que permite criar um novo usuário
    */
    app.post('/pergunta_resposta', function(req, resp){
        /**Propriedade que permite manipular o body da requisição */
        var  data = req.body;

        /**objetos quer me permite conectar no banco e maninpular as operações */
        var con = app.persistencia.connectionFactory;
        var dao = new app.persistencia.pergunta_respostaDao(con);

        /**
         * valida se os dados estão corretos conforme regra de negócio
         */
        var service = new app.services.pergunta_respostaService();
        
        response = service.validarFinal(data);
        if(!response.status){
            resp.status(400);
            resp.json({"message": response.message});   
          return;
        }else{
            data.respostas = JSON.stringify(data.respostas);
        }

     
        /**função assíncrona, como não sabemos quanto tempo irá demorar a conexão com banco. 
         * É importante que as operações sejam assíncronas. O quer dizer que a função create
         * será realizada, porém não será aguardado um retorno, as rotinas irão continuar sem 
         * um retorno de create, por isto tempos a função anônima passada no segundo parâmetro 
         * que é responsável por manipular o retorno da fução assíncrona. 
         */
        data.deletado = 0;
        //data.respostas = JSON.stringify(data.respostas);
        dao.create(data, function(exception, result){
           
            if(exception){

                /**
                 * verifica se a exceção é de chave única duplicada, no qual email se enquadra 
                 * na exceção
                 */
                if(exception.code === 'ER_DUP_ENTRY'){
                    resp.status(400);
                    resp.send({"mensagem":"pergunta já cadastrada"});
                    return;
                }
                /**
                 * error genéricos
                 */
                resp.status(500);
                resp.send({"mensagem":"erro ao salvar pergunta"+" ta dando erro aqui"});
                console.log(exception);
                return;
            }

            /**
             * sucesso no cadastro
             */
           resp.status(201);
           resp.send(data);
        });
    });
    
    /** PUT /usuario 
     *  rota que permite alterar um usuário pelo id
    */
    app.put('/pergunta_resposta/:id', function(req, resp){

        /**
         * o put temos tanto o parâmetro que é o id do usuário, quanto elementos no corpo da requisição com os dados novos
         */
        param = req.params;
      var novo = req.body;

        var con = app.persistencia.connectionFactory;
        var dao = new app.persistencia.pergunta_respostaDao(con);
      
        var ax = new app.services.pergunta_respostaService();
        
        var ax2 = ax.validarFinal(novo);
         
        /**
         * primeiro passo na alteraçaõ do usuário é buscar o usuário pelo id
         */
        dao.findById(param.id, function(exception, result){

            /**
             * verifica se houve alguma exception, se houver, retorna 500, código http para erro
             */
            if(exception){
                resp.status(500);
                resp.send({"mensagem":"erro ao salvar pergunta"});
                console.log(exception);
                return;
            }
            /**
             * se result vazio mensagem de usuário não encontrado junto com código http 404
             */
            if(result.length == 0){
                resp.status(404);
                resp.send({"message":"pergunta não encontrada"});
                return;
            }

            console.log(ax2);

            if(!ax2.status){
                resp.status(400);
                resp.json({"message": ax2.message});
                return;
            }

            result[0].respostas = JSON.stringify(novo.respostas);
           
            console.log(result);
          //  validar = service.validarFinal(novo);
            /**
             * dados do usuário são alterados, observação: a partir do usuário já registrado no banco, antigo, alteramos
             * os atributos que vieram na request (novo), desta forma, garantimos que um usuário existente está sendo alterado
             */
            antigo = result[0];
            antigo.pergunta = novo.pergunta;
            antigo.categoria = novo.categoria;


            /**
             * Passo 2, alteramos os dados do usuário por meio de uma função assíncrona de update no banco
             */
            dao.update(param.id, antigo, function(exception, result){

                /**
                 * verifica se a exceção é de chave única duplicada, no qual email se enquadra 
                 * na exceção
                 */
                if(exception){
                    if(exception.code === 'ER_DUP_ENTRY'){
                        resp.status(400);
                        resp.send({"mensagem":"pergunta já cadastrada"});
                        return;
                    }

                    resp.status(500);
                    resp.send({"mensagem":"erro ao alterar pergunta"});
                    console.log(exception);
                    return;
                }

                resp.send({"messagem":"alterado com sucesso"});
            });
            
        });
    });

    /** DELETE /usuario 
     *  rota que permite deletar um usuário existente
    */
    app.delete('/pergunta_resposta/:id', function(req, resp){
        dado = req.params;
        var con = app.persistencia.connectionFactory;
        var dao = new app.persistencia.pergunta_respostaDao(con);

        /**
         * primeira fase: buscar dados 
         */
        dao.findById(dado.id, function(exception, result){
            if(exception){
                resp.status(500);
                resp.send({"mensagem":"erro ao alterar pergunta"});
                console.log(exception);
                return;
            }
            
            /**
             * Verifica se usário existe
             */
            if(!result || result.length == 0){
                resp.status(404);
                resp.send({"message":"pergunta não encontrada"});
                return;
            }
            /** deleção lógica */
            dao.delete(dado.id, function(exception, result){
                /**
                 * se houver exceção joga exceção
                 */
                if(exception){
                    resp.status(500);
                    resp.send({"mensagem":"erro ao deletar pergunta"});
                    console.log(exception);
                    return;
                }

                /**
                 * se ocorreu tudo bem
                 */
                resp.status(200);
                resp.send({"message":"Deletada com sucesso"});
            });
        })

    })
}

     /*
      } else if (!response2.status){
        resp.status(400);
          resp.json({"message": response2.message});
          return;
   } else if(!response3.status){
         resp.status(400);
      resp.json({"message": response3.message});
      return;
    }else if(!response4.status){
        resp.status(400);
        resp.json({"message": response4.message});
        return;
   }
       
*/