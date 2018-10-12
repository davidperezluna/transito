import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'
import { GdDocumento } from '../gdDocumento.modelo';
import { GdRemitente } from '../gdRemitente.modelo';
import { GdMedidaCautelar } from '../gdMedidaCautelar.modelo';
import { GdVehiculo } from '../gdVehiculo.modelo';
import { GdRemitenteService } from '../../../services/gdRemitente.service';
import { GdDocumentoService } from '../../../services/gdDocumento.service';
import { GdCfgTipoCorrespondenciaService } from '../../../services/gdCfgTipoCorrespondencia.service';
import { GdCfgMedioCorrespondenciaService } from '../../../services/gdCfgMedioCorrespondencia.service';
import { TipoIdentificacionService } from '../../../services/tipoIdentificacion.service';
import { ClaseService } from '../../../services/clase.service';
import { LoginService } from '../../../services/login.service';
import { CiudadanoService } from '../../../services/ciudadano.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
@Output() onShow = new EventEmitter<any>();
@Input() peticionario: any = null;
public documento: GdDocumento;
public medidaCautelar: GdMedidaCautelar;
public vehiculo: GdVehiculo;
public remitente: GdRemitente;

public errorMessage;

public editable = false;
public peticionarios: any;

public formNewDocumento: any = true;
public formNewRemitente: any = false;
public formNewCiudadano: any = false;

public tiposIdentificacion:any;
public tipoIdentificacionRemitenteSelected: any;
public tipoIdentificacionCiudadanoSelected: any;

public tiposCorrespondencia: any;
public tipoCorrespondenciaSelected: any;

public mediosCorrespondencia: any;
public medioCorrespondenciaSelected: any;

public clases: any;
public claseSelected: any;

public date: any;

public ciudadano: any = null;

public file: any;
public prohibicion: any;

public datosRegistro = {
  'peticionario': null,
  'remitente': null,
  'documento': null,
  'medidaCautelar': null,
  'vehiculo': null,
};

constructor(
  private _CiudadanoService: CiudadanoService,
  private _TipoIdentificacionService: TipoIdentificacionService,
  private _RemitenteService: GdRemitenteService,
  private _TipoCorrespondenciaService: GdCfgTipoCorrespondenciaService,
  private _MedioCorrespondenciaService: GdCfgMedioCorrespondenciaService,
  private _DocumentoService: GdDocumentoService,
  private _ClaseService: ClaseService,
  private _loginService: LoginService,
  private router: Router
  ){}

  ngOnInit() {
    this.remitente = new GdRemitente(null, null, null, null, null, null, null, null, null, null);
    this.documento = new GdDocumento(null, null, null, null, null, null, null, null, null, null, null, null, null);
    this.medidaCautelar = new GdMedidaCautelar(null, null, null, null, null, null, null, null);
    this.vehiculo = new GdVehiculo(null, null, null, null);
    this.prohibicion = false;
    this.date = new Date();

    $('#summernote').summernote({
      placeholder: 'Registre los detalles de la llegada del documento',
      tabsize: 2,
      height: 300
    });

    this._TipoIdentificacionService.getTipoIdentificacionSelect().subscribe(
      response => {
        this.tiposIdentificacion = response;
      },
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
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

        if(this.errorMessage != null){
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

  onSearchCiudadano() {
    swal({
      title: 'Buscando registros!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._loginService.getToken();

    this._CiudadanoService.searchByIdentificacion({ 'numeroIdentificacion': this.peticionario.identificacion }, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.ciudadano = response.data;
          this.formNewCiudadano = false;
          this.formNewDocumento = true;
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success'
          });
        } else {
          this.ciudadano = null;
          this.formNewCiudadano = true;
          this.formNewDocumento = false;
          swal({
            title: 'Atención!',
            text: response.message,
            type: 'warning'
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

  onSearchRemitente() {
    swal({
      title: 'Buscando registros!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._loginService.getToken();

    this._RemitenteService.searchByIdentificacion({ 'identificacion': this.remitente.identificacion }, token).subscribe(
      response => { 
          if(response.status == 'success'){
            this.formNewRemitente = false;
            this.remitente = response.data;
            this.remitente.idTipoIdentificacion = response.data.tipoIdentificacion.id;
            swal.close();
          }else{
            this.formNewRemitente = true;
            
            swal({
              title: 'Atención!',
              text: response.message,
              type: 'warning'
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

  onRegister(){
    this.datosRegistro.remitente = this.remitente; 
    this.datosRegistro.peticionario = this.ciudadano;
    this.datosRegistro.documento = this.documento;

    let token = this._loginService.getToken();

		this._DocumentoService.register(this.file, this.datosRegistro, token).subscribe(
			response => {
        if(response.status == 'success'){
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.onShow.emit(response.data);
        }else{
          swal({
            title: 'Error!',
            text: response.message,
            type: 'error',
            confirmButtonText: 'Aceptar'
          });
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

  onCrearProhibicion(){
    this._ClaseService.getClaseSelect().subscribe(
      response => {
        this.clases = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );
    
    this.datosRegistro.medidaCautelar = this.medidaCautelar;

    swal({
      title: 'Perfecto',
      text: "¡Medida cautelar registrada, ingrese al menos un vehiculo!",
      type: 'info',
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> OK!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText:
      '<i class="fa fa-thumbs-down"></i>',
      cancelButtonAriaLabel: 'Thumbs down',
    });
  }

  onCrearVehiculo(){
    this.datosRegistro.vehiculo.push({
      'lugar':this.vehiculo.lugar,
      'placa':this.vehiculo.placa,
      'claseId':this.claseSelected
    });

    swal({
      title: 'Perfecto',
      text: "¡Vehiculo resgistrado!",
      type: 'info',
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> OK!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText:
      '<i class="fa fa-thumbs-down"></i>',
      cancelButtonAriaLabel: 'Thumbs down',
    });
  }

  onChangedTipoCorrespondencia(event){
    if(event !== undefined){
      let token = this._loginService.getToken();

      this._TipoCorrespondenciaService.show({ 'idTipoCorrespondencia':event }, token).subscribe(
        response => {
          response = response;
          if(response.status == 'success'){
            this.prohibicion = response.data.prohibicion;
            this.editable = response.data.editable;
            this.documento.vigencia = response.data.diasVigencia;
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

  onFileChange(event) {
    if(event.target.files.length > 0) {
      const fileSelected: File = event.target.files[0];
      
      this.file = new FormData();
      this.file.append('file', fileSelected);
    }
  }

  onReadyCiudadano(ciudadano: any = null) {   
    this.formNewCiudadano = false;
    this.formNewDocumento = true;
    
    if (ciudadano) {
      this.ciudadano = ciudadano;
    }
  }
}