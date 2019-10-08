import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'
import { GdDocumento } from '../gdDocumento.modelo';
import { GdDocumentoService } from '../../../../../services/gdDocumento.service';
import { UserCfgTipoIdentificacionService } from '../../../../../services/userCfgTipoIdentificacion.service';
import { LoginService } from '../../../../../services/login.service';
import { environment } from 'environments/environment';
import { CfgDepartamentoService } from '../../../../../services/cfgDepartamento.service';
import { GdCfgTipoCorrespondenciaService } from '../../../../../services/gdCfgTipoCorrespondencia.service';
import { GdCfgMedioCorrespondenciaService } from '../../../../../services/gdCfgMedioCorrespondencia.service';
import { CfgMunicipioService } from '../../../../../services/cfgMunicipio.service';
import { PnalFuncionarioService } from '../../../../../services/pnalFuncionario.service';

import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-exit-gddocumento',
  templateUrl: './exit.component.html' 
})
export class ExitComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Output() onShow = new EventEmitter<any>();
  public documento: GdDocumento;

  public errorMessage;

  public peticionarios: any;

  public formNewDocumento: any = true;

  public tiposIdentificacion: any;
  public editable = false;
  

  public date: any;
  public departamentos: any;
  public municipios: any;
  public mediosCorrespondencia: any;
  public tiposCorrespondencia: any;

  public file: any = null;
  public fileSelected: File = null;

  public docsUrl = environment.docsUrl;

  public datos = {
    'idComparendo': null,
    'idFuncionario': null,
    'idMedioCorrespondenciaEnvio': null,
    'fechaEnvio': null,
    'detalleEnvio': null,
    'documento': null,
  };

  constructor(
    private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
    private _DocumentoService: GdDocumentoService,
    private _loginService: LoginService,
    private _CfgDepartamentoService: CfgDepartamentoService,
    private _TipoCorrespondenciaService: GdCfgTipoCorrespondenciaService,
    private _MedioCorrespondenciaService: GdCfgMedioCorrespondenciaService,
    private _MunicipioService: CfgMunicipioService,
    private _FuncionarioService: PnalFuncionarioService,
  ) { }

  ngOnInit() {
    this.documento = new GdDocumento(null,null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    this.date = new Date();

    let identity = this._loginService.getIdentity();
    let token = this._loginService.getToken();

    this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
      response => {
        if (response.code == 200) {
          this.datos.idFuncionario = response.data.id; 
          
          swal.close();
        } else {
          this.datos.idFuncionario = null;

          swal({
              title: 'Error!',
              text: 'Usted no tiene permisos para realizar tramites',
              type: 'error',
              confirmButtonText: 'Aceptar'
          });
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
    this._CfgDepartamentoService.select().subscribe(
      response => {
        this.departamentos = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );

    this._TipoCorrespondenciaService.select().subscribe(
      response => {
        this.tiposCorrespondencia = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );

    this._MedioCorrespondenciaService.select().subscribe(
      response => {
        this.mediosCorrespondencia = response;
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

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.fileSelected = event.target.files[0];

      this.file = new FormData();
      this.file.append('file', this.fileSelected);
    }
  }

  onChangedDepartamento(id) {
    let token = this._loginService.getToken();
    if (id) {
      this._MunicipioService.selectByDepartamento({'idDepartamento':id}, token).subscribe(
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
  }

  onCancelar() {
    this.ready.emit(true);
  }

  onRegister() {
    let token = this._loginService.getToken();
    this.datos.documento = this.documento;

    this._DocumentoService.exit(this.file, this.datos, token).subscribe(
      response => {
        if (response.code == 200) {
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