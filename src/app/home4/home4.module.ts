import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Home4Page } from './home4.page';
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
        component: Home4Page
      }
    ])
  ],
  declarations: [Home4Page]
})
export class Home4PageModule {}
