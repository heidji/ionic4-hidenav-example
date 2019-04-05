import {Directive, ElementRef, Input} from '@angular/core';
import {HidenavService} from './hidenav-service.service';

@Directive({
  selector: '[hidenav-header]'
})
export class HidenavHeaderDirective {

    @Input('hidenav-header') name: string;
    constructor( public el: ElementRef, private globals: HidenavService) {

    }

    ngAfterViewInit() {
        if(typeof this.globals.data[this.name] == 'undefined' || this.globals.data[this.name] == null)
            this.globals.data[this.name] = [];
        if(this.globals.data[this.name].header != null )
            console.warn('HIDENAV: "'+this.name + '" has been initialized before as HEADER, please make sure all your live directives carry unique names in order to avoid unexpected results');
        this.globals.data[this.name].header = this.el;
        this.globals.initiate(this.name);
    }

    ngOnDestroy() {
        this.globals.data[this.name] = null;
    }

}
