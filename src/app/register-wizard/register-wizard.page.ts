import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { LoginService } from '../login.service';
@Component({
  selector: 'app-register-wizard',
  templateUrl: './register-wizard.page.html',
  styleUrls: ['./register-wizard.page.scss'],
})
export class RegisterWizardPage implements OnInit {
  slideOpts = {}

  constructor(private loginService: LoginService, private loadingController:LoadingController) { }


  ngOnInit() {
  }

  async handleRegistration(form){
    console.log("register start");
    const loader = await this.loadingController.create({
      message:'Please wait ... '
    })
    console.log(form);
    await loader.present();
    // call osm api to register 
    this.loginService.registerUser(form.value.name,form.value.email,form.value.password)
          .subscribe(response=>console.log(response))
    // after success redirect to next slide 
  }

  handleUsernameValue(event){
    console.log(event.target.value)
  }

  handleEmailValue(event){

  }

  handlePasswordValue(event){

  }
}


// names for the slide indices for easier access
enum RegisterSlides {
  Register = 0,
  Loading = 1,
  NewBox = 2
}
