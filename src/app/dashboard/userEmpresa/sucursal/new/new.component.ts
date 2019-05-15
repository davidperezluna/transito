import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { UserEmpresaSucursal } from '../userEmpresaSucursal.modelo';

import { UserEmpresaSucursalService } from '../../../../services/userEmpresaSucursal.service';
import { LoginService } from '../../../../services/login.service';
import { CfgMunicipioService } from '../../../../services/cfgMunicipio.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-new-sucursal',
  templateUrl: './new.component.html'
})
export class NewSucursalComponent implements OnInit {
  @Output() readySucursal = new EventEmitter<any>();
  @Input() empresa: any = null;
  public sucursal: UserEmpresaSucursal;
  public errorMessage;
  public cerrarFormulario = true;
  public municipios: any;
  public municipioSelected: any;
  public btnVisible = false;
  public formNewSucursal = false;
  public formIndexSucursal = true;

  constructor(
    private _SucursalService: UserEmpresaSucursalService,
    private _MunicipioService: CfgMunicipioService,
    private _LoginService: LoginService,

  ) { }

  ngOnInit() {
    this.sucursal = new UserEmpresaSucursal(null, null, null, null, null, null, null, null, null, null, null);

    this._MunicipioService.select().subscribe(
      response => {
        this.municipios = response;
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );
  }

  onCancelar() {
    this.readySucursal.emit(true);

  }

  onEnviar() {
    let token = this._LoginService.getToken();

    this.sucursal.idMunicipio = this.municipioSelected;
    this.sucursal.idEmpresa = this.empresa.id;

    this._SucursalService.register(this.sucursal, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.readySucursal.emit(true);
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        } else {
          swal({
            title: 'Error!',
            text: response.message,
            type: 'error',
            confirmButtonText: 'Aceptar'
          })
        }
        error => {
          this.errorMessage = <any>error;
          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert('Error en la petición');
          }
        }
      });
  }

  onNewSucursal() {
    this.formNewSucursal = true;
    /* this.btnVisible = true; */
    this.formIndexSucursal = false;
  }

  /* cancelarNewFormulario1() {
    this.btnVisible = false;
    this.formNewSucursal = false
  } */
}