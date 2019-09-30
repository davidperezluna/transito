/* ` */import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
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

public sedes:any;
public sustratos:any;
public insumos:any;
public numero:any;
public table:any;

public datos = {
  'casoInsumo': null,
  'cantidad': null,
  'idOrganismoTransitoOrigen': null,
  'idOrganismoTransitoDestino': null,
};
public sustratosSelect: any = [];

constructor(
  private _OrganismoTransitoService: CfgOrganismoTransitoService,
  private _CasoInsumoService: ImoCfgTipoService,
  private _InsumoService: ImoInsumoService,
  private _LoteService: ImoLoteService,
  private _LoginService: LoginService,
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

  onSearch(){
    swal({
      title: 'Cargando Tabla!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    this._InsumoService.isExistencia(this.datos).subscribe(
			response => {
        if(response.code == 200){
          this.insumos = response.data;

          swal({
            title: 'Registro encontrado!',
            type: 'success',
            text: response.message,
            confirmButtonText: 'Aceptar'
          });

          setTimeout(() => {
            this.onInitTable();
            swal.close();
          });
        }else{
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
      let data = {
        'tipoInsumo':this.datos.casoInsumo,
        'idOrganismoTransito':this.datos.idOrganismoTransitoOrigen,
      }
      let token = this._LoginService.getToken();

      this._LoteService.showReasignacion(data,token).subscribe( 
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
          sFirst: '<i class="fa fa-step-backward"></i>',
          sPrevious: '<i class="fa fa-chevron-left"></i>',
          sNext: '<i class="fa fa-chevron-right"></i>',
          sLast: '<i class="fa fa-step-forward"></i>'
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
      'insumos': this.sustratosSelect, 
      'tipoInsumo': this.datos.casoInsumo,   
      'idOrganismoTransitoOrigen': this.datos.idOrganismoTransitoOrigen,
      'idOrganismoTransitoDestino': this.datos.idOrganismoTransitoDestino,
    }
    
    this._InsumoService.reasignacionSustrato(datos).subscribe( 
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

  onSelectSustrato(insumo: any, eve: any) {
    if (eve.target.checked) {
      this.sustratosSelect.push(insumo);
    } else {
      let index = this.sustratosSelect.indexOf(insumo);
      if (index > -1) {
        this.sustratosSelect.splice(index, 1);
      }
    }
    console.log(this.sustratosSelect); 
  } 
}