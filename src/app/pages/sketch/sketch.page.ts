import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-sketch',
  templateUrl: './sketch.page.html',
  styleUrls: ['./sketch.page.scss'],
})
export class SketchPage implements OnInit {
  loginInformation:any;
  box:Box;
  ssid:string;
  passwordWifi:string
  constructor(private router:Router,private route:ActivatedRoute,private LoginService:LoginService) 
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
     this.LoginService.getUserSketch(this.loginInformation.token,this.box._id,this.ssid,this.passwordWifi)
          .subscribe(sketch=>{
            let navigationExtras:NavigationExtras = {
              state:{
                sketch
              }
            }
            this.router.navigate(['ota-wizard'],navigationExtras)
          })
   }

  ngOnInit() {
  }

}
