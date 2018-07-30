import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {Reporte} from '../reporte.modelo';
import {LoginService} from '../../../services/login.service';
import {SedeOperativaService} from '../../../services/sedeOperativa.service';

import swal from 'sweetalert2';
@Component({
  selector: 'app-multa',
  templateUrl: './multa.component.html'
})
export class MultaComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public registroMaquinaria: Reporte;
public municipios:any;
public errorMessage:any;
public habilitar:any;
public respuesta:any;
public formIndex = true;
public tramite = false;
public infraccion= false;
public retefuente= false;

public desde:any;
public hasta:any;
public diario:any;

public infracciones =[
  {'value':"resoluciones",'label':"Resoluciones"},
  {'value':"acuerdos de pago",'label':"Acuerdos de pago"},
  {'value':"comparendo",'label':"Comparendo"},
  {'value':"cobro coactivo",'label':"Cobro coactivo"}
]

constructor(
  private _SedeOperativaService: SedeOperativaService,
  private _loginService: LoginService,

){}

ngOnInit() {
  
  }

  onCancelar(){
      this.ready.emit(true);
  }
  generar(){
    // generar la lista de las infracciones
  }
  changedMarca(e){
    
    }

}