import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Pergunta } from '../../modules/pergunta';
import { HttpClient } from '@angular/common/http';
import { CadastroPerguntaPage } from '../cadastro-pergunta/cadastro-pergunta';
/**
 * Generated class for the VisualizarRespostaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-visualizar-resposta',
  templateUrl: 'visualizar-resposta.html',
})
export class VisualizarRespostaPage {
 perguntas : Pergunta;
 private _isExcluir: boolean;
 
 load;
  conteudoAlert = {titulo:'', mensagem:''}
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     private _alertCtrl: AlertController,
    private _loadCtr: LoadingController,
    private _http: HttpClient
     )
{
    
  this._isExcluir = false;
  this.perguntas= this.navParams.get('perguntaSelecionada');
  this.load = _loadCtr.create(
    {content: "Carregando..."}
  );

  
    }


  //ionViewDidLoad() {
    //console.log('ionViewDidLoad VisualizarRespostaPage.name,'+'respostas');
  //}

  confirma() {
    let alert = this._alertCtrl.create({
      title: 'Excluir Quiz',
      message: 'Você tem certeza que deseja excluir este quiz?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Excluir',
          handler: () => {
            alert.dismiss;
            this.excluir();
          }
        }
      ]
    });
    alert.present();
  }

  excluir(){
    this.load.present();
     //seta atributo que a ação execuada é uma exclusão
     this._isExcluir = true;
    console.log("http://localhost:3000//" + this.perguntas.id);
    this._http.delete("http://localhost:3000/pergunta_resposta/" + this.perguntas.id)
    .subscribe(
      (message) => {
        console.log(message);
        this.load.dismiss();
        this.alertFinal();
        this.conteudoAlert.mensagem = "Deletado";
        this.conteudoAlert.titulo = "Deletado com sucesso"
      },
      (err) => {
        this._isExcluir = false;
        console.log(err);

        this._alertCtrl.create(
          {
            title:"Falha ao deletar usuário",
            subTitle: "Não foi possível deletar usuário, entre em contato com suporte.",
            buttons:[
                {text: 'OK'}
            ]
          }
        ).present();
        this.load.dismiss();
      }
    );
  }

  alertFinal() {
    /**configuração do alerta */
    let alert = this._alertCtrl.create({
      title: "Sucesso",
      subTitle: "Excluído com sucesso!",
      buttons: [
        {
          text: 'Fechar',
          handler: () => {
            /**encerra página, pq usuário foi excluído */
            this.navCtrl.pop();
          }
        }
      ]
    });

    /**mostra o alerta definido */
    alert.present();
  }

  /**
   * Quando página está sendo encerrada, este método é executado, 
   * Assim permite eu verificar se houve uma exclusão, e eu envio
   * para a página de listagem o id do usuário excluído, assim
   * o usuário pode ser removido da listagem, sem necessidade de ir
   * ao servidor (api)
   */
  ionViewWillLeave() {  
    if(this._isExcluir){
      /**permite eu enviar a página anterior um valor  idExcluirUser contendo
       * o id do usuário excluído
      */
      this.navCtrl.getPrevious().data.idExcluirPergunta = this.perguntas.id;
    }
   }


  editar(){
    this.navCtrl.push(CadastroPerguntaPage.name, {
      perguntaSelecionada: this.perguntas
    });
  }

}

