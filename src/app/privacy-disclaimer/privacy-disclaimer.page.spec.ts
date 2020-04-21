import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrivacyDisclaimerPage } from './privacy-disclaimer.page';

describe('PrivacyDisclaimerPage', () => {
  let component: PrivacyDisclaimerPage;
  let fixture: ComponentFixture<PrivacyDisclaimerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivacyDisclaimerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrivacyDisclaimerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
