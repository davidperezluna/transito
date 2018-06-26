import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { MgdPeticionario } from '../mgdPeticionario.modelo';
import { MgdDocumento } from '../mgdDocumento.modelo';
import { MgdMedidaCautelar } from '../mgdMedidaCautelar.modelo';
import { MgdVehiculo } from '../mgdVehiculo.modelo';
import { MgdPeticionarioService } from '../../../services/mgdPeticionario.service';
import { MgdTipoCorrespondenciaService } from '../../../services/mgdTipoCorrespondencia.service';
import { TipoIdentificacionService } from '../../../services/tipoIdentificacion.service';
import { ClaseService } from '../../../services/clase.service';
import { LoginService } from '../../../services/login.service';
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
public errorMessage;
public respuesta;
public editable = false;
public documentoEncontrado = false;
public crearDocumento = false;
public peticionarios: any;
public tiposIdentificacion:any;
public tipoIdentificacionSelected: any;
public tiposCorrespondencia: any;
public tipoCorrespondenciaSelected: any;
public clases: any;
public claseSelected: any;
public date: any;
public file: any;
public prohibicion: any;
public datosRegistro = {
  'peticionario': [],
  'documento': [],
  'medidaCautelar': [],
  'vehiculo': [],
};

constructor(
  private _PeticionarioService: MgdPeticionarioService,
  private _loginService: LoginService,
  private _tipoIdentificacionService: TipoIdentificacionService,
  private _tipoCorrespondenciaService: MgdTipoCorrespondenciaService,
  private _claseService: ClaseService,
  ){}

  ngOnInit() {
    this.peticionario = new MgdPeticionario(null, null, null, null, null, null, null, null, null, null, null, null);
    this.documento = new MgdDocumento(null, null, null, null, null, null, null, null, null, null, null, null, null);
    this.medidaCautelar = new MgdMedidaCautelar(null, null, null, null, null, null, null, null);
    this.vehiculo = new MgdVehiculo(null, null, null, null);
    this.prohibicion = false;
    this.date = new Date();
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

    this._claseService.getClaseSelect().subscribe(
      response => {
        this.clases = response;
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
      'identificacion':this.peticionario.identificacion
    }
    
    this._PeticionarioService.buscarPeticionario(datos,token).subscribe(
      response => {
        this.respuesta = response;
        if(this.respuesta.status == 'success'){
          this.peticionario.primerNombre = response.data.primerNombre;
          this.peticionario.segundoNombre = response.data.segundoNombre;
          this.peticionario.primerApellido = response.data.primerApellido;
          this.peticionario.segundoApellido = response.data.segundoApellido;
        }
      error => {
          this.errorMessage = <any>error;
          if(this.errorMessage != null){
            console.log(this.errorMessage);
            alert('Error en la petición');
          }
        }
    });
  }

  onCrearRegistro(){
    this.datosRegistro.peticionario.push({
      'primerNombre':this.peticionario.primerNombre,
      'segundoNombre':this.peticionario.segundoNombre,
      'primerApellido':this.peticionario.primerApellido,
      'segundoApellido':this.peticionario.segundoApellido,
      'identificacion':this.peticionario.identificacion,
      'entidadNombre':this.peticionario.entidadNombre,
      'entidadCargo':this.peticionario.entidadCargo,
      'direccion':this.peticionario.direccion,
      'telefono':this.peticionario.telefono,
      'correoElectronico':this.peticionario.correoElectronico,
      'tipoIdentificacionId':this.tipoIdentificacionSelected
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
      'tipoCorrespondenciaId':this.tipoCorrespondenciaSelected
    });

    let token = this._loginService.getToken();

		this._PeticionarioService.register(this.file, this.datosRegistro, token).subscribe(
			response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.readyDocument.emit(this.respuesta.data);
          swal({
            title: 'Perfecto!',
            text: 'El registro se ha registrado con exito',
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
}