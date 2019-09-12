import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {ImoLote} from '../imoLote.modelo';
import {ImoLoteService} from '../../../../../services/imoLote.service';
import {LoginService} from '../../../../../services/login.service';
import { UserEmpresaService } from '../../../../../services/userEmpresa.service';
import { CfgOrganismoTransitoService } from '../../../../../services/cfgOrganismoTransito.service';
import { ImoCfgTipoService } from '../../../../../services/imoCfgTipo.service';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2'; 

@Component({
  selector: 'app-new-insumo-lote',
  templateUrl: './new.component.html',
  providers: [DatePipe]
})
export class NewComponent implements OnInit {
@Output() onReady = new EventEmitter<any>();
public ImoLote: ImoLote;
public errorMessage;

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

public tipoInsumo: any = null;

public tiposInsumo = [
  {'value': 1, 'label': 'SUSTRATO'},
  {'value': 2, 'label': 'INSUMO'},
];

constructor(
  private datePipe: DatePipe,
  private _ImoLoteService: ImoLoteService,
  private _loginService: LoginService,
  private _EmpresaService: UserEmpresaService,
  private _OrganismoTransitoService: CfgOrganismoTransitoService,
  private _CasoInsumoService: ImoCfgTipoService,
  ){}

  ngOnInit() {
    this.date = new Date();
    var datePiper = new DatePipe(this.date);
    this.ImoLote = new ImoLote(null,null,null,null,null,null,null,null,null,null,null);
    this.ImoLote.fecha = datePiper.transform(this.date,'yyyy-MM-dd');

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
    this.onReady.emit(true);
  }

  onEnviar(){
    swal({
      title: 'Enviando datos!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._loginService.getToken();

    this.ImoLote.idOrganismoTransito = this.sedeSelected;

    if (this.tipoInsumo == '1') {
      this.ImoLote.idEmpresa = this.empresaSelected;
      this.ImoLote.imoCfgTipo = this.insumoSelected;
    }else{
      this.ImoLote.idEmpresa = this.empresaInsumoSelected;
      this.ImoLote.imoCfgTipo = this.insumoInsumoSelected;
    }

		this._ImoLoteService.register(this.ImoLote,token).subscribe(
			response => {
        if(response.code == 200){
          this.onReady.emit(true);
          
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
        }else{
          swal({
            title: 'Error!',
            text: response.message,
            type: 'error',
            confirmButtonText: 'Aceptar'
          });
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
   this.ImoLote.cantidad = parseInt(this.ImoLote.rangoFin) - parseInt(this.ImoLote.rangoInicio)+1;
  }

  /*onInsumo() {
    this.frmInsumo = true;
  }
  onSustrato() {
    this.frmInsumo = false;
  }*/
}