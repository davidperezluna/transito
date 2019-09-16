import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { CfgOrganismoTransitoService } from '../../../../../services/cfgOrganismoTransito.service';
import { ImoCfgTipoService } from '../../../../../services/imoCfgTipo.service';
import {ImoInsumoService} from '../../../../../services/imoInsumo.service';
import { ImoLoteService } from '../../../../../services/imoLote.service';
import {LoginService} from '../../../../../services/login.service';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-new-insumo-reasignacion',
  templateUrl: './new.component.html',
  providers: [DatePipe]
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public errorMessage;

public empresaSelected:any;
public sedes:any;
public sedeOrigenSelected:any;
public sedeDestinoSelected:any;
public sustratos:any;
public insumoSelected:any;
public numero:any;
public insumos:any;
public table:any;
public isCantidad=true;
public datosAsignacion = {
  'sedeOrigen': null,
  'sedeDestino': null,
  'casoInsumo': null,
  'cantidad': null,
};

constructor(
  private _OrganismoTransitoService: CfgOrganismoTransitoService,
  private _CasoInsumoService: ImoCfgTipoService,
  private _ImoInsumoService: ImoInsumoService,
  private _ImoLoteService: ImoLoteService,
  private _loginService: LoginService,
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

  changedSedeOperativa(e){
    if (e) {

    }
  }

  isExistencia(){
    this.datosAsignacion.sedeDestino = this.sedeDestinoSelected;
    this.datosAsignacion.sedeOrigen = this.sedeOrigenSelected;
    this.datosAsignacion.casoInsumo = this.insumoSelected;
    if (this.table) {
      this.table.destroy()
    }
    this._ImoInsumoService.isExistencia(this.datosAsignacion).subscribe(
			response => {
        if(response.code == 200){
          this.isCantidad = false;
          this.insumos = response.data;
          swal({
            title: 'Registro encontrado!',
            type: 'success',
            text: response.message,
            confirmButtonText: 'Aceptar'
          })
          setTimeout(() => {
            this.onInitTable();
          });
        }else{
          this.isCantidad = true;
          swal({
            title: 'Error!',
            type: 'error',
            text: response.message,
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

  onSearchLote(){
      swal({
        title: 'Enviando datos!',
        text: 'Solo tardara unos segundos por favor espere.',
        onOpen: () => {
          swal.showLoading()
        }
      });

      if (this.table) {
        this.table.destroy()
      }
      let datos={
        'tipoInsumo':this.insumoSelected,
        'idOrganismoTransito':this.sedeOrigenSelected,
      }
      let token = this._loginService.getToken();

      this._ImoLoteService.showReasignacion(datos,token).subscribe( 
        response => {
          if (response.code == 200) {
            this.insumos = response.data;
            swal.close()
            setTimeout(() => {
              this.onInitTable();
            });
          }else{
            this.insumos = null;

            swal({
              title: 'Error!',
              text: 'No existen sustratos para esta sede',
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
        }
      );
  }

  onInitTable(){
    this.table = $('#dataTables-example').DataTable({
      responsive: true,
      pageLength: 8,
      sPaginationType: 'full_numbers',
      oLanguage: {
          oPaginate: {
          sFirst: '<<',
          sPrevious: '<',
          sNext: '>',
          sLast: '>>'
        }
      }
    });
  }

  onEnviar(){
    swal({
      title: 'Enviando datos!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });
    console.log(1);

    let datos = {
      'insumos': this.insumos, 
      'sedeOperativaOrigen': this.sedeOrigenSelected,
      'tipoInsumo': this.insumoSelected,   
      'sedeOperativaDestino': this.sedeDestinoSelected
    }
    
    this._ImoInsumoService.reasignacionSustrato(datos).subscribe( 
      response => {
        if (response.code == 200) {
          this.insumos = null;

          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });

          setTimeout(() => {
            this.onInitTable();
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
      }
    );
  }
}