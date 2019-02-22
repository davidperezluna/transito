import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { Sustrato } from '../sustrato.modelo';
import { SustratoService } from '../../../services/sustrato.service';
import { LoginService } from '../../../services/login.service';
import { SedeOperativaService } from '../../../services/sedeOperativa.service';
import { ModuloService } from '../../../services/modulo.service';
import { VhloCfgClaseService } from '../../../services/vhloCfgClase.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
  public sustrato: Sustrato;
  public errorMessage;
  public respuesta;
  public sedesOperativas: any;
  public sedeOperativaSelected: any;
  public modulos: any;
  public moduloSelected: any;
  public clases: any;
  public claseSelected: any;
  public estadoList: string[];
  public estadoSelected: any;

constructor(
  private _SustratoService: SustratoService,
  private _loginService: LoginService,
  private _SedeOperativaService: SedeOperativaService,
  private _ModuloService: ModuloService,
  private _ClaseService: VhloCfgClaseService,
  ){}

  ngOnInit() {
    this.sustrato = new Sustrato(null, null, null, null, null, null,null,null,null,null,null,null);
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

    this._ClaseService.getClaseSelect().subscribe(
      response => {
        this.clases = response;
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
    this.ready.emit(true);
  }
  onEnviar(){
    let token = this._loginService.getToken();
    this.sustrato.estado = this.estadoSelected;
    this.sustrato.sedeOperativaId = this.sedeOperativaSelected;
    this.sustrato.moduloId = this.moduloSelected;
    this.sustrato.claseId = this.claseSelected;

    console.log(this.sustrato);
		this._SustratoService.register(this.sustrato,token).subscribe(
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
            text: 'El sustrato '+  +' ya se encuentra registrada',
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