import {Directive, Input, Host, Self, Optional, ElementRef} from '@angular/core';
import {IonContent} from '@ionic/angular';
import {HidenavService} from './hidenav-service.service';

@Directive({
  selector: '[hidenav-content]'
})
export class HidenavContentDirective {

    @Input('hidenav-content') name: string;
    @Input('hidenav-parent') parent: string;

    constructor( public contentElem: ElementRef, @Host() @Self() @Optional() public el: IonContent, private globals: HidenavService) {

    }

    ngAfterViewInit() {
        if(typeof this.globals.data[this.name] == 'undefined' || this.globals.data[this.name] == null)
            this.globals.data[this.name] = [];
        if(this.globals.data[this.name].content != null )
            console.warn('HIDENAV: "'+this.name + '" has been initialized before as CONTENT, please make sure all your live directives carry unique names in order to avoid unexpected results');
        this.globals.data[this.name].content = this.el;
        this.globals.data[this.name].parent = this.parent;
        this.globals.data[this.name].contentElem = this.contentElem;
        this.globals.initiate(this.name);
    }

    ngOnDestroy() {
        delete this.globals.data[this.name].content;
    }

}
