import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { VehiculoService } from '../../../services/vehiculo.service';
import { TramiteSolicitudService } from '../../../services/tramiteSolicitud.service';
import { CiudadanoVehiculoService } from '../../../services/ciudadanoVehiculo.service'
import swal from 'sweetalert2';
import { forEach } from '@angular/router/src/utils/collection';
declare var $: any;

@Component({
  selector: 'app-vehiculo-show',
  templateUrl: './showAutomotor.component.html'
})
export class ShowAutomotorComponent implements OnInit {
@Input() vehiculo:any;
@Output() cerrarForm = new EventEmitter<any>();
public pesado;
public maquinaria;
public sedeOperativa;
public placa;
public estado;
public numeroTarjeta;
public estadoTarjeta;
public acta;
public numeroActa;
public fechaDeclaracion;
public declaracion;
public reposicion;
public origenRegistro;
public clase;
public marca;
public linea;
public modelo;
public color;
public tipoServicio;
public cilindraje;
public numeroSerie;
public numeroMotor;
public numeroChasis;
public regrabacionSerie = "NO";
public regrabacionMotor ="NO";
public regrabacionChasis ="NO";
public combustible;
public pesoBruto;
public numeroEjes;
public numeroFichas;
public repotenciado;
public potencia;
public tipoMotor;
public vehiculoMaquinaria = "Maquinaria";
public vehiculoPesado = "Pesado";
public tipoVehiculo: any;
public vehiculoDatosTramite: any;
public oculto = false;
public tipoRegrabar;

constructor(
  private _loginService: LoginService,
  private _VehiculoService: VehiculoService,
  private _TramiteSolicitudService: TramiteSolicitudService,
  private _CiudadanoVehiculoService: CiudadanoVehiculoService,
  
  ){}

  ngOnInit() {
    this.pesado = false;
    this.maquinaria = false;
    let token = this._loginService.getToken();
    this.sedeOperativa = this.vehiculo.sedeOperativa.nombre;
    this.placa = this.vehiculo.placa.numero;
    if(this.vehiculo.estado == true ){
      this.estado = "Activo";
    }

    this._CiudadanoVehiculoService.showPropietarioByIdVehiculo(token,this.vehiculo.id).subscribe(
      response=>{
                this.numeroTarjeta = response.data.licenciaTransito;                
      }
    );
    this._TramiteSolicitudService.getTramiteSolicitudByIdVehiculo(token,this.vehiculo.id).subscribe(
      response=>{
                this.vehiculoDatosTramite = response.data;             
        
                this.vehiculoDatosTramite.forEach(element => {                    
                  if(element.tramiteFactura.tramitePrecio.tramite.id == 7){
                      this.regrabacionMotor = "SI";
                  }
                  else if(element.tramiteFactura.tramitePrecio.tramite.id == 8){
                      this.regrabacionChasis = "SI";
                  }
                  else if(element.tramiteFactura.tramitePrecio.tramite.id == 9){
                      this.regrabacionSerie = "SI";
                  }                  
                });
      }
    );

    this._VehiculoService.showVehiculoTipo(token,this.vehiculo.id).subscribe(
      response => {
                  this.tipoVehiculo = response.data;
                  if(response.msj == this.vehiculoPesado){
                    this.numeroEjes = this.tipoVehiculo.numeroEjes;
                    this.numeroFichas = "Carroceria: " + this.tipoVehiculo.fichaTecnicaHomologacionCarroceria + "/Chasis: " +this.tipoVehiculo.fichaTecnicaHomologacionChasis
                    ;
                    this.pesado = true;
                  }
                  else if(response.msj == this.vehiculoMaquinaria){
                    this.pesoBruto = this.tipoVehiculo.tonelaje;
                    this.numeroEjes = this.tipoVehiculo.numeroEjes;
                    this.maquinaria = true;
                  }
                  }
    );   
 
    this.numeroTarjeta = this.vehiculo.placa.numero;
    this.estadoTarjeta = this.vehiculo.placa.numero;
    this.acta = this.vehiculo.placa.numero;
    this.numeroActa = this.vehiculo.placa.numero;
    this.fechaDeclaracion = this.vehiculo.fechaManifiesto;
    this.declaracion =this.vehiculo.placa.numero;
    this.reposicion = this.vehiculo.placa.numero;
    this.origenRegistro = this.vehiculo.placa.numero;
    this.clase = this.vehiculo.clase.nombre;
    this.marca = this.vehiculo.linea.marca.nombre;
    this.linea = this.vehiculo.linea.nombre;
    this.modelo = this.vehiculo.modelo;
    this.color = this.vehiculo.color.nombre;
    this.tipoServicio = this.vehiculo.servicio.nombre;
    this.cilindraje = this.vehiculo.cilindraje;
    this.numeroSerie = this.vehiculo.serie;
    this.numeroMotor = this.vehiculo.motor;
    this.numeroChasis = this.vehiculo.chasis;
    this.combustible = this.vehiculo.combustible.nombre;     
  }  
  
  onCancelar(){
      this.cerrarForm.emit(false);
  }
}