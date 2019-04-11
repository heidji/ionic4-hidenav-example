import { Component } from '@angular/core';
import { ContactsPage } from '../contacts/contacts.page';
import { ProfilePage } from '../profile/profile.page';

@Component({
  selector: 'app-home3',
  templateUrl: 'home3.page.html',
  styleUrls: ['home3.page.scss'],
})
export class Home3Page {
  contactsPage = ContactsPage;
  profilePage = ProfilePage;
}
