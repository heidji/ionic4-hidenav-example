import {Directive, Input, Host, Self, Optional, ElementRef} from '@angular/core';
import {IonContent} from '@ionic/angular';
import {HidenavShService} from './hidenav-sh-service.service';

@Directive({
  selector: '[hidenav-sh-content]'
})
export class HidenavShContentDirective {

    @Input('hidenav-sh-content') name: string;
    @Input('hidenav-sh-parent') parent: string;

    constructor( @Host() @Self() @Optional() public el: IonContent, public contentEl: ElementRef, private globals: HidenavShService) {

    }

    ngAfterViewInit() {
        if(typeof this.globals.data[this.name] == 'undefined' || this.globals.data[this.name] == null)
            this.globals.data[this.name] = [];
        if(this.globals.data[this.name].content != null )
            console.warn('HIDENAV: "'+this.name + '" has been initialized before as SH-CONTENT, please make sure all your live directives carry unique names in order to avoid unexpected results');
        this.globals.data[this.name].content = this.el;
        this.globals.data[this.name].contentEl = this.contentEl;
        this.globals.data[this.name].parent = this.parent;
        this.globals.initiate(this.name);
    }

    ngOnDestroy() {
        delete this.globals.data[this.name].content;
    }

}
