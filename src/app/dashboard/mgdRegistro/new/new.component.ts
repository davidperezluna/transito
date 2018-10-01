import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'
import { MgdPeticionario } from '../mgdPeticionario.modelo';
import { MgdDocumento } from '../mgdDocumento.modelo';
import { MgdRemitente } from '../mgdRemitente.modelo';
import { MgdMedidaCautelar } from '../mgdMedidaCautelar.modelo';
import { MgdVehiculo } from '../mgdVehiculo.modelo';
import { MgdRemitenteService } from '../../../services/mgdRemitente.service';
import { MgdTipoCorrespondenciaService } from '../../../services/mgdTipoCorrespondencia.service';
import { TipoIdentificacionService } from '../../../services/tipoIdentificacion.service';
import { ClaseService } from '../../../services/clase.service';
import { LoginService } from '../../../services/login.service';
import { CiudadanoService } from '../../../services/ciudadano.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
@Output() readyDocument = new EventEmitter<any>();
public peticionario: MgdPeticionario;
public documento: MgdDocumento;
public medidaCautelar: MgdMedidaCautelar;
public vehiculo: MgdVehiculo;
public remitente: MgdRemitente;
public errorMessage;
public respuesta;
public editable = false;
public documentoEncontrado = false;
public crearDocumento = false;
public peticionarios: any;
public tiposIdentificacion:any;
public tipoIdentificacionSelected: any;
public tipoIdentificacionRemitenteSelected: any;
public tiposCorrespondencia: any;
public tipoCorrespondenciaSelected: any;
public clases: any;
public claseSelected: any;
public date: any;
public newCiudadano: any=false;
public newRemitente: any=false;
public file: any;
public prohibicion: any;
public datosRegistro = {
  'peticionario': [],
  'remitente': [],
  'documento': [],
  'medidaCautelar': [],
  'vehiculo': [],
};

