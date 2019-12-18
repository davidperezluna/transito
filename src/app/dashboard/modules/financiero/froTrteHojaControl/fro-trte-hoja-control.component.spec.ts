import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FroTrteHojaControlComponent } from './froTrteHojaControl.component';

describe('FroTrteHojaControlComponent', () => {
  let component: FroTrteHojaControlComponent;
  let fixture: ComponentFixture<FroTrteHojaControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FroTrteHojaControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FroTrteHojaControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
