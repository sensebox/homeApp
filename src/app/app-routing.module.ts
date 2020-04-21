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
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path:'overview',
    loadChildren:()=>import('./overview/overview.module').then(m=>m.OverviewPageModule)
  },
  {
    path: 'register-wizard',
    loadChildren: () => import('./register-wizard/register-wizard.module').then( m => m.RegisterWizardPageModule)
  },
  {
    path: 'newbox',
    loadChildren: () => import('./newbox/newbox.module').then( m => m.NewboxPageModule)
  },
  {
    path: 'privacy-disclaimer',
    loadChildren: () => import('./privacy-disclaimer/privacy-disclaimer.module').then( m => m.PrivacyDisclaimerPageModule)
  },
  {
    path: 'overviewnewbox',
    loadChildren: () => import('./overviewnewbox/overviewnewbox.module').then( m => m.OverviewnewboxPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
