import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams, LoadingController, ToastController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { OsemService } from 'src/app/services/osem.service';
import { AuthenticationService } from 'src/app/services/authentication.service'
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-overviewnewbox',
  templateUrl: './overviewnewbox.page.html',
  styleUrls: ['./overviewnewbox.page.scss'],
})
export class OverviewnewboxPage implements OnInit {
  @Input() form: Object;
  @Input() sensors: Array<Object>;
  public newbox: newBox
  private token
  private refreshToken
  private sensoren: Array<Sensor>

  constructor(
    public modalController: ModalController,
    navParams: NavParams,
    private loadingController: LoadingController,
    public router: Router,
    private authentication: AuthenticationService,
    private toastController: ToastController,
    private osem: OsemService,
    private storage: Storage
  ) {
    this.newbox = navParams.data[0]
    this.sensoren = navParams.data[1];
    this.token = this.storage.get('token').then((token) => token)
    console.log(this.token)
    this.refreshToken = this.storage.get('refreshToken').then((refreshToken) => refreshToken)

  }
  dismissModal() {
    this.modalController.dismiss();
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 5000
    });
    toast.present();
  }

  async handleConfirmation() {

    // forward to api 
    this.modalController.dismiss()

    const loading = await this.loadingController.create({
      message: 'Registering new box ...',
    })
    await loading.present();

    this.storage.get('token').then((token) => {
      this.authentication.addBox(this.newbox, token)
        .subscribe((response) => {
          this.osem.getUserBoxes(token)
            .subscribe((boxes) => {
              let navigationExtras: NavigationExtras = {
                state:
                {
                  boxes: boxes
                }
              }
              loading.dismiss();
              this.router.navigate(['overview'], navigationExtras)
            }),
            (error) => {
              loading.dismiss();
              console.error(error);
              this.presentToast(error.message);
            }
        })
    })
  }



  ngOnInit() {
  }

}
