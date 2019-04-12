import {Directive, Input, Host, Self, Optional, ElementRef, ContentChild, ContentChildren} from '@angular/core';
import {IonContent} from '@ionic/angular';
import {HidenavService} from './hidenav-service.service';
import {HidenavContentDirective} from './hidenav-content.directive';
import {SuperTab, SuperTabs} from '@ionic-super-tabs/angular';
import $ from 'jquery';

@Directive({
    selector: '[hidenav-tabscontent]'
})
export class HidenavTabscontentDirective {

    @ContentChild(SuperTabs) supertabs: SuperTabs;

    name: any;

    constructor(public contentElem: ElementRef, @Host() @Self() @Optional() public el: IonContent, private globals: HidenavService) {

    }

    ngAfterViewInit() {
        this.name = this.globals.requestName();
        this.contentElem.nativeElement.setAttribute('hidenav-tabscontent', this.name);
        $('[hidenav-header]', $(this.contentElem.nativeElement).parents().get().find(itm => $(itm).find('[hidenav-header]').length)).attr('hidenav-header', this.name);
        if (this.name) {
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
                        let i = e.detail.index;
                        let tabs = this.contentElem.nativeElement.querySelectorAll('super-tab');
                        let results = [];
                        for (let tab of tabs) {
                            let cont = tab.querySelector('ion-content');
                            if (cont.attributes['hidenav-content'])
                                results.push(cont.attributes['hidenav-content'].nodeValue);
                            else
                                results.push(null);
                        }
                        if (results[i] != null) {
                            this.globals.resetTabs(this.name, results[i]);

                        }
                    }
                });
            }
        }
    }

    ngOnDestroy() {
        if (this.name) {
            delete this.globals.data[this.name].tabscontent;
        }
    }

}
