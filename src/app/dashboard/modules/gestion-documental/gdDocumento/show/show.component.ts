import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { GdDocumentoService } from '../../../../../services/gdDocumento.service';
import { CfgDepartamentoService } from '../../../../../services/cfgDepartamento.service';
import { CfgMunicipioService } from '../../../../../services/cfgMunicipio.service';
import { GdCfgTipoCorrespondenciaService } from '../../../../../services/gdCfgTipoCorrespondencia.service';
import { GdCfgMedioCorrespondenciaService } from '../../../../../services/gdCfgMedioCorrespondencia.service';
import { LoginService } from '../../../../../services/login.service';
import { environment } from 'environments/environment';
import swal from 'sweetalert2';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
})
export class ShowComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Input() documento: any = null;
  public errorMessage;

  public docsUrl = environment.docsUrl;

  public date: any;

  public file: any = null;
  public fileSelected: File = null;

  public editable = false;

  public departamentos: any;
  public municipios: any;
  public departamentoSelected: any;
  public tiposCorrespondencia: any;
  public mediosCorrespondencia: any;
  
  public datos = {
    'observaciones': null,
    'idFuncionario': null,
    'documento': null
  };

constructor(
  private _DocumentoService: GdDocumentoService,
  private _CfgDepartamentoService: CfgDepartamentoService,
  private _MunicipioService: CfgMunicipioService,
  private _TipoCorrespondenciaService: GdCfgTipoCorrespondenciaService,
  private _MedioCorrespondenciaService: GdCfgMedioCorrespondenciaService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.date = new Date();

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

  onCancelar(){
    this.ready.emit(true);
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

  onChangedTipoCorrespondencia(event) {
    if (event !== undefined) {
      let token = this._loginService.getToken();

      this._TipoCorrespondenciaService.show({ 'idTipoCorrespondencia': event }, token).subscribe(
        response => {
          response = response;
          if (response.status == 'success') {
            this.editable = response.data.editable;
            this.documento.vigencia = response.data.diasVigencia;
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

  onRegister(){
    if (this.fileSelected) {
      this.datos.documento = this.documento;

      let token = this._loginService.getToken();

      this._DocumentoService.update(this.file, this.datos, token).subscribe(
        response => {
          if (response.status == 'success') {
            swal({
              title: 'Perfecto!',
              text: response.message,
              type: 'success',
              confirmButtonText: 'Aceptar'
            });

            this.ready.emit(true);
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
    } else {
      swal({
        title: 'Error!',
        text: 'Debe adjuntar el documento escaneado.',
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }
}