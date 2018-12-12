import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {ColorService} from '../../../services/color.service';
import { MpersonalFuncionario } from '../mpersonalFuncionario.modelo';
import { PnalSuspensionService } from '../../../services/pnalSuspension.service';
import { MpersonalFuncionarioService } from '../../../services/mpersonalFuncionario.service';
import {LoginService} from '../../../services/login.service';
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
    public respuesta;
    public suspensions:any = null;
    public date:any;
    public formNew = false;
    public formEdit = false;
    public formIndex = true;
    public txtFechaInicio:any;
    public table:any; 
    public color:any; 
    public suspension = {
      'fechaInicio': null,
      'fechaFin': null,
      'numeroModificatorio': null,
      'mPersonalFuncionarioId': null,
  };

  constructor(
		private _PnalSuspensionService: PnalSuspensionService,
		private _MpersonalFuncionarioService: MpersonalFuncionarioService,
		private _loginService: LoginService,
    ){
      this.date = new Date();
      var datePiper = new DatePipe(this.date);
      this.date = datePiper.transform(this.date,'yyyy-MM-dd');
    }
    
  ngOnInit() {
    console.log(this.funcionario);
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
		this._MpersonalFuncionarioService.recordSuspensiones(this.funcionario, token).subscribe(
      response => {
        this.suspensions = response.data;
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
           sFirst: '<<',
           sPrevious: '<',
           sNext: '>',
           sLast: '>>'
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
    this.suspension.mPersonalFuncionarioId = this.funcionario.id;
    console.log(this.suspension);
    this._PnalSuspensionService.register(this.suspension, token).subscribe(
      response => {
        this.suspensions = response.data;
        this.table.destroy();
        this.ngOnInit();
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

  isFecha(){
    console.log(this.date);
    console.log(this.suspension.fechaInicio);

    if (this.suspension.fechaInicio >= this.date) {
      console.log('fecha mayor');
      this.txtFechaInicio = 'has-success';
    }else{
      this.txtFechaInicio = 'has-danger';
      console.log('fecha menor');
    }

  }

}