import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { SvIpatConsecutivo } from '../svIpatConsecutivo.modelo';
import { PnalCfgCdoConsecutivoService } from '../../../services/pnalCfgCdoConsecutivo.service';
import { PnalFuncionarioService } from '../../../services/pnalFuncionario.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})

export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public consecutivo: SvIpatConsecutivo;

public funcionarios: any;
public funcionarioSelected: any;
public errorMessage;
public respuesta: any = null;

constructor(
  private _ComparendoService: PnalCfgCdoConsecutivoService,
  private _FuncionarioService: PnalFuncionarioService,
  private _LoginService: LoginService,
  ){}

  ngOnInit() {
    this.consecutivo = new SvIpatConsecutivo(null, null, null);

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
    let token = this._LoginService.getToken();
    
    this.consecutivo.idFuncionario = this.funcionarioSelected;

    this._ComparendoService.register(this.consecutivo,token).subscribe(
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