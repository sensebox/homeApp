import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OtaWizardPage } from './ota-wizard.page';

describe('OtaWizardPage', () => {
  let component: OtaWizardPage;
  let fixture: ComponentFixture<OtaWizardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtaWizardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OtaWizardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
