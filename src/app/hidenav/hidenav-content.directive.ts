import {Directive, Input, Host, Self, Optional, ElementRef, ViewChild, ContentChildren} from '@angular/core';
import {IonContent} from '@ionic/angular';
import {HidenavService} from './hidenav-service.service';
import $ from "jquery";

@Directive({
  selector: '[hidenav-content]'
})
export class HidenavContentDirective {

    name: any;
    parent: any;

    constructor( public contentElem: ElementRef, @Host() @Self() @Optional() public el: IonContent, private globals: HidenavService) {

    }

    ngAfterViewInit() {
        if(!this.contentElem.nativeElement.hasAttribute('hidenav-tabspage')){
            this.name = this.globals.requestName();
            $(this.contentElem.nativeElement).attr('hidenav-content', this.name);
            $('[hidenav-header]', $(this.contentElem.nativeElement).parents().get().find(itm => $(itm).find('[hidenav-header]').length)).attr('hidenav-header', this.name);
            this.start();
        }else{
            let counter = 0;
            let int = setInterval(() => {
                let x = $(this.contentElem.nativeElement).closest('[hidenav-tabscontent]').attr('hidenav-tabscontent');
                if(x.length > 0){
                    this.parent = $(this.contentElem.nativeElement).closest('[hidenav-tabscontent]').attr('hidenav-tabscontent');
                    this.name = this.globals.requestTabName(this.parent);
                    $(this.contentElem.nativeElement).attr('hidenav-content', this.name);
                    $(this.contentElem.nativeElement).attr('hidenav-tabspage', this.parent);
                    this.start();
                    clearInterval(int);
                }else if(counter > 50){
                    console.warn('HIDENAV: page declared as tabspage but no tabscontent page found');
                    clearInterval(int);
                }
            }, 50)
        }
    }

    start() {
        if(this.name){
            if(typeof this.globals.data[this.name] == 'undefined' || this.globals.data[this.name] == null)
                this.globals.data[this.name] = [];
            this.globals.data[this.name].content = this.el;
            this.globals.data[this.name].contentElem = this.contentElem;
            if(this.parent)
                this.globals.data[this.name].parent = this.parent;
            this.globals.initiate(this.name);
        }
    }

    ngOnDestroy() {
        if(this.name){
            delete this.globals.data[this.name].content;
        }
    }

}
