import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { ImoLoteService } from '../../../../../services/imoLote.service';
import { UserEmpresaService } from '../../../../../services/userEmpresa.service';
import { CfgOrganismoTransitoService } from '../../../../../services/cfgOrganismoTransito.service';
import { ImoCfgTipoService } from '../../../../../services/imoCfgTipo.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-insumo-lote',
  templateUrl: './edit.component.html',
  providers: [DatePipe]
})

export class EditComponent implements OnInit{
@Output() onReady = new EventEmitter<any>();
@Input() loteInsumo:any = null;
@Input() tipoInsumo:any = null;

public errorMessage;
public formReady = false;

public tiposInsumo:any;
public insumoSelected;

public empresas:any;
public empresaSelected:any;

public organismosTransito:any;
public organismoTransitoSelect:any;

public sustratos:any;
public insumos: any;

public insumoInsumoSelected:any;
public empresaInsumoSelected:any;

constructor(
  private _loteInsumosService: ImoLoteService,
  private _EmpresaService: UserEmpresaService,
  private _OrganismoTransitoService: CfgOrganismoTransitoService,
  private _CasoInsumoService: ImoCfgTipoService,
  private _loginService: LoginService,
  ){}

  ngOnInit(){ 
    var datePiper = new DatePipe(this.loteInsumo.fecha.timestamp);
    this.loteInsumo.fecha = datePiper.transform(this.loteInsumo.fecha.timestamp, 'yyyy-MM-dd');

    this._EmpresaService.select().subscribe(
      response => {
        this.empresas = response;
        
        setTimeout(() => {
           this.empresaSelected = [this.loteInsumo.empresa.id];
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
        this.tiposInsumo = response;

        setTimeout(() => {
          this.insumoSelected = [this.loteInsumo.tipoInsumo.id];
        },100);
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
          this.insumoSelected = Number[this.loteInsumo.tipoInsumo.id];
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

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    if (this.tipoInsumo == 'SUSTRATO') {
      this._OrganismoTransitoService.selectSedes().subscribe(
        response => {
          this.organismosTransito = response;

          setTimeout(() => {
            this.organismoTransitoSelect = [this.loteInsumo.sedeOperativa.id];
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

  onCancelar(){ this.onReady.emit(true); }

  onEnviar(){
    this.loteInsumo.empresaId = this.empresaSelected;
    this.loteInsumo.sedeOperativaId = this.organismoTransitoSelect;
    this.loteInsumo.casoInsumoId = this.insumoSelected;
    let token = this._loginService.getToken();
		this._loteInsumosService.edit(this.loteInsumo,token).subscribe(
			response => {
        if(response.code == 200){
          this.onReady.emit(true);
          
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
    this.loteInsumo.cantidad = parseInt(this.loteInsumo.rangoFin) - parseInt(this.loteInsumo.rangoInicio)+1;
   }

}