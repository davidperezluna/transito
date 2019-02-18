import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {ColorService} from '../../../services/color.service';
import { MpersonalFuncionario } from '../mpersonalFuncionario.modelo';
import { PnalProrrogaService } from '../../../services/pnalProrroga.service';
import { MpersonalFuncionarioService } from '../../../services/mpersonalFuncionario.service';
import {LoginService} from '../../../services/login.service';
import swal from 'sweetalert2';
import { DatePipe  } from '@angular/common';
declare var $: any;


@Component({
  selector: 'app-prorroga',
  templateUrl: './prorroga.component.html',
  providers: [DatePipe]
})
export class ProrrogaComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() funcionario:any = null;
    public errorMessage;
    public id;
    public respuesta;
    public prorrogas:any = null;
    public date:any;
    public formNew = false;
    public formEdit = false;
    public formIndex = true;
    public txtFechaInicio:any;
    public table:any; 
    public color:any; 
    public prorroga = {
      'fechaInicio': null,
      'fechaFin': null,
      'numeroModificatorio': null,
      'mPersonalFuncionarioId': null,
  };

  constructor(
		private _PnalProrrogaService: PnalProrrogaService,
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
		this._MpersonalFuncionarioService.recordProrrogas(this.funcionario, token).subscribe(
      response => {
        this.prorrogas = response.data;
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
          sFirst: '<i class="fa fa-step-forward"></i>',
          sPrevious: '<i class="fa fa-chevron-left"></i>',
          sNext: '<i class="fa fa-chevron-right"></i>',
          sLast: '<i class="fa fa-step-backward"></i>'
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
    this.prorroga.mPersonalFuncionarioId = this.funcionario.id;
    console.log(this.prorroga);
    this._PnalProrrogaService.register(this.prorroga, token).subscribe(
      response => {
        this.prorrogas = response.data;
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
    console.log(this.prorroga.fechaInicio);

    if (this.prorroga.fechaInicio >= this.date) {
      console.log('fecha mayor');
      this.txtFechaInicio = 'has-success';
    }else{
      this.txtFechaInicio = 'has-danger';
      console.log('fecha menor');
    }

  }

}