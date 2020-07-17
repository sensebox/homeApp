import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams, LoadingController, ToastController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { OsemService } from 'src/app/services/osem.service';
import {AuthenticationService} from 'src/app/services/authentication.service'
@Component({
  selector: 'app-overviewnewbox',
  templateUrl: './overviewnewbox.page.html',
  styleUrls: ['./overviewnewbox.page.scss'],
})
export class OverviewnewboxPage implements OnInit {
  @Input() form: Object;
  @Input() sensors: Array<Object>;
  public newbox: newBox
  private token: string
  private refreshToken: string
  private sensoren:Array<Sensor>

  constructor(
    public modalController: ModalController,
    navParams: NavParams,
    private loadingController: LoadingController,
    public router: Router,
    private authentication: AuthenticationService,
    private toastController: ToastController,
    private osem: OsemService
  ) {
    this.newbox = navParams.data[0]
    console.log(navParams.data)
    this.token = navParams.data[1]
    this.refreshToken = navParams.data[2]
    this.sensoren = navParams.data[3];

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


    this.authentication.addBox(this.newbox, this.token)
      .subscribe((response) => {
        this.osem.getUserBoxes(this.token)
          .subscribe((boxes) => {
            let navigationExtras: NavigationExtras = {
              state: {
                token: this.token,
                boxes: boxes
              }
            }
            loading.dismiss();
            this.router.navigate(['overview'], navigationExtras)
          })
      },
        (error) => {
          loading.dismiss();
          console.error(error);
          this.presentToast(error.message);
        })
  }

  ngOnInit() {
  }

}
