import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { ImoLoteService } from '../../../services/imoLote.service';
import { UserEmpresaService } from '../../../services/userEmpresa.service';
import { CfgOrganismoTransitoService } from '../../../services/cfgOrganismoTransito.service';
import { ImoCfgTipoService } from '../../../services/imoCfgTipo.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() loteInsumoInsumo:any = null;
@Input() tipoInsumo:any = null;

public errorMessage;
public respuesta;
public formReady = false;
public organismoTransitoSelect:any;
public insumoSelected;
public empresaSelected:any;
public insumos:any;
public organismosTransito:any;
public empresas:any;
public sustratos:any;

constructor(
  private _rnaloteInsumosService: ImoLoteService,
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
        setTimeout(() => {
          this.insumoSelected = Number[this.loteInsumoInsumo.tipoInsumo.id];
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

    this._CasoInsumoService.getCasoInsumoSustratoSelect().subscribe(
      response => {
        this.sustratos = response;
        setTimeout(() => {
          this.insumoSelected = Number[this.loteInsumoInsumo.tipoInsumo.id];
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
      console.log(this.tipoInsumo);
    if (this.tipoInsumo == 'SUSTRATO') {
      this._OrganismoTransitoService.selectSedes().subscribe(
        response => {
          this.organismosTransito = response;
          setTimeout(() => {
            this.organismoTransitoSelect = [this.loteInsumoInsumo.sedeOperativa.id];
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
    this.loteInsumoInsumo.sedeOperativaId = this.organismoTransitoSelect;
    this.loteInsumoInsumo.casoInsumoId = this.insumoSelected;
    let token = this._loginService.getToken();
		this._rnaloteInsumosService.edit(this.loteInsumoInsumo,token).subscribe(
			response => {
        this.respuesta = response;
        if(this.respuesta.status == 'success'){
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

		}); 
  }
  isFin() {
    this.loteInsumoInsumo.cantidad = parseInt(this.loteInsumoInsumo.rangoFin) - parseInt(this.loteInsumoInsumo.rangoInicio)+1;
   }

}