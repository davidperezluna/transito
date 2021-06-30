import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { GdDocumentoService } from '../../../../../services/gdDocumento.service';
import { CfgDepartamentoService } from '../../../../../services/cfgDepartamento.service';
import { CfgMunicipioService } from '../../../../../services/cfgMunicipio.service';
import { GdCfgTipoCorrespondenciaService } from '../../../../../services/gdCfgTipoCorrespondencia.service';
import { GdCfgMedioCorrespondenciaService } from '../../../../../services/gdCfgMedioCorrespondencia.service';
import { CvCdoComparendoService } from '../../../../../services/cvCdoComparendo.service';
import { LoginService } from '../../../../../services/login.service';
import { environment } from 'environments/environment';
import swal from 'sweetalert2';

@Component({
  selector: 'app-show-gddocumento',
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
  public contravencional: any = false;
  public numeroComparendo: any = null;
  public comparendo: any = null;
  
  public datos = {
    'observaciones': null,
    'documento': null,
    'idComparendo': null,
    'idFuncionario': null,
  };

constructor(
  private _DocumentoService: GdDocumentoService,
  private _CfgDepartamentoService: CfgDepartamentoService,
  private _MunicipioService: CfgMunicipioService,
  private _TipoCorrespondenciaService: GdCfgTipoCorrespondenciaService,
  private _MedioCorrespondenciaService: GdCfgMedioCorrespondenciaService,
  private _ComparendoService: CvCdoComparendoService,
  private _LoginService: LoginService,
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

  onSearchComparendo() {
    swal({
      title: 'Buscando comparendo',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    this._ComparendoService.searchByNumber({ 'numero': this.numeroComparendo }, token).subscribe(
      response => {
        if (response.code == 200) {
          this.comparendo = response.data;
          this.datos.idComparendo = this.comparendo.id;

          swal.close();
        } else {
          this.comparendo = null;
          this.datos.idComparendo = null;

          swal({
            title: response.title,
            text: response.message,
            type: response.status,
            confirmButtonText: 'Aceptar'
          });
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

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.fileSelected = event.target.files[0];

      this.file = new FormData();
      this.file.append('file', this.fileSelected);
    }
  }

  onChangedDepartamento(id) {
    let token = this._LoginService.getToken();
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
      let token = this._LoginService.getToken();

      this._TipoCorrespondenciaService.show({ 'idTipoCorrespondencia': event }, token).subscribe(
        response => {
          response = response;
          if (response.code == 200) {
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

      let token = this._LoginService.getToken();
 
      this._DocumentoService.update(this.file, this.datos, token).subscribe(response => {
          if (response.code == 200) {
            //this.ready.emit(true);

            swal({
              title: 'Perfecto!',
              text: response.message,
              type: 'success',
              confirmButtonText: 'Aceptar'
            });
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