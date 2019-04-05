/*import { NgModule } from '@angular/core';
//import {HidenavModule} from 'ionic4-hidenav2';
import {HidenavModule} from 'ionic4-hidenav2';

@NgModule({
    imports: [HidenavModule],
    exports: [HidenavModule]
})
export class SharedModule { }
*/

import { NgModule } from '@angular/core';
import {HidenavModule} from './hidenav/hidenav.module';

@NgModule({
    imports: [HidenavModule],
    exports: [HidenavModule]
})
export class SharedModule { }
