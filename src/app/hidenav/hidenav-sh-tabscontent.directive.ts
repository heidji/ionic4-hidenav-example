import {Directive, Input, Host, Self, Optional, ElementRef, ContentChild} from '@angular/core';
import {IonContent} from '@ionic/angular';
import {SuperTabs} from '@ionic-super-tabs/angular';
import {HidenavShService} from './hidenav-sh-service.service';

@Directive({
    selector: '[hidenav-sh-tabscontent]'
})
export class HidenavShTabscontentDirective {

    @Input('hidenav-sh-tabscontent') name: string;
    @ContentChild(SuperTabs) supertabs: SuperTabs;

    constructor(public contentElem: ElementRef, @Host() @Self() @Optional() public el: IonContent, private globals: HidenavShService) {

    }

    ngAfterViewInit() {
        if (typeof this.globals.data[this.name] == 'undefined' || this.globals.data[this.name] == null)
            this.globals.data[this.name] = [];
        if (this.globals.data[this.name].tabscontent != null)
            console.warn('HIDENAV: "' + this.name + '" has been initialized before as SH-TABSCONTENT, please make sure all your live directives carry unique names in order to avoid unexpected results');
        this.globals.data[this.name].tabscontent = this.el;
        this.globals.data[this.name].tabscontentElem = this.contentElem;
        this.globals.initiate(this.name);

        this.supertabs.tabChange.subscribe(e => {
            let i = e.detail.index;
            let tabs = this.contentElem.nativeElement.querySelectorAll('super-tab');
            let results = [];
            for(let tab of tabs){
                let cont = tab.querySelector('ion-content');
                if(cont.attributes['hidenav-sh-content'])
                    results.push(cont.attributes['hidenav-sh-content'].nodeValue);
                else
                    results.push(null);
            }
            if(results[i] != null){
                this.globals.resetContent(results[i]);
            }
        })
    }

    ngOnDestroy() {
        this.globals.data[this.name] = null;
    }

}