constructor(
  private _CiudadanoService: CiudadanoService,
  private _RemitenteService: MgdRemitenteService,
  private _loginService: LoginService,
  private _tipoIdentificacionService: TipoIdentificacionService,
  private _tipoCorrespondenciaService: MgdTipoCorrespondenciaService,
  private _claseService: ClaseService,
  private router: Router
  ){}

  ngOnInit() {
    this.peticionario = new MgdPeticionario(null, null, null, null, null, null, null, null, null, null);
    this.remitente = new MgdRemitente(null, null, null, null, null, null, null, null, null, null);
    this.documento = new MgdDocumento(null,null,null, null, null, null, null, null, null, null, null, null, null, null, null);
    this.medidaCautelar = new MgdMedidaCautelar(null, null, null, null, null, null, null, null);
    this.vehiculo = new MgdVehiculo(null, null, null, null);
    this.prohibicion = false;
    this.date = new Date();

    this.documento.correoCertificadoLlegada = 'false';

    this._tipoIdentificacionService.getTipoIdentificacionSelect().subscribe(
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

    this._tipoCorrespondenciaService.getTipoCorrespondenciaSelect().subscribe(
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
  }

  onCancelar(){
    this.ready.emit(true);
  }

  onBuscarPeticionario() {
    let token = this._loginService.getToken();
    let datos = {
      'numeroIdentificacion':this.peticionario.identificacion
    }

    this._CiudadanoService.searchByIdentificacion(datos,token).subscribe(
        response => { 
            this.respuesta = response; 
            if(this.respuesta.status == 'success'){
              this.newCiudadano = false;
              this.peticionario.primerNombre = response.data.primerNombre;
              this.peticionario.segundoNombre = response.data.segundoNombre;
              this.peticionario.primerApellido = response.data.primerApellido;
              this.peticionario.segundoApellido = response.data.segundoApellido;
            }else{
              this.newCiudadano = true;
              this.peticionario = new MgdPeticionario(null, null, null, null, null, null, null, null, null, null);
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

  onBuscarRemitente() {
    let token = this._loginService.getToken();
    let datos = {
      'identificacion':this.remitente.identificacion
    }

    this._RemitenteService.buscarRemitente(datos,token).subscribe(
        response => { 
            this.respuesta = response; 
            if(this.respuesta.status == 'success'){
              this.newRemitente = true;
              this.remitente.primerNombre = response.data.primerNombre;
              this.remitente.segundoNombre = response.data.segundoNombre;
              this.remitente.primerApellido = response.data.primerApellido;
              this.remitente.segundoApellido = response.data.segundoApellido;
              this.remitente.direccion = response.data.direccion;
              this.remitente.telefono = response.data.telefono;
              this.remitente.correoElectronico = response.data.correoElectronico;
            }else{
              this.newRemitente = false;
              this.remitente = new MgdRemitente(null, null, null, null, null, null, this.remitente.identificacion, null, null, null);
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

  onCrearRegistro(){
    this.datosRegistro.remitente.push({
      'primerNombre':this.remitente.primerNombre,
      'segundoNombre':this.remitente.segundoNombre,
      'primerApellido':this.remitente.primerApellido,
      'segundoApellido':this.remitente.segundoApellido,
      'identificacion':this.remitente.identificacion,
      'direccion':this.remitente.direccion,
      'telefono':this.remitente.telefono,
      'correoElectronico':this.remitente.correoElectronico,
      'tipoIdentificacionId':this.tipoIdentificacionRemitenteSelected
    });
    this.datosRegistro.peticionario.push({
      'identificacion':this.peticionario.identificacion,
    });

    this.datosRegistro.documento.push({
      'numeroRadicado':this.documento.numeroRadicado,
      'folios':this.documento.folios,
      'numeroOficio':this.documento.numeroOficio,
      'descripcion':this.documento.descripcion,
      'correoCertificadoLlegada':this.documento.correoCertificadoLlegada,
      'nombreTransportadoraLlegada':this.documento.nombreTransportadoraLlegada,
      'fechaLlegada':this.documento.fechaLlegada,
      'numeroGuiaLlegada':this.documento.numeroGuiaLlegada,
      'vigencia':this.documento.vigencia,
      'tipoCorrespondenciaId':this.tipoCorrespondenciaSelected,
      'entidadNombre':this.documento.entidadNombre,
      'entidadCargo':this.documento.entidadCargo,
    });

    let token = this._loginService.getToken();

		this._RemitenteService.register(this.file, this.datosRegistro, token).subscribe(
			response => {
        this.respuesta = response;
        if(this.respuesta.status == 'success'){
          this.readyDocument.emit(this.respuesta.data);
          swal({
            title: 'Perfecto!',
            text: 'Documento radicado',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: 'Error!',
            text: this.respuesta.msg,
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

  onCrearProhibicion(){
    this._claseService.getClaseSelect().subscribe(
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
    
    this.datosRegistro.medidaCautelar.push({
      'numeroOficio':this.medidaCautelar.numeroOficio,
      'quienOrdena':this.medidaCautelar.quienOrdena,
      'fechaInicio':this.medidaCautelar.fechaInicio,
      'fechaFin':this.medidaCautelar.fechaFin,
      'identificacionImplicado':this.medidaCautelar.identificacionImplicado,
      'delito':this.medidaCautelar.delito
    });

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

  changedTipoCorrespondencia(event){
    if(event !== undefined){
      let token = this._loginService.getToken();
	  	this._tipoCorrespondenciaService.showTipoCorrespondencia(token,event).subscribe(
			response => {
        this.respuesta = response;
        if(this.respuesta.status == 'success'){
          this.prohibicion = response.data.prohibicion;
          console.log(this.prohibicion);
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
		  }); 
      
    }
  }

  onFileChange(event) {
    if(event.target.files.length > 0) {
      const fileSelected: File = event.target.files[0];
      
      this.file = new FormData();
      this.file.append('file', fileSelected);
    }
  }
  readyCiudadano(){
    this.newCiudadano = false;
  }
}