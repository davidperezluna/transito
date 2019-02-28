import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {rnaRegistroInsumos} from '../rnaRegistroInsumos.modelo';
import {RnaLoteInsumoService} from '../../../services/rnaloteInsumos.service';
import {LoginService} from '../../../services/login.service';
import { UserEmpresaService } from '../../../services/userEmpresa.service';
import { CfgOrganismoTransitoService } from '../../../services/cfgOrganismoTransito.service';
import { ImoCfgTipoService } from '../../../services/imoCfgTipo.service';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2'; 

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  providers: [DatePipe]
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public rnaRegistroInsumos: rnaRegistroInsumos;
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
public empresaInsumoSelected:any;
public insumoInsumoSelected:any;
public frmInsumo:any=false;
public date:any;

constructor(
  private datePipe: DatePipe,
  private _rnaRegistroInsumosService: RnaLoteInsumoService,
  private _loginService: LoginService,
  private _EmpresaService: UserEmpresaService,
  private _OrganismoTransitoService: CfgOrganismoTransitoService,
  private _CasoInsumoService: ImoCfgTipoService,
  ){}

  ngOnInit() {
    this.date = new Date();
    var datePiper = new DatePipe(this.date);
    this.rnaRegistroInsumos = new rnaRegistroInsumos(null,null,null,null,null,null,null,null,null,null,null);
    this.rnaRegistroInsumos.fecha = datePiper.transform(this.date,'yyyy-MM-dd');

    this._EmpresaService.select().subscribe(
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

  }
  onCancelar(){
    this.ready.emit(true);
  }
  onEnviar(){
    let token = this._loginService.getToken();
    this.rnaRegistroInsumos.sedeOperativaId = this.sedeSelected;
    if (!this.frmInsumo) {
      this.rnaRegistroInsumos.empresaId = this.empresaSelected;
      this.rnaRegistroInsumos.casoInsumoId = this.insumoSelected;
     
    }else{

      this.rnaRegistroInsumos.empresaId = this.empresaInsumoSelected;
      this.rnaRegistroInsumos.casoInsumoId = this.insumoInsumoSelected;
    }
		this._rnaRegistroInsumosService.register(this.rnaRegistroInsumos,token).subscribe(
			response => {
        this.respuesta = response;
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
            text: this.respuesta.msj,
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
   this.rnaRegistroInsumos.cantidad = parseInt(this.rnaRegistroInsumos.rangoFin) - parseInt(this.rnaRegistroInsumos.rangoInicio)+1;
  }

  onInsumo() {
    this.frmInsumo = true;
  }
  onSustrato() {
    this.frmInsumo = false;
  }
}