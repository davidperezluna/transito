import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {rnaRegistroInsumos} from '../rnaRegistroInsumos.modelo';
import {RnaLoteInsumoService} from '../../../services/rnaloteInsumos.service';
import {LoginService} from '../../../services/login.service';
import { EmpresaService } from '../../../services/empresa.service';
import { SedeOperativaService } from '../../../services/sedeOperativa.service';
import { CasoInsumoService } from '../../../services/casoInsumo.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public rnaRegistroInsumos: rnaRegistroInsumos;
public errorMessage;
public respuesta;
public empresas:any;
public empresasSelect:any;
public sedes:any;
public sedeSelect:any;
public insumos:any;
public insumoSelect:any;

constructor(
  private _rnaRegistroInsumosService: RnaLoteInsumoService,
  private _loginService: LoginService,
  private _EmpresaService: EmpresaService,
  private _SedeOperativaService: SedeOperativaService,
  private _CasoInsumoService: CasoInsumoService,
  ){}

  ngOnInit() {
    this.rnaRegistroInsumos = new rnaRegistroInsumos(null,null,null,null,null,null,null,null,null,null,null);

    this._EmpresaService.getEmpresaSelect().subscribe(
      response => {
        this.empresas = response;
      }, 
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );
    this._CasoInsumoService.getCasoInsumoSelect().subscribe(
      response => {
        this.insumos = response;
      }, 
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._SedeOperativaService.getSedeOperativaSelect().subscribe(
      response => {
        this.sedes = response;
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

		this._rnaRegistroInsumosService.register(this.rnaRegistroInsumos,token).subscribe(
			response => {
        this.respuesta = response;
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'El registro se ha registrado con exito',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: 'Error!',
            text: 'El codigo ya se encuentra registrado',
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