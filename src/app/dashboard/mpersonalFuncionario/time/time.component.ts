import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { MpersonalHorario } from '../mpersonalHorario.modelo';
import { MpersonalHorarioService } from '../../../services/mpersonalHorario.service';
import { MpersonalFuncionarioService } from '../../../services/mpersonalFuncionario.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html'
})
export class TimeComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
@Input() funcionario:any = null;
public horario: MpersonalHorario;
public errorMessage;
public horarios: any = null;
public agregar: any;
public semana: any;
public table: any;


constructor(
  private _HorarioService: MpersonalHorarioService,
  private _FuncionarioService: MpersonalFuncionarioService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.horario = new MpersonalHorario(null,null,null,null,null, null, null, null, null, null, null, null, null, null, null, null);
    
    let token = this._loginService.getToken();

    this._FuncionarioService.recordTimes(this.funcionario, token).subscribe(
      response => {
        this.horarios = response.data;
        setTimeout(() => {
          this.iniciarTabla();
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
    this.horario.funcionarioId = this.funcionario.id;
    console.log(this.horario);
    this._HorarioService.register(this.horario,token).subscribe(
      response => {        
        if(response.status == 'success'){
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
  iniciarTabla() {
    $('#dataTables-example').DataTable({
        responsive: true,
        pageLength: 8,
        sPaginationType: 'full_numbers',
        dom: 'Bfrtip',
        buttons: [
            'pdf'
        ],
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
}