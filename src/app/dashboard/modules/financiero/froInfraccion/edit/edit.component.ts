import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { FroInfraccionService } from '../../../../../services/froInfraccion.service';
import { FroInfrCfgCategoriaService } from '../../../../../services/froInfrCfgCategoria.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-froinfraccion',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() infraccion:any = null;
public errorMessage;
public formReady = false;
public infraccionCategorias: any;
public infraccionCategoriaSelected: any;

constructor(
  private _InfraccionService: FroInfraccionService,
  private _InfraccionCategoriaService: FroInfrCfgCategoriaService,
  private _LoginService: LoginService,
  ){}

  ngOnInit(){
    this._InfraccionCategoriaService.select().subscribe(
      response => {
        this.infraccionCategorias = response;
        setTimeout(() => {
          this.infraccionCategoriaSelected = [this.infraccion.categoria.id];
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

    this.infraccion.categoria.id = this.infraccionCategoriaSelected;

		this._InfraccionService.edit(this.infraccion, token).subscribe(
			response => {
        if(response.code == 200){
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: response.status,
            confirmButtonText: 'Aceptar'
          });

          this.ready.emit(true);
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