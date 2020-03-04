import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'
import { PnalFuncionario } from '../PnalFuncionario.modelo';
import { PnalFuncionarioService } from '../../../../../services/pnalFuncionario.service';
import { PnalCfgTipoNombramientoService } from '../../../../../services/pnalCfgTipoNombramiento.service';
import { PnalCfgCargoService } from '../../../../../services/pnalCfgCargo.service';
import { UserCfgTipoIdentificacionService } from '../../../../../services/userCfgTipoIdentificacion.service';
import { CfgOrganismoTransitoService } from '../../../../../services/cfgOrganismoTransito.service';
import { LoginService } from '../../../../../services/login.service';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-pnalfuncionario',
  templateUrl: './new.component.html',
  providers: [DatePipe]
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public funcionario: PnalFuncionario;
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

    this.funcionario = new PnalFuncionario(null, null, null, null, null, null, null, null, null, null, null, null, null);

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

  onEnviar() {
    let token = this._loginService.getToken();

    this.funcionario.identificacion = this.identificacion; 
    this.funcionario.idOrganismoTransito = this.organismoTransitoSelected;
    this.funcionario.idTipoNombramiento = this.tipoNombramientoSelected;
    this.funcionario.idCargo = this.cargoSelected;

    this._FuncionarioService.register(this.funcionario, token).subscribe(
      response => {
        if (response.code == 200) {
          this.ready.emit(true);

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
  }

  onSearchCiudadano() {
    swal({
      title: 'Buscando Ciudadano!',
      text: 'Solo tardará unos segundos, por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._loginService.getToken();
    let datos = {
      'identificacion': this.identificacion
    }

    this._FuncionarioService.searchCiudadano(datos, token).subscribe(
      response => {
        if (response.code == 200) {
          this.ciudadano = response.data;
          swal.close();
        } else {
          swal.close();

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
              this.router.navigate(['/dashboard/usuario/userCiudadano']);
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