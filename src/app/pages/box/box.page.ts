import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ViewChildren, QueryList, Directive, Input } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { Chart } from 'chart.js'


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
  @ViewChild("TemperaturCanvas", { static: false }) tempCanvas2: ElementRef
  @ViewChild("tempCanvas", { static: false }) tempCanvas: ElementRef
  @ViewChildren('canvas') canvasses!:QueryList<any>

  elements:Array<any> = [];

  private tempChart: Chart;
  private tempData: Array<Number>;
  private tempLabels: Array<string>;
  private date:string
  box: Box;
  constructor(private route: ActivatedRoute, private router: Router, private LoginService: LoginService,
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.box = this.router.getCurrentNavigation().extras.state.box;
        let date = new Date(this.box.lastMeasurementAt);
        this.date = date.toLocaleTimeString();

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
  }

  getCharts() {

    const now = new Date()
    let from = new Date()
    let pastDate = from.getDate() - 1
    from.setDate(pastDate)

    this.box.sensors.map((sensor,index) => {
      this.LoginService.getMeanMeasurements(this.box._id, sensor.title, from.toISOString(), now.toISOString(), 3600000)
        .subscribe((results) => {
          let labels = [];
          let data = [];

          Object.keys(results[0]).map((key, index) => {
            if (key === 'sensorId') return;
            let labelDate = new Date(key);
            labels.push(labelDate.getHours())
            data.push(results[0][key])
          })

          new Chart(this.elements[index], {
            type: "line",
            data: {
              labels: labels,
              datasets: [{
                data: data,
                label: sensor.title,
                borderColor: "#ffffff",
                fill: false
              }
              ]
            },
            options: {
              title: {
                text: sensor.title,
                display: true,
                fontColor: "#ffffff"
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
                    fontColor: "#ffffff",
                    autoSkip: true,
                    maxTicksLimit: 6,
                    maxRotation: 0,
                    callback: function (value, index, values) {
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
                    fontColor: "#ffffff",
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
        })
    })


  }

  ngAfterViewInit() {
    this.box.sensors.map((sensor)=>{
      this.elements.push(document.getElementById(sensor.title+'Canvas'))
    })

    this.getCharts();
  }

}
