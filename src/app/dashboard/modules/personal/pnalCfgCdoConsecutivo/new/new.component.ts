import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PnalCfgCdoConsecutivo } from '../pnalCfgCdoConsecutivo.modelo';
import { PnalCfgCdoConsecutivoService } from '../../../../../services/pnalCfgCdoConsecutivo.service';
import { PnalFuncionarioService } from '../../../../../services/pnalFuncionario.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-pnalcfgcdoconsecutivo',
  templateUrl: './new.component.html'
})

export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public consecutivo: PnalCfgCdoConsecutivo;

public funcionarios: any;
public funcionarioSelected: any;
public errorMessage;

constructor(
  private _ConsecutivoService: PnalCfgCdoConsecutivoService,
  private _FuncionarioService: PnalFuncionarioService,
  private _LoginService: LoginService,
  ){}

  ngOnInit() {
    this.consecutivo = new PnalCfgCdoConsecutivo(null, null, null, null, null, null);

    this._FuncionarioService.selectAgentes().subscribe(
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

  onCalcularTotal() {
    let ini, fin, cantidad;
    ini = Number(this.consecutivo.desde);
    fin = Number(this.consecutivo.hasta);

    if (fin > ini) {
      cantidad = (fin - ini) + 1;

      if (cantidad < 0) {
        cantidad = 0;
      }
      this.consecutivo.cantidad = cantidad;
    }else{
      swal({
        title: 'Alerta!',
        text: 'El número de inicio no puede ser superior o igual al número de finalización',
        type: 'error',
        confirmButtonText: 'Aceptar'
      });

      this.consecutivo.cantidad = null;
    }
  }
  
  onEnviar(){
    let token = this._LoginService.getToken();

    this._ConsecutivoService.register(this.consecutivo, token).subscribe(
      response => {
        if(response.status == 'success'){
          this.ready.emit(true);

          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });

          //this.consecutivo = response.data;
        }else{
          swal({
            title: 'Error!',
            text: 'El consecutivo ya se encuentra registrado',
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