import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CvCfgModuloService } from '../../../../../services/cvCfgModulo.service';
import { PnalFuncionarioService } from '../../../../../services/pnalFuncionario.service'
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() modulo:any = null;
public errorMessage;

public funcionarios: any = null;
public funcionarioSelected: any = null;

constructor(
  private _ModuloService: CvCfgModuloService,
  private _FuncionarioService: PnalFuncionarioService,
  private _LoginService: LoginService,
  ){}

  ngOnInit(){
    this._FuncionarioService.select().subscribe(
      response => {
        this.funcionarios = response;

        setTimeout(() => {
          this.funcionarioSelected = [this.modulo.funcionario.id];
        });
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

  onCancelar(){ this.ready.emit(true); }

  onEnviar(){
    let token = this._LoginService.getToken();

		this._ModuloService.edit(this.modulo, token).subscribe(
			response => {
        if(response.status == 'success'){
          swal({
            title: response.title,
            text: response.message,
            type: response.status,
            confirmButtonText: 'Aceptar'
          });

          this.ready.emit(true);
        }else{
          swal({
            title: response.title,
            text: response.message,
            type: response.status,
            confirmButtonText: 'Aceptar'
          });
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