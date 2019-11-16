import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { CvAudiencia } from '../cvAudiencia.modelo';
import { CvAudienciaService } from '../../../../../services/cvAudiencia.service';
import { CvCdoComparendoService } from '../../../../../services/cvCdoComparendo.service';
import { CvAuCfgTipoService } from '../../../../../services/cvAuCfgTipo.service';
import { UserCiudadanoService } from '../../../../../services/userCiudadano.service';
import { LoginService } from '../../../../../services/login.service';
import { environment } from 'environments/environment'
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-new-cvaudiencia',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit, AfterViewInit {
  @Output() ready = new EventEmitter<any>();
  public audiencia: CvAudiencia;
  public errorMessage;

  public apiUrl = environment.apiUrl;
  
  public numeroComparendo: any = null;
  public comparendo: any = null;
  public audienciaLast: any = null;
  public fechaDisponible: any = null;
  public audiencias: any = null;
  public tipos: any = null;
  public apoderado: any;
  public datosApoderado: any;

  public formIndex: any;
  public formApoderado: any;

constructor(
  private _AudienciaService: CvAudienciaService,
  private _TipoService: CvAuCfgTipoService,
  private _ComparendoService: CvCdoComparendoService,
  private _CiudadanoService: UserCiudadanoService,
  private _LoginService: LoginService,
  ){}

  ngOnInit() {
    this.onInitForms();

    swal({
      title: 'Cargando formulario!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    this.audiencia = new CvAudiencia(null, null, null, null, null);

    this.datosApoderado = {
      'identificacion': null,
      'idTipoIdentificacion': 1,
    }
  }

  ngAfterViewInit(){
    let token = this._LoginService.getToken();

    this._AudienciaService.searchLast(token).subscribe(
      response => {
        if (response.code == 200) {
          this.audienciaLast = response.data;
          this.fechaDisponible = response.data.fechaDisponible;
          
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
        } else {
          this.audienciaLast = null;

          swal.close();
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

    this._TipoService.select().subscribe(
      response => {
        this.tipos = response;
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

  onInitForms(){
    this.formIndex = false;
    this.formApoderado = false;
  }

  onCancelar(){
    this.ready.emit(true);
  }

  onSearchComparendo() {
    swal({
      title: 'Buscando registros!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    this._ComparendoService.searchByNumber({ 'numero':this.numeroComparendo }, token).subscribe(
      response => {
        if (response.code == 200) {
          this.comparendo = response.data;
          this.audiencia.idComparendo = this.comparendo.id;

          this._AudienciaService.searchByComparendo({ 'idComparendo': this.comparendo.id }, token).subscribe(
            response => {
              if (response.code == 200) {
                this.audiencias = response.data;
  
                swal({
                  title: response.title,
                  text: response.message,
                  type: response.status,
                  confirmButtonText: 'Aceptar'
                });
              }else{
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
        } else {
          this.comparendo = null;

          swal({
            title: 'Alerta!',
            text: response.message,
            type: 'warning',
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

  onAddApoderado() {
    this.formApoderado = true;
  }

  onSearchApoderado() {
    swal({
      title: 'Buscando apoderado!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    this._CiudadanoService.searchByIdentificacion(this.datosApoderado, token).subscribe(
      response => {
        if (response.code == 200) {
          if (response.data.ciudadano) {
            this.apoderado = response.data.ciudadano;

            swal({
              title: 'Perfecto!',
              text: response.message,
              type: 'success',
              confirmButtonText: 'Aceptar'
            });
          }
        } else {
          this.apoderado = null;

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

  onCloseApoderado() {
    this.formApoderado = false;
    this.apoderado = null;
  }
  
  onEnviar(){
    let token = this._LoginService.getToken();

    this.audiencia.idComparendo = this.comparendo.id;
    
		this._AudienciaService.register(this.audiencia, token).subscribe(
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
      }
    ); 
  }
}