import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'
import { GdDocumento } from '../gdDocumento.modelo';
import { GdDocumentoService } from '../../../services/gdDocumento.service';
import { UserCfgTipoIdentificacionService } from '../../../services/userCfgTipoIdentificacion.service';
import { LoginService } from '../../../services/login.service';
import { environment } from 'environments/environment';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Output() onShow = new EventEmitter<any>();
  public documento: GdDocumento;

  public errorMessage;

  public peticionarios: any;

  public formNewDocumento: any = true;

  public tiposIdentificacion: any;

  public date: any;

  public file: any = null;
  public fileSelected: File = null;

  public docsUrl = environment.docsUrl;

  public peticionario = {
    'idTipoIdentificacion': null,
    'identificacion': null,
    'nombres': null,
    'apellidos': null,
    'entidadCargo': null,
    'entidadNombre': null,
    'numeroOficio': null,
  };

  constructor(
    private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
    private _DocumentoService: GdDocumentoService,
    private _loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.documento = new GdDocumento(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    this.date = new Date();

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
  }

  onCancelar() {
    this.ready.emit(true);
  }

  onRegister() {
    let token = this._loginService.getToken();

    this._DocumentoService.register(this.documento, token).subscribe(
      response => {
        if (response.status == 'success') {
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
          
          this.onShow.emit(response.data);
        } else {
          swal({
            title: 'Error!',
            text: response.message,
            type: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
        error => {
          this.errorMessage = <any>error;

          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }
      }
    );
  }
}