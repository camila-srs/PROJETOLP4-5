/** CRIADO POR COLISBERTO */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Pergunta} from  '../../modules/pergunta';
import { HttpClient } from '@angular/common/http';
import { Resposta } from '../../modules/resposta';
import { CadastroDescricaoRespostaPage } from '../cadastro-descricao-resposta/cadastro-descricao-resposta';
import { HomePage } from '../home/home';

/**
 * Generated class for the CadastroPerguntaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-pergunta',
  templateUrl: 'cadastro-pergunta.html',
})
export class CadastroPerguntaPage {

    public resposta:Resposta;
    public aux:number=0;
    public aux2:boolean=false;
    botaoEditar:boolean=false;
  botaoSalvar:boolean=false;
   
    load;
  private orderForm;
 
  public pergunta: Pergunta;
  public respostas: Resposta;
  private error = { condicao: false, message:''};
  private success = { condicao: false, message: ''};


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    private _alertCtrl: AlertController,
    private _loadCtr: LoadingController
    ) 
      {

        
        this.pergunta = this.navParams.get('perguntaSelecionada');
        this.respostas = new Resposta;
        if(this.pergunta){
          this.load = _loadCtr.create(
            {content: "Carregando..."}
          );
         this.aux = 5;
         this.botaoEditar=true;
      }else{
        this.pergunta = new Pergunta();
        this.botaoSalvar=true;
    
      }
    
      }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPerguntaPage');
  }

 
  ionViewWillEnter() {
    this.resposta = new Resposta;
    console.log(this.resposta);
  
  if(this.navParams.get('userBack')){
      /** obtenho o parâmetro por meio do método get e inserio na lista pelo método push */
      
      var teste= this.navParams.get('userBack');
     this.resposta.label = teste.label;
      this.resposta.descricao = teste.descricao;
      this.resposta.condicao = teste.condicao;
      console.log(this.resposta);
     this.virificarTamanho();
      if(!this.validarRespota(this.resposta)){
      this.pergunta.respostas.push( this.resposta);
      console.log(this.pergunta);
      }
      
    }
  }


  validarRespota(as:Resposta):boolean{
      if(this.aux2){
      if(as.label === 'a'){
        this.pergunta.respostas[0].label=this.resposta.label;
        this.pergunta.respostas[0].descricao = this.resposta.descricao;
        this.pergunta.respostas[0].condicao = this.resposta.condicao;
        return true;
      }else{
        if(as.label === 'b'){
          this.pergunta.respostas[1].label=this.resposta.label
          this.pergunta.respostas[1].descricao = this.resposta.descricao;
          this.pergunta.respostas[1].condicao = this.resposta.condicao;
          return true;
      }else{
        if(as.label === 'c'){
          this.pergunta.respostas[2].label=this.resposta.label
          this.pergunta.respostas[2].descricao = this.resposta.descricao;
          this.pergunta.respostas[2].condicao = this.resposta.condicao;
        return true;
    }else{
      if(as.label === 'd'){
        this.pergunta.respostas[3].label=this.resposta.label
        this.pergunta.respostas[3].descricao = this.resposta.descricao;
        this.pergunta.respostas[3].condicao = this.resposta.condicao;
        return true;
    }else{
      if(as.label === 'e'){
        this.pergunta.respostas[4].label=this.resposta.label
        this.pergunta.respostas[4].descricao = this.resposta.descricao;
        this.pergunta.respostas[4].condicao = this.resposta.condicao;
        return true;
    }
    }
  }
    }
  
  }


}else{
  return false;
}
  }
  
  virificarTamanho(){
    if(this.pergunta.respostas.length<1){
      this.aux = 1;
    
    }else{
      if(this.pergunta.respostas.length<2){
        this.aux = 2;
        
      }else{
        if(this.pergunta.respostas.length<3){
          this.aux = 3;
          
        }else{
          if(this.pergunta.respostas.length<4){
            this.aux = 4;
           
          }

    }

  }
}
  }



cadastroDescricaoOpA(){
  
  console.log(this.aux);


    if(!this.pergunta.respostas[0]){
    this.respostas.label="a"
    this.navCtrl.push(CadastroDescricaoRespostaPage.name,{ respostaSelecionada:this.respostas });
     this.aux2= false;  
  }else{
    if(this.pergunta.respostas[0].label === 'a'){
      this.navCtrl.push(CadastroDescricaoRespostaPage.name,{respostaSelecionada:this.pergunta.respostas[0]});
      this.aux2 = true;
      return;


    
    }
}
}
    

