import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { Factura } from '../factura.modelo';
import { FacturaService } from '../../../services/factura.service';
import { LoginService } from '../../../services/login.service';
import { VehiculoService } from '../../../services/vehiculo.service';
import { CiudadanoService } from '../../../services/ciudadano.service';
import { TipoIdentificacionService } from '../../../services/tipoIdentificacion.service';
import { SedeOperativaService } from '../../../services/sedeOperativa.service';
import { MflTipoRecaudoService } from '../../../services/mflTipoRecaudo.service';
import { MpersonalFuncionarioService } from '../../../services/mpersonalFuncionario.service';
import { CiudadanoVehiculoService } from '../../../services/ciudadanoVehiculo.service';
import {ModuloService} from '../../../services/modulo.service';
import {TramitePrecioService} from '../../../services/tramitePrecio.service';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-factura',
  templateUrl: './new.component.html',
  providers: [DatePipe]
})

export class NewComponent  implements OnInit {
@Output() ready = new EventEmitter<any>();
public factura: Factura;
public errorMessage;
public respuesta;
public vehiculos: any;
public ciudadanos: any;
public sedesOperativas: any;
public vehiculoSelected: any;
public funcionario: boolean = false;
public solicitanteSelected: any;
public apoderadoSelected: any;
public tipoRecaudoSelected: any;
public date:any;
public tiposRecaudo:any;
public sedeOperativa:any;
public tiposIdentificacion:any;
public isErrorCiudadano: any;
public isExistCiudadano:boolean=false;
public isErrorVehiculo: any;
public isExistVehiculo:boolean=false;
public identificacion:any;
public tipoIdentificacionSelected:any;
public ciudadano:any;
public msj:any;
public vehiculo:any;
public modulos:any;
public moduloSelected:any;
public vehiculoCriterio:any; 
public tramitesPrecio:any; 
public tramitePrecio:any; 
public tramitePrecioSelected:any; 
public tramitesValor:any=[]; 

constructor(
  private _FacturaService: FacturaService,
  private _TramitePrecioService: TramitePrecioService,
  private _CiudadanoService: CiudadanoService,
  private _loginService: LoginService,
  private _VehiculoService: VehiculoService,
  private _tipoIdentificacionService: TipoIdentificacionService,
  private _SedeOperativaService: SedeOperativaService,
  private _FuncionarioService: MpersonalFuncionarioService,
  private _MflTipoRecaudoService: MflTipoRecaudoService,
  private datePipe: DatePipe,
  private _ciudadanoVehiculoService: CiudadanoVehiculoService,
  private _moduloService: ModuloService,
  ){}

  ngOnInit() {

    this._moduloService.getModuloSelect().subscribe(
      response => {
        this.modulos = response;
        
      }, 
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

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

    swal({
      title: 'Cargando Datos!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    }).then((result) => {
      if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.timer 
      ) {
      }
    })

    this.date = new Date();
    let identity = this._loginService.getIdentity();

    this.factura = new Factura(null,null, null, null, null, null, null, null, null);

    let datos = {
      'identificacion':identity.Ciudadano
    } 
    var datePiper = new DatePipe(this.date);
    let token = this._loginService.getToken();
    this._FuncionarioService.searchActivo(datos,token).subscribe(
      response => {
        this.respuesta = response;
        if(this.respuesta.status == 'success'){
          this.sedeOperativa = this.respuesta.data.sedeOperativa;
          this.funcionario= true;
          this.factura.numero = datePiper.transform(this.date,'hmss');
          swal.close();
        }
      error => {
          this.errorMessage = <any>error;
          if(this.errorMessage != null){
            console.log(this.errorMessage);
            alert('Error en la petición');
          }
        }
    });

    


    this._MflTipoRecaudoService.select().subscribe(
      response => {
        this.tiposRecaudo = response;
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
    let token = this._loginService.getToken();
      this.factura.sedeOperativaId = this.tipoRecaudoSelected;
    
		this._FacturaService.register(this.factura,token).subscribe(
			response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'El registro se ha registrado con exito',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: 'Error!',
            text: 'El factura '+ this.factura.numero +' ya se encuentra registrado',
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

  isCiudadano() {
    console.log(this.tipoIdentificacionSelected);
    let token = this._loginService.getToken();
    let datos = {
      'identificacion':this.identificacion,
      'tipoIdentificacion': this.tipoIdentificacionSelected,
    }
    
    this._CiudadanoService.isCiudadano(datos,token).subscribe(
      response => {
        this.respuesta = response;
        if(this.respuesta.status == 'error'){
          this.ciudadano = this.respuesta.datos;
          this.isExistCiudadano = true;
          this.isErrorCiudadano = false;
          
        }else{
          this.isErrorCiudadano = true;
          this.isExistCiudadano = false;
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

  onKeyValidateVehiculo(){
    swal({
      title: 'Buscando Vehiculo!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    }).then((result) => {
      if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.timer
      ) {
      }
    })
    let token = this._loginService.getToken();

    

    this._ciudadanoVehiculoService.showCiudadanoVehiculoId(token,this.vehiculoCriterio).subscribe(
      response => {
        if (response.code == 200 ) {
          this.msj = 'vehiculo encontrado';
          this.isErrorVehiculo = false;
          this.isExistVehiculo = true;
          this.vehiculo=response.data[0].vehiculo;
          console.log(this.vehiculo);
          swal.close();
        }
        if(response.code == 401){
          this.msj = 'vehiculo no se encuentra en la base de datos';
          this.isErrorVehiculo = true;
          this.isExistVehiculo = false;
          swal.close();
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

  changedModulo(e){

    if (e) {
      this._TramitePrecioService.getTramitePrecioPorModuloSelect(this.moduloSelected).subscribe(
        response => {
          this.tramitesPrecio = response;
        }, 
        error => {
          this.errorMessage = <any>error;
  
          if(this.errorMessage != null){
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }
      );
    }

  }

  btnNewTramite(){
    let token = this._loginService.getToken();
    this._TramitePrecioService.showTramitePrecio(token,this.tramitePrecioSelected).subscribe(
      response => {
        this.tramitePrecio = response.data;
        this.tramitesValor.push(
          {
            'nombre':this.tramitePrecio.nombre,
            'valor':this.tramitePrecio.valorTotal
          }
        )
        console.log(this.tramitesValor);

      }, 
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );
  //   this.tramitesValor.push(
  //     {
  //     'nombre':this.tramitePrecioSelected[0].nombre,
  //     'permisoTramite':this.ciudadanoSelected[0].permisoTramite,
  //     'propietarioPresente':this.ciudadanoSelected[0].propietarioPresente,
  //     'identificacionApoderado':this.apoderadoSelected.identificacion,
  //     'nombreApoderado':this.apoderadoSelected.primerNombre+" "+this.apoderadoSelected.segundoNombre,
  //     }   
  // )
  }

}