import {Component, ViewChild, ElementRef} from '@angular/core';
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
    @ViewChild('hossi', {read: ElementRef}) title: ElementRef;

  expand() {
    this.hidenav.toggle()
  }

  ngOnInit() {
      this.hidenav.scroll.subscribe(res => {
          this.title.nativeElement.style.transform = 'translate3d(0, '+(res-150)+'px, 0)';
      })
  }
}
