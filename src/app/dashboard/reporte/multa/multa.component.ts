import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {Reporte} from '../reporte.modelo';
import {LoginService} from '../../../services/login.service';
import {ComparendoService} from '../../../services/comparendo.service';

import swal from 'sweetalert2';
declare var $: any;
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
public comparendos:any;
public formIndex = true;
public tramite = false;
public infraccion= false;
public retefuente= false;

public table:any;
public desde:any;
public hasta:any;
public diario:any;

public infracciones =[
  
  {'value':"acuerdos",'label':"Acuerdos de pago"},
  {'value':"comparendo",'label':"Comparendo"},
  {'value':"cobro",'label':"Cobro coactivo"}
]

constructor(
  private _ComparendoService: ComparendoService,
  private _loginService: LoginService,

){}

ngOnInit() {
  swal({
    title: 'Cargando Tabla!',
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
  this._ComparendoService.getComparendo().subscribe(
    response => {
      this.comparendos  = response.data;
      console.log(this.comparendos);
      
      let timeoutId = setTimeout(() => {  
        this.iniciarTabla();
        swal.close();
      }, 100);
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

  iniciarTabla(){
    $('#dataTables-example').DataTable({
      responsive: true,
      pageLength: 8,
      sPaginationType: 'full_numbers',
      oLanguage: {
        oPaginate: {
          sFirst: '<i class="fa fa-step-backward"></i>',
          sPrevious: '<i class="fa fa-chevron-left"></i>',
          sNext: '<i class="fa fa-chevron-right"></i>',
          sLast: '<i class="fa fa-step-forward"></i>'
        }
      }
   });
   this.table = $('#dataTables-example').DataTable();
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