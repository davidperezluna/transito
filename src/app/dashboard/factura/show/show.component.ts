import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { Factura } from '../factura.modelo';
import { FacturaService } from '../../../services/factura.service';
import { LoginService } from '../../../services/login.service';
import { VehiculoService } from '../../../services/vehiculo.service';
import { CiudadanoService } from '../../../services/ciudadano.service';
import { SedeOperativaService } from '../../../services/sedeOperativa.service';
import swal from 'sweetalert2';

@Component({
  selector: 'factura-show',
  templateUrl: './show.component.html'
})
export class ShowComponent implements OnInit {
@Output() readyShow = new EventEmitter<any>();
@Input() factura:any = null;
public errorMessage;
public respuesta;
public vehiculos: any;
public ciudadanos: any;
public sedesOperativas: any;
public vehiculoSelected: any;
public solicitanteSelected: any;
public apoderadoSelected: any;
public sedeOperativaSelected: any;

constructor(
  private _FacturaService: FacturaService,
  private _CiudadanoService: CiudadanoService,
  private _loginService: LoginService,
  private _VehiculoService: VehiculoService,
  private _SedeOperativaService: SedeOperativaService,
  ){}

  ngOnInit() {
    
    console.log(this.factura);
   
  }
  
  onCancelar(){
    this.readyShow.emit(true);
  }
  onEnviar(){
   
  }
}