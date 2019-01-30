import { Component, OnInit,Output, Input, EventEmitter } from '@angular/core';
import { CvCdoTrazabilidad } from '../cvCdoTrazabilidad.modelo';
import { CvCdoTrazabilidadService } from '../../../services/cvCdoTrazabilidad.service';
import { CfgCargoService } from '../../../services/cfgCargo.service';
import { CfgComparendoEstadoService } from '../../../services/cfgComparendoEstado.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Input() comparendo: any = null;
  public trazabilidad: CvCdoTrazabilidad;
  public errorMessage;
  public cargos: any = null;
  public estados: any = null;
  public arrayCargos: any = [];

  public dias = [
    { 'value': '1', 'label': 'Lunes' },
    { 'value': '2', 'label': 'Martes' },
    { 'value': '3', 'label': 'Miercoles' },
    { 'value': '4', 'label': 'Jueves' },
    { 'value': '5', 'label': 'Viernes' },
  ];

constructor(
  private _ProveedorService: CvCdoTrazabilidadService,
  private _CargoService: CfgCargoService,
  private _EstadoService: CfgComparendoEstadoService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.trazabilidad = new CvCdoTrazabilidad(null, null, null, null, null, null);

    this._CargoService.select().subscribe(
      response => {
        this.cargos = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );

    this._EstadoService.select().subscribe(
      response => {
        this.estados = response;
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

    let datos = {
      'trazabilidad': this.trazabilidad,
      'arrayCargos': this.arrayCargos
    }
    
		this._ProveedorService.register(datos, token).subscribe(
			response => {
        if(response.status == 'success'){
          this.ready.emit(true);
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