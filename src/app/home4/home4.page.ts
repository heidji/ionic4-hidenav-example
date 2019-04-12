import {Component, ViewChild, ElementRef} from '@angular/core';
import { ContactsPage } from '../contacts/contacts.page';
import { ProfilePage } from '../profile/profile.page';
import {HidenavStretchheaderComponent} from '../hidenav/hidenav-stretchheader.component';

@Component({
  selector: 'app-home4',
  templateUrl: 'home4.page.html',
  styleUrls: ['home4.page.scss'],
})
export class Home4Page {
  contactsPage = ContactsPage;
  profilePage = ProfilePage;

  @ViewChild(HidenavStretchheaderComponent) hidenav: HidenavStretchheaderComponent;
    @ViewChild('title', {read: ElementRef}) title: ElementRef;

  expand() {
    this.hidenav.toggle()
  }

  ngOnInit() {
      this.hidenav.scroll.subscribe(res => {
          this.title.nativeElement.style.transform = 'translate3d(0, '+(res-50)+'px, 0)';
      })
  }
}
