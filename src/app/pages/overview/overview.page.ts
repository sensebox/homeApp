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
  boxes:any
  constructor(private route:ActivatedRoute,private router:Router,public popoverController: PopoverController) {
    this.route.queryParams.subscribe(params=>{
      if(this.router.getCurrentNavigation().extras.state){
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
    console.log(box);

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
      }
    }
    this.router.navigate(['sketch'],navigationExtras)
   }

  ngOnInit() {
  }

  
}
