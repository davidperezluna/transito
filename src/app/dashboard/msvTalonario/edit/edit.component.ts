import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { VhloCfgPlacaService } from '../../../services/vhloCfgPlaca.service';
import { LoginService } from '../../../services/login.service';
import { CfgOrganismoTransitoService } from '../../../services/cfgOrganismoTransito.service';
import { MsvTalonarioService } from '../../../services/msvTalonario.service';
import swal from 'sweetalert2';
import { MsvTalonario } from '../msvTalonario.modelo';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent {
  @Output() ready = new EventEmitter<any>();
  @Input() talonario: any = null;
  public errorMessage;
  public respuesta;
  public organismosTransito: any;
  public organismoTransitoSuccess = false;
  public talonarioReady = false;
  public organismoTransitoSelected: any;
  public validado = false;
  public organismoTransitoReady = false;
  public organismoTransito: any;
  // public tipoIdentificacion: Array<any>

  constructor(
    private _CfgPlacaService: VhloCfgPlacaService,
    private _loginService: LoginService,
    private _OrganismoTransitoService: CfgOrganismoTransitoService,
    private _msvTalonarioService: MsvTalonarioService,
  ) {
    //   this.tipoIdentificacion = [
    //     {value: 'CC', label: 'Cédula de ciudadanía'},
    //     {value: 'TE', label: 'Tarjeta de extranjería'},
    //     {value: 'CE', label: 'Cédula de extranjería'},
    //     {value: 'P', label: 'Pasaporte'},
    // ];
  }

  ngOnInit() {
    this._OrganismoTransitoService.selectSedes().subscribe(
      response => {
        this.organismosTransito = response;
        setTimeout(() => {
          this.organismoTransitoSelected = [this.talonario.organismoTransito.id];
        });
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


  onCancelar() {
    this.ready.emit(true);
  }

  onEnviar() {
    let token = this._loginService.getToken();
    this.talonario.idOrganismoTransito = this.organismoTransitoSelected;
    this._msvTalonarioService.register(this.talonario, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'El registro se ha modificado con exito',
            type: 'success',
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

  onCalcularTotal() {
    let ini, fin, total;

    ini = this.talonario.rangoini;
    fin = this.talonario.rangofin;
    total = (fin - ini);

    if (total < 0) {
      total = 0;
    }
    this.talonario.total = total;
  }

  changedOrganismoTransito(e) {

    this.validado = false;
    if (e) {
      let token = this._loginService.getToken();
      this._OrganismoTransitoService.show(token, e).subscribe(
        response => {
          this.organismoTransito = response;
          this.organismoTransitoReady = true;
          //          this.msvTalonario.rangoini = this.sedeOperativa.data.
          //this.comparendo.numeroOrden = this.sedeOperativa.data.codigoDivipo;
        },
        error => {
          this.errorMessage = <any>error;

          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }
      );

      this._msvTalonarioService.showMsvTalonarioPorOrganismoTransito(token, e).subscribe(
        response => {
          this.organismoTransitoSuccess = true;
          if (response.status == "success") {

            this.talonario = response.data;

            this.talonarioReady = true;
            this.talonario.fechaAsignacion = this.talonario.fechaAsignacion;

            //this.comparendo.numeroOrden = this.sedeOperativa.data.codigoDivipo;
            console.log(this.talonario);
          }
          else if (response.status == "vacio") {
            this.talonario = new MsvTalonario(0, 0, 0, "", "", 0);
          }
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
  }

}