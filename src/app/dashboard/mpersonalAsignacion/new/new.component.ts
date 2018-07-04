import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { MpersonalAsignacion } from '../mpersonalAsignacion.modelo';
import { MpersonalAsignacionService } from '../../../services/mpersonalAsignacion.service';
import { MpersonalFuncionarioService } from '../../../services/mpersonalFuncionario.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public asignacion: MpersonalAsignacion;
public funcionarios: any;
public funcionarioSelected: any;
public errorMessage;
public respuesta: any = null;

constructor(
  private _AsignacionService: MpersonalAsignacionService,
  private _FuncionarioService: MpersonalFuncionarioService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.asignacion = new MpersonalAsignacion(null, null, null);

    this._FuncionarioService.select().subscribe(
      response => {
        this.funcionarios = response;
      },
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
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
    
    this.asignacion.funcionarioId = this.funcionarioSelected;

    this._AsignacionService.register(this.asignacion,token).subscribe(
      response => {
        this.respuesta = response;
        
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'El registro se ha realizado con exito',
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
        }else{
          swal({
            title: 'Error!',
            text: 'El asignacion ya se encuentra registrado',
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