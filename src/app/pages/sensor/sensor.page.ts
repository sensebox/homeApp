import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.page.html',
  styleUrls: ['./sensor.page.scss'],
})
export class SensorPage implements OnInit {
  sensor:Sensor
  constructor(private router:Router,private route:ActivatedRoute) {
    this.route.queryParams.subscribe(params=>{
      if(this.router.getCurrentNavigation().extras.state){
        this.sensor = this.router.getCurrentNavigation().extras.state.sensor;
      }
    })
   }

  ngOnInit() {
  }

}
