import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLcCfgRestriccionComponent } from './userLcCfgRestriccion.component';

describe('UserLcCfgRestriccionComponent', () => {
  let component: UserLcCfgRestriccionComponent;
  let fixture: ComponentFixture<UserLcCfgRestriccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLcCfgRestriccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLcCfgRestriccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
