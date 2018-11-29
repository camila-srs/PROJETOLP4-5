class pergunta_respostaService {

    constructor() { }

    /**
     *  valida se os dados de usuário são válidos conforme regra de negócio
     * @param data - dados do usuário 
     */
    validarLabel(data) {
        var vetor = [0, 0, 0, 0, 0];
        var vetor1 = [0, 0, 0, 0, 0];
        
        //for para verificar se existe alternativas nulas ou vazias
        for (var i = 0; i < 5; i++) {
            if (data.respostas[i].label == '') {
                vetor1[i]++;
            }
            if (vetor1[i] >= 1) {
                return { status: false, message: "Não deve conter alternativas vazias" };
            }
        }
        
        /* alterando a String recebida label para sempre converter para minúsculo caso 
        usuário digite a letra representativa da questão em MAIÚSCULO*/
        for (var i = 0; i < 5; i++) {
            data.respostas[i].label = data.respostas[i].label.toLowerCase();
        }
        
         /* for para verificar se existe alternativas diferentes de (a,b,c,d,e)*/
        for (var i = 0; i < 5; i++) {
           
            if (i === 0 ){
                if (data.respostas[i].label !== 'a'  ) {
                    return { status: false, message: "Digite (a) alternativa = a" };
              }
            }
            if (i === 1 ){
                if (data.respostas[i].label !== 'b'  ) {
                    return { status: false, message: "Digite (b) alternativa = b" };
              }
            }
            if (i === 2 ){
                if (data.respostas[i].label !== 'c'  ) {
                    return { status: false, message: "Digite (c) alternativa = c" };
              }
            }
            if (i === 3 ){
                if (data.respostas[i].label !== 'd'  ) {
                    return { status: false, message: "Digite (d) alternativa = d" };
              }
            }
            if (i === 4 ){
                if (data.respostas[i].label !== 'e'  ) {
                    return { status: false, message: "Digite (e) alternativa = e" };
              }
            }

              /* se tiver obedecida as regras sequencia correta 0 == a, 1 == b, 2 ==c , 3 == d, 4 == e entra no else abaixo CAMILA 
              cadastrando na sequencia esperada = a,b,c,d,e */
             else{

               if (data.respostas[i].label == 'a') {
                   vetor[0]++;
               } 
               if (data.respostas[i].label == 'b') {
                   vetor[1]++;
               } 
               if (data.respostas[i].label == 'c') {
                   vetor[2]++;
               } 
               if (data.respostas[i].label == 'd') {
                   vetor[3]++;
               } 
               if (data.respostas[i].label == 'e') {
                   vetor[4]++;
               }
            }   
        }
        /* testando se tem letras repetidas nas opções entre "a" até "e"     */
        
        if (vetor[0] >= 2) {
            return { status: false, message: "Deve haver apenas uma letra a" };
        } 
        if (vetor[1] >= 2) {
            return { status: false, message: "Deve haver apenas uma letra b" };
        } 
        if (vetor[2] >= 2) {
            return { status: false, message: "Deve haver apenas uma letra c" };
        } 
        if (vetor[3] >= 2) {
            return { status: false, message: "Deve haver apenas uma letra d" };
        } 
        if (vetor[4] >= 2) {
            return { status: false, message: "Deve haver apenas uma letra e" };
        }
        return { status: true };

    }
    /* Validação para não aceitar o Label descrição ser passada como VASIA*/
    validarDescricao(data) {
        var vetor3 = [0, 0, 0, 0, 0];
        for (var i = 0; i < 5; i++) {
            if (data.respostas[i].descricao == '') {
                vetor3[i]++;
            }
            if (vetor3[i] >= 1) {
                return { status: false, message: "A descrição não pode ser vazia" };
            }
        }
        return { status: true };
    }
    /* Validação para não aceitar o Label condição ser passada como VASIA*/
    validarCondicao(data) {
        var vetor4 = [0, 0, 0, 0, 0];
        var vetor5 = [0, 0];
        for (var i = 0; i < 5; i++) {
            if (data.respostas[i].condicao == '') {
                vetor4[i]++;
            }
            if (vetor4[i] >= 1) {
                return { status: false, message: "A condição não pode ser vazia" };
            }
        }
        for (var i = 0; i < 5; i++) {

            if (data.respostas[i].condicao == 'true') {
                vetor5[0]++;
            } if (data.respostas[i].condicao == 'false') {
                vetor5[1]++;
            }
        }
        /* Validação para aceitar apenas um Label condição como verdadeiro*/
        if (vetor5[0] > 1) {
            return { status: false, message: "Deve conter apenas uma alternativa correta" };
        } if (vetor5[1] >= 5) {
            return { status: false, message: "Deve haver apenas 4 falses e 1 true" };
        }

        return { status: true };
    }



    validarDados(data) {

       
        if (!data.pergunta) {
            
            return { status: false, message: "Pergunta deve ser obrigatória "};
        }

        if (!data.respostas) {
            
            return { status: false, message: "Resposta Obrigatória" + console.log("3")  };
            
        }

        if (!data.categoria) {
            return { status: false, message: "Categoria Obrigatória" };
        }
        
        return { status: true };
    }
    /* Metodo principal onde testa todas as validações anteriores a ser usado no controle
       no metodo pos*/
    validarFinal(data){
        
        var teste1 = this.validarDados(data);
        var teste2 = this.validarLabel(data);
        var teste3 = this.validarDescricao(data);
        var teste4 = this.validarCondicao(data);

        
        if(!teste1.status){
            return teste1;
        }
        if(!teste2.status){
            return teste2;
        }
        if(!teste3.status){
            return teste3;
        }
        if(!teste4.status){
            return teste4;
        }
        return { status: true };
    }
    voltarJson(data){
        for(var i=0; i < data.length; i++){
            data[i].respostas = JSON.parse(data[i].respostas); 
        } 
  return data;
      }
}
module.exports = function () {
    return pergunta_respostaService;
}




