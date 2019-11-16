import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { VhloCfgEmpresaGps } from '../vhloCfgEmpresaGps.modelo';
import { VhloCfgEmpresaGpsService } from '../../../../../services/vhloCfgEmpresaGps.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-vhlocfgempresagps',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public empresaGps: VhloCfgEmpresaGps;
  public errorMessage;

constructor(
  private _EmpresaGpsService: VhloCfgEmpresaGpsService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.empresaGps = new VhloCfgEmpresaGps(null, null, null, null);
  }

  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._loginService.getToken();
    
		this._EmpresaGpsService.register(this.empresaGps,token).subscribe(
			response => {
        if(response.code == 200){
          this.ready.emit(true);
          swal({
            title: response.title,
            text: response.message,
            type: response.status,
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: response.title,
            text: response.message,
            type: response.status,
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