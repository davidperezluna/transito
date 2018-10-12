import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { MpersonalTalonario } from '../mpersonalTalonario.modelo';
import { MpersonalTalonarioService } from '../../../services/mpersonalTalonario.service';
import { SedeOperativaService } from '../../../services/sedeOperativa.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2'; 

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public talonario: MpersonalTalonario;
public sedesOperativas: any;
public sedeOperativaSelected: any;
public sedeOperativa: any = null;
public errorMessage;
public respuesta: any = null;

constructor(
  private _FuncionarioService: MpersonalTalonarioService,
  private _SedeOperativaService: SedeOperativaService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.talonario = new MpersonalTalonario(null, null, null, null, null, null, null, null);

    this._SedeOperativaService.getSedeOperativaSelect().subscribe(
      response => {
        this.sedesOperativas = response;
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

  onCalcularTotal() {
    let ini, fin, rangos;
    ini = this.talonario.desde;
    fin = this.talonario.hasta;

    if (fin > ini) {
      rangos = (fin - ini) + 1;

      if (rangos < 0) {
        rangos = 0;
      }
      this.talonario.rangos = rangos;
    }else{
      swal({
        title: 'Alerta!',
        text: 'El número de inicio no puede ser superior o igual al número de finalización',
        type: 'error',
        confirmButtonText: 'Aceptar'
      });

      this.talonario.rangos = null;
    }
  }

  onChangedSedeOperativa(e) {
    if (e) {
      let token = this._loginService.getToken();
      this._SedeOperativaService.showSedeOperativa(token, e).subscribe(
        response => {
            this.sedeOperativa = response.data;
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
  }
  
  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._loginService.getToken();
    
    this.talonario.sedeOperativaId = this.sedeOperativaSelected;

    this._FuncionarioService.register(this.talonario,token).subscribe(
      response => {
        this.respuesta = response;
        
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
        }else{
          swal({
            title: 'Error!',
            text: response.message,
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