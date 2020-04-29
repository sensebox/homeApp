import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-box',
  templateUrl: './box.page.html',
  styleUrls: ['./box.page.scss'],
})
export class BoxPage implements OnInit {
  box:Box;
  constructor(private route:ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params=>{
      if(this.router.getCurrentNavigation().extras.state){
        this.box = this.router.getCurrentNavigation().extras.state.box;
      }
    })
   }
  
  forwardSensor(sensor){
    let navigationExtras:NavigationExtras={
      state:{
        sensor
      }
    }
    this.router.navigate(['sensor'],navigationExtras)
  }

  ngOnInit() {
  }

}
