import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-register-wizard',
  templateUrl: './register-wizard.page.html',
  styleUrls: ['./register-wizard.page.scss'],
})
export class RegisterWizardPage implements OnInit {

  constructor(
    private loadingController: LoadingController,
    private router: Router,
    private authentication: AuthenticationService
    )
  
  { }


  ngOnInit() {
  }

  async handleRegistration(form) {
    const loader = await this.loadingController.create({
      message: 'Please wait ... '
    })
    await loader.present();
    // call osm api to register 
    if (this.validateForm(form)) {
      this.authentication.registerUser(form.value.name, form.value.email, form.value.password)
        .subscribe((response: newUserResponse) => {
          let navigationExtras: NavigationExtras = {
            state: {
              token:response.token,
              refreshToken:response.refreshToken
            }
          }
          loader.dismiss()
          this.router.navigate(['newbox'], navigationExtras)
        })

    }
    else {
      console.error()
    }


    // after success redirect to next slide 


  }
  handleNameInput(event) {
    const validName = event.target.value.length > 3

  }

  handleMailInput(event) {
    console.log("sj")


  }

  handlePasswordInput(event) {
    const validPassword = event.target.value.length > 7

  }
  validateForm(form) {
    const { name, email, password, password2 } = form.value

    const passwordIdentical = password === password2;

    const emailValidate = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    const validMail = emailValidate.test(email)

    return true
  }

}


// names for the slide indices for easier access
enum RegisterSlides {
  Register = 0,
  Loading = 1,
  NewBox = 2
}
