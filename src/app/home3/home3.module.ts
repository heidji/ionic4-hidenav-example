import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ContactsPageModule } from '../contacts/contacts.module';
import { ProfilePageModule } from '../profile/profile.module';

import { Home3Page } from './home3.page';
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
        component: Home3Page
      }
    ]),
    SuperTabsModule,
    ContactsPageModule,
    ProfilePageModule,
  ],
  declarations: [Home3Page]
})
export class Home3PageModule {}