cadastroDescricaoOpB(){

  this.respostas = new Resposta;
  if(!this.pergunta.respostas[1]){
    this.respostas.label="b"
    this.navCtrl.push(CadastroDescricaoRespostaPage.name,{ respostaSelecionada:this.respostas });
     this.aux2= false;  
  }else{
    if(this.pergunta.respostas[1].label === 'b'){
      this.aux2= true;  
      this.navCtrl.push(CadastroDescricaoRespostaPage.name,{respostaSelecionada:this.pergunta.respostas[1]});
      return;

    
    }
}
}


cadastroDescricaoOpC(){
  this.respostas = new Resposta;
  if(!this.pergunta.respostas[2]){
    this.respostas.label="c"
    this.navCtrl.push(CadastroDescricaoRespostaPage.name,{ respostaSelecionada:this.respostas });
     this.aux2= false;  
  }else{
    if(this.pergunta.respostas[2].label === 'c'){
      this.aux2= true;  
      this.navCtrl.push(CadastroDescricaoRespostaPage.name,{respostaSelecionada:this.pergunta.respostas[2]});
      return;

    
    }
}
}


cadastroDescricaoOpD(){
  this.respostas = new Resposta;
  if(!this.pergunta.respostas[3]){
  this.respostas.label='d'
  this.navCtrl.push(CadastroDescricaoRespostaPage.name,{ respostaSelecionada:this.respostas });
  this.aux2= false;  
  }else{
    if(this.pergunta.respostas[3].label === 'd'){
    this.navCtrl.push(CadastroDescricaoRespostaPage.name,{respostaSelecionada:this.pergunta.respostas[3]});
    this.aux2= true;  
    return;

  }

}
}

cadastroDescricaoOpE(){
  this.respostas = new Resposta;
  if(!this.pergunta.respostas[4]){
    this.respostas.label='e'
    this.navCtrl.push(CadastroDescricaoRespostaPage.name,{ respostaSelecionada: this.respostas });
    this.aux2= false;  
}
  else{
    if(this.pergunta.respostas[4].label === 'e'){
      this.navCtrl.push(CadastroDescricaoRespostaPage.name,{respostaSelecionada:this.pergunta.respostas[4]});
      this.aux2= true;  
      return;

    }
  }
}
 




validarDados(){
var j = 0;
var guardarP:String[] = ["","","","",""];
var verificarRes:number=0;
var verificarRes2:number=0;
this.error.condicao = false;
  if(!this.pergunta.categoria){
    this.error.condicao = true;
    this.error.message = "Categoria, campo obrigatório!";
  }
  for(var i = 0;i<this.pergunta.respostas.length;i++){
  if(this.pergunta.respostas[i].condicao === "True"){
    j = j+1;
    verificarRes = verificarRes+1;
    guardarP[j] = this.pergunta.respostas[i].label;
    console.log(guardarP);
  
  }else{
   verificarRes2 = verificarRes2+1;

  }

}
if(verificarRes>=2){
  this.error.condicao = true;
  this.error.message = "As opçãoes :" +guardarP+ "  estao como true por favor escolha somente uma" ;
}else{
if(verificarRes2 <4){
  this.error.condicao = true;
  this.error.message = "Por favor preencha todas as opçoes" ;
}

}
  if(!this.pergunta.pergunta){
    this.error.condicao = true;
    this.error.message = "Pergunta, campo obrigatório!";
  }

 

  
}

salvar(){
  this.error.condicao = false;
  this.validarDados();
if(!this.error.condicao){
  this.pergunta.id=null;
  this.http.post("http://localhost:3000/pergunta_resposta/", 
    this.pergunta
      ).subscribe(res => {
        console.log(res);
        this.error.condicao = false;
        this.error.message = '';
        this.success.condicao = true;
        this.success.message = "Criado com sucesso";
        this.navCtrl.pop();
      }, (err) => {
        console.log(err);
      });
    }
}

editar(){
  
    this.error.condicao = false;
    this.validarDados();
    console.log(this.error.condicao,this.pergunta);
    
    if(!this.error.condicao){

      this.http.put("http://localhost:3000/pergunta_resposta/"+this.pergunta.id,this.pergunta)
     
        .subscribe(res => {
          console.log(res);
          this.error.condicao = false;
          this.error.message = '';
          this.success.condicao = true;
          this.success.message = "Criado com sucesso"

         
          
        }, (err) => {
          console.log(err);
        });

    }
  }
}




 