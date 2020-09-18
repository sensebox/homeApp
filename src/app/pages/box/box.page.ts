import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ViewChildren, QueryList, Directive, Input } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Chart } from 'chart.js'
import { ToastController } from '@ionic/angular';
import { OsemService } from 'src/app/services/osem.service';
import { Storage } from '@ionic/storage';


// @Directive({selector: 'canvas'})
// export class Canvas {
//   @Input() id!: string;
// }


@Component({
  selector: 'app-box',
  templateUrl: './box.page.html',
  styleUrls: ['./box.page.scss'],
})
export class BoxPage implements OnInit, AfterViewInit {

  @ViewChildren('canvas') canvasses!: QueryList<any>

  elements: Array<any> = [];

  private favorit: Boolean;
  public date: string


  box: Box;
  private newBox: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private osem: OsemService,
    private storage: Storage,
    public toastController: ToastController
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.box = this.router.getCurrentNavigation().extras.state.box;
        if (this.box.createdAt === this.box.updatedAt) {
          this.newBox = true;
        }
        else {
          let date = new Date(this.box.lastMeasurementAt);
          this.date = date.toLocaleString();
        }

      }
    })
  }
  forwardSensor(sensor) {
    let navigationExtras: NavigationExtras = {
      state: {
        sensor
      }
    }
    this.router.navigate(['sensor'], navigationExtras)
  }

  ngOnInit() {
    if (this.newBox) {
      console.log("smides")
    }
  }

  addFavorit() {
    this.favorit = true;
    this.storage.get('favs').then((favs) => {
      if (favs) {
        favs.push(this.box.name);
        this.storage.set('favs', favs);
      }
      else {
        const arr = [this.box.name]
        this.storage.set('favs', arr);
      }
    })


  }

  removeFavorit() {
    this.storage.get('favs').then((favs) => {
      const index = favs.indexOf(this.box.name);
      favs.splice(index, 1);
      this.storage.set('favs', favs);
      this.favorit = false;

    })
  }

  forwardSketch(box) {
    let navigationExtras: NavigationExtras = {
      state: {
        box,
      }
    }
    this.router.navigate(['sketch'], navigationExtras)
  }

  async presentToast(content) {
    const toast = await this.toastController.create({
      message: content,
      duration: 2000
    });
    toast.present();
  }

  getCharts() {
    this.box.sensors.map((sensor, index) => {
      let fromLastMeasurement = new Date(sensor.lastMeasurement.createdAt);
      let pastDate = fromLastMeasurement.getDate() - 1
      fromLastMeasurement.setDate(pastDate)

      this.osem.getMeanMeasurements(this.box._id, sensor.title, fromLastMeasurement.toISOString(), sensor.lastMeasurement.createdAt, 3600000)
        .subscribe(
          results => {
            if (!results[0]) {
              this.presentToast(`No values for some sensors`)
            } else {
              let labels = [];
              let data = [];

              Object.keys(results[0]).map((key, index) => {
                if (key === 'sensorId') return;
                let labelDate = new Date(key);
                if (index == 1) {
                  labels.push(labelDate.toLocaleDateString())
                  data.push(results[0][key])
                }
                else {
                  labels.push(labelDate.getHours())
                  data.push(results[0][key])
                }
              })

              new Chart(this.elements[index], {
                type: "line",
                data: {
                  labels: labels,
                  datasets: [{
                    data: data,
                    label: sensor.title,
                    borderColor: "#4EAF47",
                    fill: false
                  }
                  ]
                },
                options: {
                  title: {
                    text: sensor.title,
                    display: true,
                    fontColor: "#333"
                  },
                  elements: {
                    point: {
                      radius: 0
                    }
                  },
                  scales: {
                    xAxes: [{
                      gridLines: {
                        display: false
                      },
                      ticks: {
                        fontColor: "#333",
                        autoSkip: true,
                        maxTicksLimit: 2,
                        maxRotation: 0,
                        callback: function (value, index, values) {
                          if (index == 0) return value
                          return value + ":00"
                        }
                      }
                    }],
                    yAxes: [{
                      gridLines: {
                        display: true,
                        drawBorder: false

                      },
                      ticks: {
                        display: true,
                        fontColor: "#333",
                        maxTicksLimit: 9,
                        callback: function (value, index, values) {
                          return value + sensor.unit
                        }

                      }
                    }]
                  },
                  legend: {
                    display: false
                  }
                }
              })
            }
          })

    })


  }

  doRefresh(event) {
    this.getCharts();
    event.target.complete();
    this.presentToast("Refresh done!")
  }

  ngAfterViewInit() {
    if (this.newBox) {
      console.log("new box no measurements");
      return;
    }
    this.box.sensors.map((sensor) => {
      this.elements.push(document.getElementById(sensor.title + 'Canvas'))
    })

    this.storage.get('favs').then((favs) => {
      if (favs) {
        const index = favs.indexOf(this.box.name)
        if (index == -1) {
          this.favorit = false;
        }
        else {
          this.favorit = true;
        }
      }
      else {
        this.favorit = false;
      }
    })

    this.getCharts();
  }

}
