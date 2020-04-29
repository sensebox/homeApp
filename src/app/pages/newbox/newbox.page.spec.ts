import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewboxPage } from './newbox.page';

describe('NewboxPage', () => {
  let component: NewboxPage;
  let fixture: ComponentFixture<NewboxPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewboxPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewboxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
