import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { CfgOrganismoTransitoService } from '../../../services/cfgOrganismoTransito.service';
import { CfgCasoInsumoService } from '../../../services/cfgCasoInsumo.service';
import {RnaInsumoService} from '../../../services/rnaInsumos.service';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  providers: [DatePipe]
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public errorMessage;
public respuesta;
public empresaSelected:any;
public sedes:any;
public sedeOrigenSelected:any;
public sedeDestinoSelected:any;
public sustratos:any;
public insumoSelected:any;
public numero:any;
public isCantidad=true;
public datosAsignacion = {
  'sedeOrigen': null,
  'sedeDestino': null,
  'casoInsumo': null,
  'cantidad': null,
};

constructor(
  private _OrganismoTransitoService: CfgOrganismoTransitoService,
  private _CasoInsumoService: CfgCasoInsumoService,
  private _RnaInsumoService: RnaInsumoService,
  ){}

  ngOnInit() {

    this._OrganismoTransitoService.selectSedes().subscribe(
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

    this._CasoInsumoService.getCasoInsumoSustratoSelect().subscribe(
      response => {
        this.sustratos = response;
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
    this.datosAsignacion.sedeDestino = this.sedeDestinoSelected;
    this.datosAsignacion.sedeOrigen = this.sedeOrigenSelected;
    this.datosAsignacion.casoInsumo = this.insumoSelected;    
		this._RnaInsumoService.reasignacionSustrato(this.datosAsignacion).subscribe(
			response => {
        this.respuesta = response;
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: this.respuesta.msj,
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

  changedSedeOperativa(e){
    if (e) {

    }
  }

  isExistencia(){
    this.datosAsignacion.sedeDestino = this.sedeDestinoSelected;
    this.datosAsignacion.sedeOrigen = this.sedeOrigenSelected;
    this.datosAsignacion.casoInsumo = this.insumoSelected;
    this._RnaInsumoService.isExistencia(this.datosAsignacion).subscribe(
			response => {
        this.respuesta = response;
        if(this.respuesta.status == 'success'){
          this.isCantidad = false;
        }else{
          this.isCantidad = true;
          swal({
            title: 'Error!',
            type: 'error',
            text: this.respuesta.msj,
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