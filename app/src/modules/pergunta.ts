import { Resposta } from "./resposta";

/**   COLISBERTO
 *  Para ser usado para criação do objeto pergunta e seus atributos */

export class Pergunta {
  
    id: number;
    pergunta: string;
    respostas: Resposta[];
    categoria : string;
   
    constructor(){
        this.id = 0;
        this.pergunta = '';
        this.categoria = '';
        this.respostas = [];
    }
}