import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { GdDocumentoService } from '../../../../../services/gdDocumento.service';
import { GdTrazabilidadService } from '../../../../../services/gdTrazabilidad.service';
import { GdCfgMedioCorrespondenciaService } from '../../../../../services/gdCfgMedioCorrespondencia.service';
import { CfgOrganismoTransitoService } from '../../../../../services/cfgOrganismoTransito.service';
import { LoginService } from '../../../../../services/login.service';
import { environment } from 'environments/environment';
import swal from 'sweetalert2';

@Component({
  selector: 'app-print-gddocumento',
  templateUrl: './print.component.html',
})
export class PrintComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Input() documento: any = null;
  public docsUrl = environment.docsUrl;
  public errorMessage;

  public date: any;
  

  public trazabilidades: any = null;
  public mediosCorrespondencia: any;
  public organismosTransito: any;

public datos = {
  'fechaEnvio': null,
  'detalleEnvio': null,
  'observaciones': null,
  'idMedioCorrespondenciaEnvio': null,
  'idOrganismoTransito': null,
  'idDocumento': null,
};

constructor(
  private _DocumentoService: GdDocumentoService,
  private _TrazabilidadService: GdTrazabilidadService,
  private _MedioCorrespondenciaService: GdCfgMedioCorrespondenciaService,
  private _OrganismoTransitoService: CfgOrganismoTransitoService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.date = new Date();

    let token = this._loginService.getToken();

    this._TrazabilidadService.searchResponseByDocumento({ 'idDocumento':this.documento.id }, token).subscribe(
      response => {
        this.trazabilidades = response.data;
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

  onCancelar(){
    this.ready.emit(true);
  }

  onEnviar(){
    this.datos.idDocumento = this.documento.id;

    let token = this._loginService.getToken();

		this._DocumentoService.print(this.datos, token).subscribe(
			response => {
        if(response.code == 200){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: 'Error!',
            text: response.message,
            type: 'error',
            confirmButtonText: 'Aceptar'
          })
        }
			error => {
					this.errorMessage = <any>error;

					if(this.errorMessage != null){
						console.log(this.errorMessage);
						alert("Error en la petición");
					}
				}

		});
  }
}