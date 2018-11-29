/**
 * class usuarioDAO responsável pelas operações com o banco de dados
 */
class pergunta_respostaDao{
    constructor(connection){
        this._con = connection;
    }

    /**
     * cria novo usuário por meio da query insert
     * @param pergunta_resposta - dados do usuario
     * @param callback - função de retorno 
     */
    create(pergunta_resposta, callback){
        try {
            this._con.query('INSERT INTO pergunta_resposta set ?', pergunta_resposta, callback);
        } catch(error){
            console.log(error);
        }
    }

    /**
     * busca todos os usuários por meio do select
     * @param callback - função de retorno, já que é uma função assíncrona 
     */
    findAll(callback){
        try{
            this._con.query('SELECT * FROM pergunta_resposta where deletado = 0', callback);
        } catch(error){
            console.log(error);
        }
    }

    /**
     * Busca o usuário a partir do id passado na requisição
     * @param id - id do usuário
     * @param callback - função de retorno 
     */
    findById(id, callback){
        try{
            this._con.query('SELECT * FROM pergunta_resposta where pergunta_resposta.id = ? and deletado = 0', id, callback);
        } catch(error){
            console.log(error);
        }
    }

    /**
     * Altera os dados do usuário a partir do id passado por parâmetro e os dados do usuário
     * @param id - id do usuário que será alterado
     * @param pergunta_resposta - dados do usuário que serão persistido no banco 
     * @param callback - função de retorno 
     */
    update(id, pergunta_resposta, callback){
        try{
            this._con.query('UPDATE pergunta_resposta SET ? WHERE id = ?', [pergunta_resposta, id], callback);
        } catch(error){
            console.log(error);
        }
    }

    /**
     * 
     * @param id - id do usuaŕio que será excluído logicamente 
     * @param callback - função assíncrona 
     */
    delete(id, callback){
        try{
            this._con.query('UPDATE pergunta_resposta SET deletado = 1 WHERE id = ? ', id, callback);
        } catch(error){
            console.log(error);
        }
    }
}

/**
 * Expõem o módulo para outros módulos
 */
module.exports = function(){
    return pergunta_respostaDao;
}