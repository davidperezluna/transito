import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { PnalHorario } from '../pnalHorario.modelo';
import { PnalHorarioService } from '../../../../../services/pnalHorario.service';
import { PnalFuncionarioService } from '../../../../../services/pnalFuncionario.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html'
})
export class TimeComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
@Input() funcionario:any = null;
public horario: PnalHorario;
public errorMessage;
public horarios: any = null;
public agregar: any;
public semana: any;
public table: any;

constructor(
  private _HorarioService: PnalHorarioService,
  private _FuncionarioService: PnalFuncionarioService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.horario = new PnalHorario(null,null,null,null,null, null, null, null, null, null, null, null, null, null, null, null);
    
    let token = this._loginService.getToken();

    this._FuncionarioService.recordTimes(this.funcionario, token).subscribe(
      response => {
        this.horarios = response.data;
        setTimeout(() => {
          this.onInitTable();
        }, 100);
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
    
    this.horario.idFuncionario = this.funcionario.id;

    this._HorarioService.register(this.horario,token).subscribe(
      response => {        
        if(response.code == 200){
          if(this.agregar == 'true'){
            swal({
              title: 'Perfecto!',
              text: 'Registro exitoso!',
              type: 'success',
              confirmButtonText: 'Aceptar'
            });
          }else{
            this.ready.emit(true);
            swal({
              title: 'Perfecto!',
              text: 'Registro exitoso!',
              type: 'success',
              confirmButtonText: 'Aceptar'
            });
          }
        }else{
          swal({
            title: 'Error!',
            text: 'El funcionario ya se encuentra registrado',
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

  onInitTable() {
    this.table = $('#dataTables-example').DataTable({
        responsive: true,
        pageLength: 8,
        sPaginationType: 'full_numbers',
        dom: 'Bfrtip',
        buttons: [
            'pdf'
        ],
        oLanguage: {
          oPaginate: {
            sFirst: '<i class="fa fa-step-backward"></i>',
            sPrevious: '<i class="fa fa-chevron-left"></i>',
            sNext: '<i class="fa fa-chevron-right"></i>',
            sLast: '<i class="fa fa-step-forward"></i>'
          }
        }
    });
  }
}