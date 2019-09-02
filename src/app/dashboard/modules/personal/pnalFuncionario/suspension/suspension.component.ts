import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { PnalSuspensionService } from '../../../../../services/pnalSuspension.service';
import { PnalFuncionarioService } from '../../../../../services/pnalFuncionario.service';
import {LoginService} from '../../../../../services/login.service';
import swal from 'sweetalert2';
import { DatePipe  } from '@angular/common';
declare var $: any;


@Component({
  selector: 'app-suspension',
  templateUrl: './suspension.component.html',
  providers: [DatePipe]
})
export class SuspensionComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() funcionario:any = null;
    public errorMessage;
    public id;
    public suspensiones:any = null;
    public date:any;
    public formNew = false;
    public formEdit = false;
    public formIndex = true;
    public table:any; 
    public suspension = {
      'fechaInicio': null,
      'fechaFin': null,
      'numeroModificatorio': null,
      'idFuncionario': null,
  };

  constructor(
		private _PnalSuspensionService: PnalSuspensionService,
		private _PnalFuncionarioService: PnalFuncionarioService,
		private _loginService: LoginService,
    ){ }
    
  ngOnInit() {
    swal({
      title: 'Cargando Tabla!',
      text: 'Solo tardara unos segundos por favor espere.',
      timer: 1500,
      onOpen: () => {
        swal.showLoading()
      }
    }).then((result) => {
      if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.timer
      ) {
      }
    });
    let token = this._loginService.getToken();
		this._PnalFuncionarioService.recordSuspensiones(this.funcionario, token).subscribe(
      response => {
        this.suspensiones = response.data;
        let timeoutId = setTimeout(() => {
          this.iniciarTabla();
        }, 100);
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
  onNew(){
    this.formNew = true;
    this.formIndex = false;
    this.table.destroy();
  }
  
  onCancelar(){
    this.ready.emit(true);
  }
  onEnviar(){
    let token = this._loginService.getToken();
    this.suspension.idFuncionario = this.funcionario.id;
    this._PnalSuspensionService.register(this.suspension, token).subscribe(
      response => {
        if (response.status == 'success') {
        //this.ready.emit(true);
          this.suspensiones = response.data;
          this.table.destroy();
          this.ngOnInit();
        swal({
          title: 'Perfecto!',
          text: response.message,
          type: 'success',
          confirmButtonText: 'Aceptar'
        })
      } else {
        swal({
          title: 'Error!',
          text: response.message,
          type: 'error',
          confirmButtonText: 'Aceptar'
        })
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
}