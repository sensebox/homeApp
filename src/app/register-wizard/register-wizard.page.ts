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

  constructor(private loginService: LoginService, private loadingController: LoadingController) { }


  ngOnInit() {
  }

  async handleRegistration(form) {
    const loader = await this.loadingController.create({
      message: 'Please wait ... '
    })
    await loader.present();
    // call osm api to register 
    if (this.validateForm(form)) {
      this.loginService.registerUser(form.value.name, form.value.email, form.value.password)
        .subscribe(response => {
          console.log(response)
          loader.dismiss()
        })

    }
    else {
      console.error()
    }

    // after success redirect to next slide 


  }
  handleNameInput(event){
    const validName = event.target.value.length>3

  }

  handleMailInput(event){
    const emailValidate = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    const validMail = emailValidate.test(event.target.value)

  }

  handlePasswordInput(event){
    const validPassword = event.target.value.length>7

  }
  validateForm(form){
    const {name,email,password} = form.value

    return true
  }

}


// names for the slide indices for easier access
enum RegisterSlides {
  Register = 0,
  Loading = 1,
  NewBox = 2
}
