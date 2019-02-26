import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { CfgMunicipio } from '../cfgMunicipio.modelo';
import { CfgDepartamentoService } from '../../../services/cfgDepartamento.service';
import { CfgMunicipioService } from '../../../services/cfgMunicipio.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public municipio: CfgMunicipio;
public errorMessage;
public respuesta;
public departamentos:any;
public departamentoSelected:any;

constructor(
  private _DepartamentoService: CfgDepartamentoService,
  private _CfgMunicipioService: CfgMunicipioService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.municipio = new CfgMunicipio(null,null,null,null);

    this._DepartamentoService.select().subscribe(
        response => {
          this.departamentos = response;
        }, 
        error => {
          this.errorMessage = <any>error;

          if(this.errorMessage != null){
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
    this.municipio.departamentoId = this.departamentoSelected;
    
    console.log(this.municipio);
		this._CfgMunicipioService.register(this.municipio,token).subscribe(
			response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'Registro exitoso!',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: 'Error!',
            text: 'El municipio '+ this.municipio.nombre +' ya se encuentra registrado',
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