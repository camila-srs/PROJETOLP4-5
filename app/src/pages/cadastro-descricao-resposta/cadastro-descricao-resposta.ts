import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Pergunta } from '../../modules/pergunta';
import { HttpClient } from '@angular/common/http';
import { CadastroPerguntaPage } from '../cadastro-pergunta/cadastro-pergunta';
import { Resposta } from '../../modules/resposta';

/**
 * Generated class for the CadastroDescricaoRespostaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-descricao-resposta',
  templateUrl: 'cadastro-descricao-resposta.html',
})
export class CadastroDescricaoRespostaPage {

  public pergunta: Pergunta;
  public resposta: Resposta[];
  public respostas: Resposta;
  private error = { condicao: false, message:''};
  private success = { condicao: false, message: ''};
 
  load;
  conteudoAlert = {titulo:'', mensagem:''}

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
  
    private _loadCtr: LoadingController /** permite criar um loading para informar ao cliente carregando lista*/,
    private _alertCtrl: AlertController /** objeto para construir componentes alertas */
    ) 
    {
      this.respostas = new Resposta();
      this.respostas = this.navParams.get('respostaSelecionada')
    this.load = _loadCtr.create(
      {content: "Carregando..."}
    );
    
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad CadastroDescricaoRespostaPage');
  }
 
  ok(){
    
    console.log(this.respostas);
    
    if(this.respostas.condicao!=null && this.respostas.descricao!= "")    {
    this.navCtrl.getPrevious().data.userBack;
    this.navCtrl.pop();
  }else{
    this.error.condicao = true;
  this.error.message = "Condição e Descrição são obrigatoria!";
  }
    
  }



 

  
  
  ionViewWillLeave() {  
    this.navCtrl.getPrevious().data.userBack = this.respostas;
  
   }


}
