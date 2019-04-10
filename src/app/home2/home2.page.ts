import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IonContent} from '@ionic/angular';
import {HidenavStretchheaderComponent} from '../hidenav/hidenav-stretchheader.component';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.page.html',
  styleUrls: ['./home2.page.scss'],
})
export class Home2Page implements OnInit {

  @ViewChild(IonContent) content: IonContent;
  @ViewChild('title', {read: ElementRef}) title: ElementRef;
  @ViewChild(HidenavStretchheaderComponent) hidenav: HidenavStretchheaderComponent;
  constructor() { }

  ngOnInit() {
    this.hidenav.scroll.subscribe(res => {
      this.title.nativeElement.style.transform = 'translate3d(0, '+(res-50)+'px, 0)';
    })
  }

  expand() {
    this.hidenav.toggle(300);
  }

}
