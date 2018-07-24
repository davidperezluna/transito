import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { MpersonalHorario } from '../mpersonalHorario.modelo';
import { MpersonalHorarioService } from '../../../services/mpersonalHorario.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html'
})
export class TimeComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
@Input() funcionario:any = null;
public horario: MpersonalHorario;
public errorMessage;
public respuesta: any = null;
public agregar: any;
public semana: any;

constructor(
  private _HorarioService: MpersonalHorarioService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.horario = new MpersonalHorario(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
  }
  
  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._loginService.getToken();
    this.horario.funcionarioId = this.funcionario.id;
    this.semana = []

    if(this.horario.lunes){
      this.semana.push({'1':'Lunes'});
    }
    if(this.horario.martes){
      this.semana.push({'2':'Martes'});
    }
    if(this.horario.miercoles){
      this.semana.push({3:'Miercoles'});
    }
    if(this.horario.jueves){
      this.semana.push({4:'Jueves'});
    }
    if(this.horario.viernes){
      this.semana.push({5:'Viernes'});
    }
    if(this.horario.sabado){
      this.semana.push({6:'Sabado'});
    }
    if(this.horario.domingo){
      this.semana.push({0:'Domingo'});
    }

    this.horario.dias = this.semana;

    this._HorarioService.register(this.horario,token).subscribe(
      response => {
        this.respuesta = response;
        
        if(this.respuesta.status == 'success'){
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
}