import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home2', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
    { path: 'home2', loadChildren: './home2/home2.module#Home2PageModule' },
    { path: 'home3', loadChildren: './home3/home3.module#Home3PageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
