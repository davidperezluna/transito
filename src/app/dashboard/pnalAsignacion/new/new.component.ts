import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { PnalAsignacion } from '../pnalAsignacion.modelo';
import { PnalAsignacionService } from '../../../services/pnalAsignacion.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
@Input() funcionario:any = null;

public asignacion: PnalAsignacion;
public organismosTransito: any;
public sedeOperativaSelected: any;
public errorMessage;
public respuesta: any = null;

constructor(
  private _AsignacionService: PnalAsignacionService,
  private _LoginService: LoginService,
  ){}

  ngOnInit() {
    this.asignacion = new PnalAsignacion(null, null, null, null, null, null, null, null);
  }
  
  onCancelar(){
    this.ready.emit(true);
  }

  onCalcularTotal() {
    let ini, fin, rangos;
    ini = this.asignacion.desde;
    fin = this.asignacion.hasta;

    if (fin > ini) {
      rangos = (fin - ini) + 1;

      if (rangos < 0) {
        rangos = 0;
      }
      this.asignacion.rangos = rangos;
    }else{
      swal({
        title: 'Alerta!',
        text: 'El número de inicio no puede ser superior o igual al número de finalización',
        type: 'error',
        confirmButtonText: 'Aceptar'
      });

      this.asignacion.rangos = null;
    }
  }
  
  onEnviar(){
    swal({
      title: 'Asignando consecutivos!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();
    
    this.asignacion.idFuncionario = this.funcionario.id;

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