import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,NavigationExtras } from '@angular/router';
import { SettingsComponent } from '../../components/settings/settings.component';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['./overview.page.scss'],
})
export class OverviewPage implements OnInit {
  loginInformation:any;
  boxes:any
  constructor(private route:ActivatedRoute,private router:Router,public popoverController: PopoverController) {
    this.route.queryParams.subscribe(params=>{
      if(this.router.getCurrentNavigation().extras.state){
        this.loginInformation = this.router.getCurrentNavigation().extras.state.loginInformation;
        this.boxes = this.router.getCurrentNavigation().extras.state.boxes.data.boxes;
      }
    })
   }

   async presentSettings(ev:any){
     const popover = await this.popoverController.create({
       component: SettingsComponent,
       event:ev,
       translucent:true
     })

     return await popover.present();
   }

   forwardBox(box){
    let navigationExtras:NavigationExtras={
      state:{
        box
      }
    }
    this.router.navigate(['box'],navigationExtras)
   }

   forwardSketch(box){
    let navigationExtras:NavigationExtras={
      state:{
        box,
       loginInformation: this.loginInformation
      }
    }
    this.router.navigate(['sketch'],navigationExtras)
   }

  ngOnInit() {
  }

  
}
