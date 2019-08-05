import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { VhloPropietario } from '../vhloPropietario.modelo';
import { PnalFuncionarioService } from '../../../../../services/pnalFuncionario.service';
import { UserCfgRoleService } from '../../../../../services/userCfgRole.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
  public propietario: VhloPropietario;
public errorMessage;
public propietarios: any = null;
public roles: any = null;

constructor(
  private _PnalFuncionarioService: PnalFuncionarioService,
  private _UserCfgRoleService: UserCfgRoleService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.propietario = new VhloPropietario(null, null, null, null, null, null);

    this._PnalFuncionarioService.select().subscribe(
      response => {
        this.propietarios = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._UserCfgRoleService.select().subscribe(
      response => {
        this.roles = response;
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
  
  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._loginService.getToken();
    
		this._PnalFuncionarioService.register(this.propietario,token).subscribe(
			response => {
        if(response.status == 'success'){
          this.ready.emit(true);
          this._PnalFuncionarioService.cartData.emit(this.propietarios);
          
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
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