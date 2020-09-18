import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { SettingsComponent } from '../../components/settings/settings.component';
import { PopoverController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { OsemService } from 'src/app/services/osem.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['./overview.page.scss'],
})
export class OverviewPage implements OnInit {
  boxes: any
  favs: Array<String> = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storage: Storage,
    public popoverController: PopoverController,
    private toastController: ToastController,
    private osem: OsemService
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.boxes = this.router.getCurrentNavigation().extras.state.boxes.data.boxes;
      }
    })
  }

  async presentSettings(ev: any) {
    const popover = await this.popoverController.create({
      component: SettingsComponent,
      event: ev,
      translucent: true
    })

    return await popover.present();
  }

  doRefresh(event) {
    this.storage.get('token').then((token) => {
      this.osem.getUserBoxes(token)
        .subscribe((boxes: any) => {
          this.boxes = boxes.data.boxes;
        })
      this.storage.get('favs').then((favs) => {
        if (favs) this.favs = favs;
      })
    })
      .then(() => {
        this.presentToast("Refresh done!")
        event.target.complete();
      })
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 1000
    });
    toast.present();
  }

  forwardBox(box: Box) {
    let navigationExtras: NavigationExtras = {
      state: {
        box
      }
    }
    this.router.navigate(['box'], navigationExtras)
  }

  forwardSketch(box: Box) {
    let navigationExtras: NavigationExtras = {
      state: {
        box,
      }
    }
    this.router.navigate(['sketch'], navigationExtras)
  }

  ngOnInit() {
    this.storage.get('favs').then((favs) => {
      if (favs) this.favs = favs;
    })
  }


}
