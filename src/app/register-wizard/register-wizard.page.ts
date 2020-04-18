import { Component, OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-register-wizard',
  templateUrl: './register-wizard.page.html',
  styleUrls: ['./register-wizard.page.scss'],
})
export class RegisterWizardPage implements OnInit {
  slideOpts = {}
  constructor() { }

  ngOnInit() {
  }

}


// names for the slide indices for easier access
enum RegisterSlides {
  Register = 0,
  Loading = 1,
  NewBox = 2
}
