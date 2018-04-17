import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { SustratoService } from '../../../services/sustrato.service';
import { LoginService } from '../../../services/login.service';
import { SedeOperativaService } from '../../../services/sedeOperativa.service';
import { ModuloService } from '../../../services/modulo.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() sustrato:any = null;
  public errorMessage;
  public respuesta;
  public formReady = false;
  public sedesOperativas: any;
  public sedeOperativaSelected: any;
  public modulos: any;
  public moduloSelected: any;
  public estadoList: string[];

constructor(
  private _SustratoService: SustratoService,
  private _loginService: LoginService,
  private _SedeOperativaService: SedeOperativaService,
  private _ModuloService: ModuloService,
  ){}

  ngOnInit(){ 
    console.log(this.sustrato);
    this.estadoList = ['Utilizado', 'Disponible', 'Dañado por impresión.'];

    this._SedeOperativaService.getSedeOperativaSelect().subscribe(
      response => {
        this.sedesOperativas = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );

    this._ModuloService.getModuloSelect().subscribe(
      response => {
        this.modulos = response;
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

  onCancelar(){ this.ready.emit(true); }

  onEnviar(){
    let token = this._loginService.getToken();
    this.sustrato.sedeOperativaId = this.sedeOperativaSelected;
    this.sustrato.moduloId = this.moduloSelected;

		this._SustratoService.editSustrato(this.sustrato,token).subscribe(
			response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Pefecto!',
            text: 'El registro se ha modificado con exito',
            type: 'success',
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