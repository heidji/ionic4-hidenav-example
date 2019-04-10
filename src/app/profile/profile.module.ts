import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfilePage } from './profile.page';
import {SharedModule} from '../shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
      SharedModule
  ],
  declarations: [ProfilePage],
  exports: [ProfilePage],
  entryComponents: [ProfilePage],
})
export class ProfilePageModule {
}
