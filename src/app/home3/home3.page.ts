import {Component, ViewChild} from '@angular/core';
import { ContactsPage } from '../contacts/contacts.page';
import { ProfilePage } from '../profile/profile.page';
import {HidenavStretchheaderComponent} from '../hidenav/hidenav-stretchheader.component';

@Component({
  selector: 'app-home3',
  templateUrl: 'home3.page.html',
  styleUrls: ['home3.page.scss'],
})
export class Home3Page {
  contactsPage = ContactsPage;
  profilePage = ProfilePage;

  @ViewChild(HidenavStretchheaderComponent) hidenav: HidenavStretchheaderComponent;

  expand() {
    this.hidenav.toggle()
  }
}
