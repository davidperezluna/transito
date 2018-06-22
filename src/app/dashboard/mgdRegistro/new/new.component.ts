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
public peticionario: MgdPeticionario;
public documento: MgdDocumento;
public medidaCautelar: MgdMedidaCautelar;
public vehiculo: MgdVehiculo;
public errorMessage;
public respuesta;
public documentoEncontrado = false;
public crearDocumento = false;
public peticionarios: any;
public tiposIdentificacion:any;
public tipoIdentificacionSelected: any;
public tiposCorrespondencia: any;
public tipoCorrespondenciaSelected: any;
public clases: any;
public date: any;
public prohibicion: any;
public datos = {
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
    this.documento = new MgdDocumento(null, null, null, null, null, null, null, null, null, null, null, null);
    this.medidaCautelar = new MgdMedidaCautelar(null, null, null, null, null, null, null, null);
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
          console.log(response.data.identificacion);
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
    this.datos.peticionario.push({
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

    this.datos.documento.push({
      'numeroRadicado':this.documento.numeroRadicado,
      'folios':this.documento.folios,
      'numeroOficio':this.documento.numeroOficio,
      'descripcion':this.documento.descripcion,
      'correoCertificadoLlegada':this.documento.correoCertificadoLlegada,
      'nombreTransportadoraLlegada':this.documento.nombreTransportadoraLlegada,
      'fechaLlegada':this.documento.fechaLlegada,
      'numeroGuiaLlegada':this.documento.numeroGuiaLlegada,
      'tipoCorrespondenciaId':this.tipoCorrespondenciaSelected
    });
  }

  onCrearProhibicion(){
    this.datos.medidaCautelar.push({
      'numeroOficio':this.medidaCautelar.numeroOficio,
      'quienOrdena':this.medidaCautelar.quienOrdena,
      'fechaInicio':this.medidaCautelar.fechaInicio,
      'fechaFin':this.medidaCautelar.fechaFin,
      'identificacionImplicado':this.medidaCautelar.identificacionImplicado,
      'delito':this.medidaCautelar.delito
    });
  }

  changedTipoCorrespondencia(event){
    if(event !== undefined){
      let token = this._loginService.getToken();
	  	this._tipoCorrespondenciaService.showTipoCorrespondencia(token,event).subscribe(
			response => {
        this.respuesta = response;
        if(this.respuesta.status == 'success'){
          console.log(response.data.prohibicion);
          this.prohibicion = response.data.prohibicion;
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

}