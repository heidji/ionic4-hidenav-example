import {Directive, Input, Host, Self, Optional, ElementRef, ContentChild} from '@angular/core';
import {IonContent} from '@ionic/angular';
import {HidenavService} from './hidenav-service.service';
import {SuperTabs} from '@ionic-super-tabs/angular';

@Directive({
    selector: '[hidenav-tabscontent]'
})
export class HidenavTabscontentDirective {

    @Input('hidenav-tabscontent') name: string;
    @ContentChild(SuperTabs) supertabs: SuperTabs;

    constructor(public contentElem: ElementRef, @Host() @Self() @Optional() public el: IonContent, private globals: HidenavService) {

    }

    ngAfterViewInit() {
        if (typeof this.globals.data[this.name] == 'undefined' || this.globals.data[this.name] == null)
            this.globals.data[this.name] = [];
        if (this.globals.data[this.name].tabscontent != null)
            console.warn('HIDENAV: "' + this.name + '" has been initialized before as TABSCONTENT, please make sure all your live directives carry unique names in order to avoid unexpected results');
        this.globals.data[this.name].tabscontent = this.el;
        this.globals.data[this.name].tabscontentElem = this.contentElem;
        this.globals.initiate(this.name);

        if (this.supertabs) {
            this.supertabs.tabChange.subscribe(e => {
                if (e.detail.changed == true) {
                    this.globals.resetTabs(this.name);
                }
            });
        }
    }

    ngOnDestroy() {
        this.globals.data[this.name] = null;
    }

}
