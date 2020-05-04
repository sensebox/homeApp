import { Component, OnInit, NgModule } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { LoginService } from '../../services/login/login.service';
import {Router, NavigationExtras} from '@angular/router';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  private loginInformation;
  private boxes;
  private saveCredentialsCheckbox: boolean
  constructor(
    private LoginService: LoginService,
    private router: Router,
    public loadingController: LoadingController,
    public modalController: ModalController

    ) { }

  ngOnInit() {
  }

  async submitLogin(form) {
    const loading = await this.loadingController.create({
      message:'Please wait...'
    })
    loading.present();
    if (this.validatePassword(form)) {
      try {

        // Try to login on success request data from all available boxes
        this.LoginService.submitLogin(form.value.email, form.value.password)
          .subscribe(loginInformation => {
            this.loginInformation = <loginResponse>loginInformation
            this.LoginService.getUserBoxes(this.loginInformation.token)
              .subscribe(boxes => {
                this.boxes = boxes
                let navigationExtras:NavigationExtras={
                  state:{
                    loginInformation:this.loginInformation,
                    boxes : this.boxes
                  }
                }
                console.log(navigationExtras)
                this.router.navigate(['overview'],navigationExtras)
              })
          })
        if (this.saveCredentialsCheckbox) {
          this.saveCredentials({ username: form.value.email, password: form.value.password });
        }
      }
      catch (err) {
        console.log(err);
      }
    }
    else {
      console.log("input errro");
    }
    loading.dismiss();
  }

  private async saveCredentials(credentials: Object) { }

  validatePassword(form) {
    if (form.value.email && form.value.password) {
      return true
    }
    else {
      return false
    }
  }

  async register(){
    
    this.router.navigate(['register-wizard'])

  }

}

