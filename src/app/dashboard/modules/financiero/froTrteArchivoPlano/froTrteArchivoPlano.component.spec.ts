import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FroTrteArchivoPlanoComponent } from './froTrteArchivoPlano.component';

describe('FroTrteArchivoPlanoComponent', () => {
  let component: FroTrteArchivoPlanoComponent;
  let fixture: ComponentFixture<FroTrteArchivoPlanoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FroTrteArchivoPlanoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FroTrteArchivoPlanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
