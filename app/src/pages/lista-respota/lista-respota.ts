import { Component, } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Pergunta } from '../../modules/pergunta';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { VisualizarRespostaPage } from '../visualizar-resposta/visualizar-resposta';
import { CadastroPerguntaPage } from '../cadastro-pergunta/cadastro-pergunta';

/**
 * Generated class for the ListaRespotaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-respota',
  templateUrl: 'lista-respota.html',
})
export class ListaRespotaPage {
  perguntas: Pergunta[];
  http : HttpClient;
  load;
  alert;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _http: HttpClient,
    private _loadCtr: LoadingController,
    private _alert: AlertController
  ) {

    this.http = _http;
    this.load = _loadCtr.create(
      {content: "Carregando..."}
    );
    this.load.present();

    this.alert = _alert.create(
      {
        title:"Falha na Conexão",
        subTitle: "Não foi possível carregar lista de usuários",
        buttons:[
            {text: 'OK'}
        ]
      }
    );
  }

  ionViewDidLoad() {

    /**
     * Método que vai ao servidor por meio do método GET e o recurso /pergunta_resposta
     * Por default, é retornado uma lista de objetos, e eu faço parse da lista por meio do <Pergunta[]>, desta forma eu tenho uma
     * lista de Pergunta.
     * Tenho o subscribe, com as promessas, se deu tudo certo e eu tenho uma lista de perguntas.
     *  Ou retorna exceção, e eu tenho 
     * o HttpErrorResponse. 
     * */
    
    this.http.get<Pergunta[]>("http://localhost:3000/pergunta_resposta")
      .subscribe(
        (question) =>{
          console.log(question);
          this.perguntas = question;
          this.load.dismiss();
        },
        (err: HttpErrorResponse) =>{
          this.load.dismiss();
          this.alert.present();
        }
      );
  }

  seleciona(question:Pergunta){

     /** 
     * Existe um segundo parâmetro na fução push que permite eu 
     * passar dados e objetos para uma página a ser chamada na pilha. 
     * a próxima pagina VisualizarUsuarioPage irá receber um 
     * parâmetro chamado usuarioSelecionado com os dados do usuário selecionado
     * no bind (on click)
     * */
    this.navCtrl.push(VisualizarRespostaPage.name,{
      perguntaSelecionada: question
    });
   
  }

  
  ionViewWillEnter() {
    
    /** 
     * Na página cadastro de usuário, após cadastrar um usuário, 
     * eu seto um parâmetro userBack com os dados do usuaŕio cadastrado. Ou seja, se
     * este parâmetro existe, quer dizer que houve um usuário novo cadastrado,
     *  então vou inserir este novo usuaŕio na lista de usuários. 
     * Assim eu não preciso ir no servidor requerir uma nova listagem pq o usuaŕio foi cadastrado.
    */
    if(this.navParams.get('userBack')){
      /** obtenho o parâmetro por meio do método get e inserio na lista pelo método push */
      var userBack = this.navParams.get('userBack');
      this.perguntas.push(userBack);
      console.log('back');
    }

    /**
     * Na página de visualizar usuário, é possível excluir um usuário, se eu excluo,
     *  eu crio um parâmetro chamado idExcluirUser contendo o id do
     * usuário deletado. Desta forma eu consigo remover da lista, o usuário deletado,
     *  sem necessidade de requerer nova ida ao servidor
     */
    if(this.navParams.get('idExcluirPergunta')){

      /**obtenho o id do usuario deletado */
      var idExcluirPergunta = this.navParams.get('idExcluirPergunta');

      /** uso o método filter da minha lista, para retornar os
       * objetos que tiverem id diferente do id de retorno*/
      this.perguntas = this.perguntas.filter(function(obj){
        return obj.id !== idExcluirPergunta;
      });
    }
  }
 

}

