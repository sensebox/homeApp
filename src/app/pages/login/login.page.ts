import { Component, OnInit, NgModule } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular'
import { AuthenticationService } from 'src/app/services/authentication.service';
import { OsemService } from 'src/app/services/osem.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  private loginInformation;
  private boxes;
  private saveCredentialsCheckbox: boolean
  private keepSignedIn:boolean

  constructor(
    private router: Router,
    private authentication: AuthenticationService,
    private osem: OsemService,
    public loadingController: LoadingController,
    public modalController: ModalController,
    public toastController: ToastController


  ) { }

  ngOnInit() {
  }


  async presentToastWithOptions(content) {
    const toast = await this.toastController.create({
      message: content,
      position: 'bottom',
      duration:4000
    });
    toast.present();
  }
  async submitLogin(form) {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    })
    loading.present();
    if (this.validatePassword(form)) {
      try {

        // Try to login on success request data from all available boxes
        this.authentication.submitLogin(form.value.email, form.value.password)
          .subscribe((loginInformation) => {
            this.loginInformation = <loginResponse>loginInformation
            this.osem.getUserBoxes(this.loginInformation.token)
              .subscribe(boxes => {
                this.boxes = boxes
                let navigationExtras: NavigationExtras = {
                  state: {
                    loginInformation: this.loginInformation,
                    boxes: this.boxes
                  }
                }
                this.router.navigate(['overview'], navigationExtras)
              })
          },
            (error) => {
              console.error(error);
              this.presentToastWithOptions(error.error.message);

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

  async register() {

    this.router.navigate(['register-wizard'])

  }

}

