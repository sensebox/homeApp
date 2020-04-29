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
  },
  {
    path: 'sensor',
    loadChildren: () => import('./pages/sensor/sensor.module').then( m => m.SensorPageModule)
  },
  {
    path: 'sketch',
    loadChildren: () => import('./pages/sketch/sketch.module').then( m => m.SketchPageModule)
  },
  {
    path: 'box',
    loadChildren: () => import('./pages/box/box.module').then( m => m.BoxPageModule)
  },
  {
    path: 'ota-wizard',
    loadChildren: () => import('./pages/ota-wizard/ota-wizard.module').then( m => m.OtaWizardPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
