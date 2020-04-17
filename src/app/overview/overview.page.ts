import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['./overview.page.scss'],
})
export class OverviewPage implements OnInit {
  loginInformation:any;
  boxes:any
  constructor(private route:ActivatedRoute,private router:Router) {
    this.route.queryParams.subscribe(params=>{
      if(this.router.getCurrentNavigation().extras.state){
        this.loginInformation = this.router.getCurrentNavigation().extras.state.loginInformation;
        this.boxes = this.router.getCurrentNavigation().extras.state.loginInformation;
      }
    })
   }

  ngOnInit() {
  }

  
}
