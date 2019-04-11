import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Home1Page } from './home1.page';
import {SharedModule} from '../shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
      SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: Home1Page
      }
    ])
  ],
  declarations: [Home1Page]
})
export class Home1PageModule {}
