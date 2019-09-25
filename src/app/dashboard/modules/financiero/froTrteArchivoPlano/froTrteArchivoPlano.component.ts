import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FroTrteSolicitudService } from '../../../../services/froTrteSolicitud.service';
import { CfgOrganismoTransitoService } from '../../../../services/cfgOrganismoTransito.service';
import { CfgModuloService } from '../../../../services/cfgModulo.service';
import { LoginService } from '../../../../services/login.service';
import { environment } from 'environments/environment';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-fro-trte-archivo-plano',
  templateUrl: './froTrteArchivoPlano.component.html'
})

export class FroTrteArchivoPlanoComponent implements OnInit, AfterViewInit {
  public errorMessage;
  
  public docsUrl = environment.docsUrl;
  public organismosTransito;
  public modulos;

  public archivo: any = null;

  public tiposReporte = [
    { value: '1', label: 'INFORMACIÓN DE VEHICULOS' },
    { value: '2', label: 'PROPIETARIOS ACTUALES' },
    { value: '3', label: 'TRAMITES' },
    { value: '4', label: 'MEDIDA CAUTELAR' },
    { value: '5', label: 'CANCELACIÓN MATRICULA' },
    { value: '6', label: 'PRENDAS' },
    { value: '7', label: 'RADICADOS DE CUENTA' },
  ];

  public datos = {
    'tipoReporte': null,
    'idOrganismoTransito': null,
    'idModulo': null,
    'fechaInicial': null,
    'fechaFinal': null,
  }

  constructor(
    private _FroTrteSolicitudService: FroTrteSolicitudService,
    private _OrganismoTransitoService: CfgOrganismoTransitoService,
    private _ModuloService: CfgModuloService,
    private _LoginService: LoginService,
  ) {}

  ngOnInit() {
    this._OrganismoTransitoService.selectSedes().subscribe(
      response => {
        this.organismosTransito = response;
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );
    this._ModuloService.select().subscribe(
      response => {
        this.modulos = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );
  }

  ngAfterViewInit() {
    swal.close();
  }

  onEnviar() {
    let token = this._LoginService.getToken();
    let identity = this._LoginService.getIdentity();

    if (this.datos.tipoReporte) {
      this._FroTrteSolicitudService.createFile(this.datos, token).subscribe(
        response => {
          if(response.code == 200) {
            this.archivo = response.data;

            swal({
              title: response.title,
              text: response.message,
              type: response.status,
              confirmButtonText: 'Aceptar'
            });
          } else {
            swal({
              title: response.title,
              text: response.message,
              type: response.status,
              confirmButtonText: 'Aceptar'
            });
          }
          /* if (response.type) {
            var fileURL = URL.createObjectURL(response);
            window.open(fileURL);
          } else {
            swal({
              title: 'Error!',
              text: 'No existen registros para la generación del archivo plano en el rango de las fechas estipuladas.',
              type: 'error',
              confirmButtonText: 'Aceptar'
            });
            error => {
              this.errorMessage = <any>error;

              if (this.errorMessage != null) {
                console.log(this.errorMessage);
                alert("Error en la petición");
              }
            }
          } */
        },
        error => {
          this.errorMessage = <any>error;

          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }
      );
    }else{

    }
  }
}
