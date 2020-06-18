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
  public newbox:newBox
  private token:string
  private refreshToken:string
  constructor(public modalController: ModalController,
    navParams: NavParams,
    private loadingController: LoadingController,
    public router: Router,
    private LoginService: LoginService,
    ) {
    this.newbox = navParams.data[0]
    console.log(navParams.data)
    this.token = navParams.data[1]
    this.refreshToken = navParams.data[2]

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
    

    this.LoginService.registerBox(this.newbox,this.token)
        .subscribe((response)=>{
          this.LoginService.getUserBoxes(this.token)
          .subscribe(boxes => {
            let navigationExtras:NavigationExtras={
              state:{
                token:this.token,
                boxes : boxes
              }
            }
            loading.dismiss();
            this.router.navigate(['overview'],navigationExtras)
          })
        })
  }

  ngOnInit() {
  }

}
