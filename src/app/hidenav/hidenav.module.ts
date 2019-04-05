import { NgModule } from '@angular/core';
import {HidenavTabscontentDirective} from "./hidenav-tabscontent.directive";
import {HidenavContentDirective} from "./hidenav-content.directive";
import {HidenavHeaderDirective} from "./hidenav-header.directive";

@NgModule({
    declarations: [
        HidenavTabscontentDirective,
        HidenavContentDirective,
        HidenavHeaderDirective
    ],
    exports: [
        HidenavTabscontentDirective,
        HidenavContentDirective,
        HidenavHeaderDirective
    ]
})
export class HidenavModule {}