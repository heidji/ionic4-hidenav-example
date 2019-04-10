import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ContactsPage } from './contacts.page';
import {SharedModule} from '../shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
      SharedModule
  ],
  declarations: [ContactsPage],
  entryComponents: [
    ContactsPage,
  ],
  exports: [
    ContactsPage,
  ],
})
export class ContactsPageModule {
}
