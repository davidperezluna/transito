import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BancoProyectoComponent } from './banco-proyecto.component';

describe('BancoProyectoComponent', () => {
  let component: BancoProyectoComponent;
  let fixture: ComponentFixture<BancoProyectoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BancoProyectoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BancoProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
