import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {path: '', redirectTo: 'main', pathMatch: 'full'},
    {path: 'home', loadChildren: './home/home.module#HomePageModule'},
    {path: 'home2', loadChildren: './home2/home2.module#Home2PageModule'},
    {path: 'home3', loadChildren: './home3/home3.module#Home3PageModule'},
    {path: 'home4', loadChildren: './home4/home4.module#Home4PageModule'},
    {path: 'main', loadChildren: './main/main.module#MainPageModule'},

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
