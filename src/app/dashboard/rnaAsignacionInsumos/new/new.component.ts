import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {rnaAsignacionInsumos} from '../rnaAsignacionInsumos.modelo';
import {RnaLoteInsumoService} from '../../../services/rnaloteInsumos.service';
import {LoginService} from '../../../services/login.service';
import { EmpresaService } from '../../../services/empresa.service';
import { SedeOperativaService } from '../../../services/sedeOperativa.service';
import { CasoInsumoService } from '../../../services/casoInsumo.service';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  providers: [DatePipe]
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public rnaAsignacionInsumos: rnaAsignacionInsumos;
public errorMessage;
public respuesta;
public empresas:any;
public empresaSelected:any;
public sedes:any;
public sedeSelected:any;
public insumos:any;
public sustratos:any;
public insumoSelect:any;
public insumoSelected:any;
public insumoSelectedInsumo:any;
public date:any;
public frmInsumo:any=true;
public frmInsumoSelect:any=true;

constructor(
  private datePipe: DatePipe,
  private _rnaRegistroInsumosService: RnaLoteInsumoService,
  private _loginService: LoginService,
  private _EmpresaService: EmpresaService,
  private _SedeOperativaService: SedeOperativaService,
  private _CasoInsumoService: CasoInsumoService,
  ){}

  ngOnInit() {
    this.date = new Date();
    var datePiper = new DatePipe(this.date);
    this.rnaAsignacionInsumos = new rnaAsignacionInsumos(null,null,null,null,null,null,null,null,null);
    this.rnaAsignacionInsumos.fecha = datePiper.transform(this.date,'yyyy-MM-dd');


    this._CasoInsumoService.getCasoInsumoInsumoSelect().subscribe(
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
    this.rnaAsignacionInsumos.sedeOperativaId = this.sedeSelected;
    if (this.frmInsumo) {
      this.rnaAsignacionInsumos.casoInsumoId = this.insumoSelected;
    }else{
      this.rnaAsignacionInsumos.casoInsumoId = this.insumoSelectedInsumo;
    }
		this._rnaRegistroInsumosService.register(this.rnaAsignacionInsumos,token).subscribe(
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
  isFin() {
   this.rnaAsignacionInsumos.numero = parseInt(this.rnaAsignacionInsumos.rangoFin) - parseInt(this.rnaAsignacionInsumos.rangoInicio)+1;
  }

  changedSedeOperativa(e){
    if (e) {
      this.frmInsumoSelect = false;
    }
  }

  changedInsumo(e){
    if (e) {
      if (this.frmInsumo) {
        console.log(this.insumoSelectedInsumo);
      }else{
        console.log(this.insumoSelected);
      }
    } 
  }

  onInsumo() {
    this.frmInsumo = true;
  }
  onSustrato() {
    this.frmInsumo = false;
  }

}