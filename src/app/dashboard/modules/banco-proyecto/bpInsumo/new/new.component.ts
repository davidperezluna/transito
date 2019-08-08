import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { BpInsumo } from '../bpInsumo.modelo';
import { BpInsumoService } from '../../../../../services/bpInsumo.service';
import { BpCfgTipoInsumoService } from '../../../../../services/bpCfgTipoInsumo.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-insumo',
  templateUrl: './new.component.html'
})

export class NewComponent implements OnInit {
  @Output() onReady = new EventEmitter<any>();
  @Input() actividad: any = null;
  public insumo: BpInsumo;
  public errorMessage;

  public tiposInsumo: any = null;

  constructor(
    private _TipoInsumoService: BpCfgTipoInsumoService,
    private _InsumoService: BpInsumoService,
    private _LoginService: LoginService,
  ){}

  ngOnInit() {
    this.insumo = new BpInsumo(null, null, null, null, null, null, null, null);

    this._TipoInsumoService.select().subscribe(
      response => {
        this.tiposInsumo = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );
  }

  onCancelar(){
    this.onReady.emit();
  }

  onCalcularTotal() {
    let cantidad, valor;
    cantidad = this.insumo.cantidad;
    valor = this.insumo.valorUnitario;

    if (cantidad == 0 || valor == 0) {
      swal({
        title: 'Alerta!',
        text: 'La cantidad y/o el valor unitario no pueden estar en 0',
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
      this.insumo.valorTotal = 0;
    } else {
      this.insumo.valorTotal = cantidad * valor;
    }
  }
  
  onEnviar(){
    let token = this._LoginService.getToken();

    this.insumo.idActividad = this.actividad.id;
    
		this._InsumoService.register(this.insumo,token).subscribe(
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