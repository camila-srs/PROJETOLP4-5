import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaRespotaPage } from './lista-respota';

@NgModule({
  declarations: [
    ListaRespotaPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaRespotaPage),
  ],
})
export class ListaRespotaPageModule {}
