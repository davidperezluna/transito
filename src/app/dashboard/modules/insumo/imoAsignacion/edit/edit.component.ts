import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {ImoAsignacion} from '../imoAsignacion.modelo';
//import { RnaLoteInsumoService } from '../../../../../services/rnaloteInsumos.service';
import { UserEmpresaService } from '../../../../../services/userEmpresa.service';
import { CfgOrganismoTransitoService } from '../../../../../services/cfgOrganismoTransito.service';
import { ImoCfgTipoService } from '../../../../../services/imoCfgTipo.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-insumo-asignacion',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() loteInsumoInsumo:any = null;
@Input() tipoInsumo:any = null;

public errorMessage;
public formReady = false;
public sedeSelected:any;
public insumoSelected:any;
public empresaSelected:any;
public insumos:any;
public sedes:any;
public empresas:any;
public sustratos:any;

constructor(
  //private _rnaloteInsumosService: RnaLoteInsumoService,
  private _loginService: LoginService,
  private _EmpresaService: UserEmpresaService,
  private _OrganismoTransitoService: CfgOrganismoTransitoService,
  private _CasoInsumoService: ImoCfgTipoService,
  ){}

  ngOnInit(){ 

    this._EmpresaService.select().subscribe(
      response => {
        this.empresas = response;
        setTimeout(() => {
           this.empresaSelected = [this.loteInsumoInsumo.empresa.id];
        });
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

    if (this.tipoInsumo == 'sustrato') {
      this._OrganismoTransitoService.selectSedes().subscribe(
        response => {
          this.sedes = response;
          setTimeout(() => {
            this.sedeSelected = [this.loteInsumoInsumo.sedeOperativa.id];
          });
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
  }

  onCancelar(){ this.ready.emit(true); }

  onEnviar(){
    this.loteInsumoInsumo.empresaId = this.empresaSelected;
    this.loteInsumoInsumo.sedeOperativaId = this.sedeSelected;
    this.loteInsumoInsumo.casoInsumoId = this.insumoSelected;
    let token = this._loginService.getToken();
		/*this._rnaloteInsumosService.edit(this.loteInsumoInsumo,token).subscribe(
			response => {
        if(response.code == 200){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
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

		}); */
  }
  isFin() {
    this.loteInsumoInsumo.cantidad = parseInt(this.loteInsumoInsumo.rangoFin) - parseInt(this.loteInsumoInsumo.rangoInicio)+1;
   }

}