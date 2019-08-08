import { Component, OnInit, Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { BpCuenta } from '../bpCuenta.modelo';
import { BpCuentaService } from '../../../../../services/bpCuenta.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-cuenta',
  templateUrl: './new.component.html'
})

export class NewComponent implements OnInit {
  @Output() onReady = new EventEmitter<any>();
  @Input() proyecto: any = null;
  public cuenta: BpCuenta;
  public errorMessage;

  constructor(
    private _CuentaService: BpCuentaService,
    private _LoginService: LoginService,
  ){}

  ngOnInit() {
    this.cuenta = new BpCuenta(null, null, null, null);
  }

  onCancelar(){
    this.onReady.emit();
  }
  
  onEnviar(){
    let token = this._LoginService.getToken();

    this.cuenta.idProyecto = this.proyecto.id;
    
		this._CuentaService.register(this.cuenta,token).subscribe(
			response => {
        if(response.status == 'success'){
          this.onReady.emit();
          
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