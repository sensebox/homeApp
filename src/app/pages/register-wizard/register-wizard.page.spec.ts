import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegisterWizardPage } from './register-wizard.page';

describe('RegisterWizardPage', () => {
  let component: RegisterWizardPage;
  let fixture: ComponentFixture<RegisterWizardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterWizardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterWizardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
