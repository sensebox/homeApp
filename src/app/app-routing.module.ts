import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path:'overview',
    loadChildren:()=>import('./pages/overview/overview.module').then(m=>m.OverviewPageModule)
  },
  {
    path: 'register-wizard',
    loadChildren: () => import('./pages/register-wizard/register-wizard.module').then( m => m.RegisterWizardPageModule)
  },
  {
    path: 'newbox',
    loadChildren: () => import('./pages/newbox/newbox.module').then( m => m.NewboxPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
