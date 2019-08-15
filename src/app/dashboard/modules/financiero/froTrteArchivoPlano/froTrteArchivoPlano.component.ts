import { Component, OnInit } from '@angular/core';
import { CvMedidaCautelarService } from '../../../../services/cvMedidaCautelar.service';
import { FroTrteSolicitudService } from '../../../../services/froTrteSolicitud.service';
import { LoginService } from '../../../../services/login.service';

@Component({
  selector: 'app-fro-trte-archivo-plano',
  templateUrl: './froTrteArchivoPlano.component.html',
  styleUrls: ['./froTrteArchivoPlano.component.css']
})

export class FroTrteArchivoPlanoComponent implements OnInit {

  public tiposReporte = [
    { value: 1, label: 'RADICACIONES DE CUENTA' },
    { value: 2, label: 'PRENDAS' },
    { value: 3, label: 'MEDIDAS CAUTELARES' },
  ];

  public datos = {
    'tipoReporte': null,
    'fechaInicial': null,
    'fechaFinal': null,
  }

  constructor(
    private _MedidaCautelarService: CvMedidaCautelarService,
    private _FroTrteSolicitudService: FroTrteSolicitudService,
    private _LoginService: LoginService,
  ) {}

  ngOnInit() {
  }

  onEnviar() {
    let token = this._LoginService.getToken();
    let identity = this._LoginService.getIdentity();
    
  }
}
