import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams, LoadingController } from '@ionic/angular';
import { Router,NavigationExtras } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-overviewnewbox',
  templateUrl: './overviewnewbox.page.html',
  styleUrls: ['./overviewnewbox.page.scss'],
})
export class OverviewnewboxPage implements OnInit {
  @Input() form: Object;
  @Input() sensors: Array<Object>;
  private box:any
  private sensorlist:any
  private token:string
  private refreshToken:string
  constructor(public modalController: ModalController,
    navParams: NavParams,
    private loadingController: LoadingController,
    public router: Router,
    private LoginService: LoginService,
    ) {
    this.box = navParams.data[0]
    this.sensors = navParams.data[1]
    this.token = navParams.data[2]
    this.refreshToken = navParams.data[3]

  }
  dismissModal() {
    this.modalController.dismiss();
  }
  async handleConfirmation() {
    // forward to api 
    this.modalController.dismiss()

    const loading = await this.loadingController.create({
      message: 'Registering new box ...',
    })
    await loading.present();

    this.LoginService.registerBox(this.box,this.token)
        .subscribe((response)=>{
          this.LoginService.getUserBoxes(this.token)
          .subscribe(boxes => {
            let navigationExtras:NavigationExtras={
              state:{
                token:this.token,
                boxes : boxes
              }
            }
            this.router.navigate(['overview'],navigationExtras)
          })
        })

    loading.onDidDismiss().then(() => this.router.navigate(['overview']))
  }

  ngOnInit() {
  }

}
