import { Component, OnInit, NgModule } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { LoginService } from '../login.service';
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
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
  }

  submitLogin(form): void {


    if (this.validatePassword(form)) {
      try {
        // Try to login on success request data from all available boxes
        this.LoginService.submitLogin(form.value.email, form.value.password)
          .subscribe(loginInformation => {
            this.loginInformation = <loginResponse>loginInformation
            this.LoginService.getUserBoxes(this.loginInformation.token)
              .subscribe(boxes => this.boxes = boxes)
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

}

type loginResponse = {
  code: string,
  data: Object,
  message: string,
  refreshToken: string,
  token: string
}
