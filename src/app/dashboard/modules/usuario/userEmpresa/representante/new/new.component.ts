import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { UserEmpresaRepresentante } from '../userEmpresaRepresentante.modelo';
import { UserEmpresaRepresentanteService } from '../../../../../../services/userEmpresaRepresentante.service';
import { UserCiudadanoService } from '../../../../../../services/userCiudadano.service';
import { LoginService } from '../../../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-new-representante',
  templateUrl: './new.component.html'
})

export class NewRepresentanteComponent implements OnInit {
  @Output() onReady = new EventEmitter<any>();
  @Input() empresa: any = null;
  public representante: UserEmpresaRepresentante;
  public errorMessage;

  public ciudadano: any = null;
  public identificacion: any = null;

  public formNew = false;
  public formIndex = true;

  constructor(
    private _RepresentanteService: UserEmpresaRepresentanteService,
    private _CiudadanoService: UserCiudadanoService,
    private _LoginService: LoginService,

  ) { }

  ngOnInit() {
    this.representante = new UserEmpresaRepresentante(null, null, null, null);
  }

  onCancelar() {
    this.onReady.emit(true);
  }

  onSearchCiudadano() {
    swal({
      title: 'Buscando ciudadano!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    let datos = {
      'idTipoIdentificacion': 1,
      'identificacion': this.identificacion
    }

    this._CiudadanoService.searchByIdentificacion(datos, token).subscribe(
      response => {
        if (response.status == 'success') {
          if (response.data.ciudadano) {
            this.ciudadano = response.data.ciudadano;
            this.representante.idCiudadano = this.ciudadano.id;
          }

          swal.close();
        } else {
          this.ciudadano = null;
          this.representante.idCiudadano = null;

          swal.close();
        }
        error => {
          this.errorMessage = <any>error;
          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert('Error en la petición');
          }
        }
      }
    );
  }

  onEnviar() {
    let token = this._LoginService.getToken();

    this.representante.idEmpresa = this.empresa.id;

    this._RepresentanteService.register(this.representante, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.onReady.emit(true);

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
}