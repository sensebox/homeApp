import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-sketch',
  templateUrl: './sketch.page.html',
  styleUrls: ['./sketch.page.scss'],
})
export class SketchPage implements OnInit {
  loginInformation:any;
  box:Box
  constructor(private router:Router,private route:ActivatedRoute) 
  {
    this.route.queryParams.subscribe(params=>{
      if(this.router.getCurrentNavigation().extras.state){
        this.loginInformation = this.router.getCurrentNavigation().extras.state.loginInformation;
        this.box = this.router.getCurrentNavigation().extras.state.box;
      }
    })
   }
   viewSensor(sensor){
     let navigationExtras:NavigationExtras = {
       state:{
         sensor
       }
     }
     this.router.navigate(['sensor'],navigationExtras)
   }
   uploadStandardSketch(){
     console.log("Starting ota wizard");
   }

  ngOnInit() {
  }

}
