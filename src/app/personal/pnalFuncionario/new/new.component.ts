import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'
import { PnalFuncionario } from '../pnalFuncionario.modelo';
import { PnalFuncionarioService } from '../../../services/pnalFuncionario.service';
import { PnalCfgTipoNombramientoService } from '../../../services/pnalCfgTipoNombramiento.service';
import { PnalCfgCargoService } from '../../../services/pnalCfgCargo.service';
import { UserCfgTipoIdentificacionService } from '../../../services/userCfgTipoIdentificacion.service';
import { CfgOrganismoTransitoService } from '../../../services/cfgOrganismoTransito.service';
import { LoginService } from '../../../services/login.service';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  providers: [DatePipe]
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public funcionario: PnalFuncionario;
  public formConfirm = false;
  public formPdf = false;
  public pdf: any;
  public tiposNombramiento: any;
  public tipoNombramientoSelected: any;
  public cargos: any;
  public cargoSelected: any;
  public tiposIdentificacion: any;
  public tipoIdentificacionSelected: any;
  public organismosTransito: any;
  public organismoTransitoSelected: any;
  
  public ciudadano: any;
  public identificacion: any;

  public errorMessage;

  constructor(
    private _FuncionarioService: PnalFuncionarioService,
    private _TipoNombramientoService: PnalCfgTipoNombramientoService,
    private _CargoService: PnalCfgCargoService,
    private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
    private _OrganismoTransitoService: CfgOrganismoTransitoService,
    private _loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {

    this.funcionario = new PnalFuncionario(null, null, null, null, null, null, null, null, false, null, null, null, null, null, null, null);

    this._TipoNombramientoService.select().subscribe(
      response => {
        this.tiposNombramiento = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );

    this._CargoService.select().subscribe(
      response => {
        this.cargos = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );

    this._TipoIdentificacionService.select().subscribe(
      response => {
        this.tiposIdentificacion = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );

    this._OrganismoTransitoService.selectSedes().subscribe(
      response => {
        this.organismosTransito = response;
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
    this.ready.emit(true);
  }

  onCancelarConfirm() {
    this.formConfirm = false;
  }

  onEnviar() {
    let token = this._loginService.getToken();

    this.funcionario.identificacion = this.identificacion; 
    this.funcionario.idOrganismoTransito = this.organismoTransitoSelected;
    this.funcionario.idTipoNombramiento = this.tipoNombramientoSelected;
    this.funcionario.idCargo = this.cargoSelected;

    if (this.funcionario.activo == 'true') {
      this._FuncionarioService.register(this.funcionario, token).subscribe(
        response => {
          this.formConfirm = false;
          this.formPdf = true;

          if (response.status == 'success') {
            this.ready.emit(true);
            swal({
              title: 'Perfecto!',
              text: 'Registro exitoso!',
              type: 'success',
              confirmButtonText: 'Aceptar'
            });
          } else {
            swal({
              title: 'Error!',
              text: 'El funcionario ya se encuentra registrado',
              type: 'error',
              confirmButtonText: 'Aceptar'
            })
          }
          error => {
            this.errorMessage = <any>error;
            if (this.errorMessage != null) {
              console.log(this.errorMessage);
              alert("Error en la petición");
            }
          }
        });
    } else {
      this.formConfirm = true;
      this.formPdf = false;
    }
  }

  onConfirm() {
    let token = this._loginService.getToken();

    if (this.funcionario.inhabilidad == 'true') {
      this._FuncionarioService.register(this.funcionario, token).subscribe(
        response => {
          this.formConfirm = false;
          this.formPdf = true;

          if (response.status == 'success') {
            this.ready.emit(true);
            swal({
              title: 'Perfecto!',
              text: 'Registro exitoso!',
              type: 'success',
              confirmButtonText: 'Aceptar'
            });
          } else {
            swal({
              title: 'Error!',
              text: 'El funcionario ya se encuentra registrado',
              type: 'error',
              confirmButtonText: 'Aceptar'
            })
          }
          error => {
            this.errorMessage = <any>error;
            if (this.errorMessage != null) {
              console.log(this.errorMessage);
              alert("Error en la petición");
            }
          }
        });
    } else {
      this.formConfirm = false;
      this.formPdf = false;
    }
  }

  onSearchCiudadano() {
    let token = this._loginService.getToken();
    let datos = {
      'identificacion': this.identificacion
    }

    this._FuncionarioService.searchCiudadano(datos, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.ciudadano = response.data;
        } else {
          swal({
            title: 'Alerta',
            text: response.message,
            type: 'warning',
            showCancelButton: true,
            focusConfirm: true,
            confirmButtonText:
              '<i class="fa fa-thumbs-up"></i> Registrar',
            confirmButtonAriaLabel: 'Thumbs up, great!',
            cancelButtonText:
              '<i class="fa fa-thumbs-down"></i> Cancelar',
            cancelButtonAriaLabel: 'Thumbs down',
          }).then((result) => {
            if (result.value) {
              this.router.navigate(['/dashboard/userCiudadano']);
            }
          });

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