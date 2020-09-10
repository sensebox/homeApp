import { Component } from '@angular/core';
import { LoadingController, Platform } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular'
import { AuthenticationService } from 'src/app/services/authentication.service';
import { OsemService } from 'src/app/services/osem.service';
import { Storage } from '@ionic/storage'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage {
  private loginInformation;
  private boxes;
  private keepSignedIn: boolean

  constructor(

    private router: Router,
    private storage: Storage,
    private platform: Platform,
    private authentication: AuthenticationService,
    private osem: OsemService,
    public loadingController: LoadingController,
    public modalController: ModalController,
    public toastController: ToastController


  ) {
    this.platform.ready().then(() => {
      console.log("ready");
      this.storage.get('useremail').then((email) => {
        if (email) {
          this.storage.get('userpw').then((pw) => {
            console.log("credentials saved; logging in..")
            this.loginAndForward(email, pw);
          })
        }
      })
    })
  }


  async presentToastWithOptions(content) {
    const toast = await this.toastController.create({
      message: content,
      position: 'bottom',
      duration: 4000
    });
    toast.present();
  }

  private async submitLogin(form) {
    try {
      // Try to login on success request data from all available boxes
      this.loginAndForward(form.value.email, form.value.password)

      this.keepSignedIn ?
        this.saveCredentials(form.value.email, form.value.password) :
        this.removeCredentials()
    }
    catch (err) {
      console.log(err);
    }

  }

  private async loginAndForward(email, password) {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    })

    loading.present();
    this.authentication.submitLogin(email, password)
      .subscribe((loginInformation) => {
        this.loginInformation = <loginResponse>loginInformation
        this.storage.set('token', this.loginInformation.token)
        this.storage.set('refreshToken', this.loginInformation.refreshToken)
        this.osem.getUserBoxes(this.loginInformation.token)
          .subscribe(boxes => {
            this.boxes = boxes
            // this.storage.set('login')

            let navigationExtras: NavigationExtras = {
              state: {
                boxes: this.boxes
              }
            }
            loading.dismiss();

            this.router.navigate(['overview'], navigationExtras)
          })
      },
        (error) => {
          console.error(error);
          loading.dismiss();
          console.log(error.message)
          this.presentToastWithOptions(error.error.message);

        })

  }

  private saveCredentials(email: string, password: string) {
    // set password and email in internal storage 
    console.log("saving");
    this.storage.set('useremail', email)
    this.storage.set('userpw', password)
  }

  private removeCredentials() {
    console.log("removing credentials");
    this.storage.remove('useremail');
    this.storage.remove('userpw');
  }

  private forwardRegister() {
    this.router.navigate(['register-wizard']);
  }

}

