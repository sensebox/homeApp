import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OverviewnewboxPage } from './overviewnewbox.page';

describe('OverviewnewboxPage', () => {
  let component: OverviewnewboxPage;
  let fixture: ComponentFixture<OverviewnewboxPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewnewboxPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OverviewnewboxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
