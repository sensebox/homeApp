import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SketchPage } from './sketch.page';

describe('SketchPage', () => {
  let component: SketchPage;
  let fixture: ComponentFixture<SketchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SketchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SketchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
