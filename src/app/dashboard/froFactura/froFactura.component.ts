import { Component, OnInit } from '@angular/core';
import { FroFacturaService } from '../../services/froFactura.service';
import { CfgOrganismoTransitoService } from '../../services/cfgOrganismoTransito.service';
import { FroTramiteService } from '../../services/froTramite.service';
import { FroInfraccionService } from '../../services/froInfraccion.service';
import { LoginService } from '../../services/login.service';
import { environment } from 'environments/environment'
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './froFactura.component.html'
})

export class FroFacturaComponent implements OnInit {
  public errorMessage;
  public apiUrl = environment.apiUrl;
  
  public formIndex = false;
  public formSearch = true;

  public table: any = null;

  public organismosTransito: any = null;
  public tramites: any = null;
  public infracciones: any = null;
  public facturas: any = null;

  public search: any = {
    'tipoFiltro': null,
    'filtro': null,
    'fechaInicial': null,
    'fechaFinal': null,
    'tipoRecaudo': null,
    'idTramite': null,
    'idInfraccion': null,
  }

  public tiposRecaudo = [
    { 'value': null, 'label': 'Seleccione un tipo' },
    { 'value': 'TRAMITES', 'label': 'TRAMITES' },
    { 'value': 'INFRACCIONES', 'label': 'INFRACCIONES' },
  ];

  public tiposFiltro = [
    { 'value': 1, 'label': 'No. de factura' },
    { 'value': 2, 'label': 'Sede operativa' },
    { 'value': 3, 'label': 'Valor de recaudo' },
  ];

  constructor(
    private _OrganismoTransitoService: CfgOrganismoTransitoService,
    private _TramiteService: FroTramiteService,
    private _InfraccionService: FroInfraccionService,
    private _FacturaService: FroFacturaService,
    private _LoginService: LoginService,
  ){}
    
  ngOnInit() {  }

  onSearch() {
    swal({
      title: 'Buscando registros!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    this.formIndex = false;

    let token = this._LoginService.getToken();

    this._FacturaService.searchByFilters(this.search, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.facturas = response.data;
          this.formIndex = true;

          swal({
            title: response.title,
            text: response.message,
            type: response.status,
            confirmButtonText: 'Aceptar'
          });

          let timeoutId = setTimeout(() => {
            this.onInitTable();
          }, 100);
        } else {
          this.facturas = null;

          swal({
            title: response.title,
            text: response.message,
            type: response.status,
            confirmButtonText: 'Aceptar'
          });
        }
        error => {
          this.errorMessage = <any>error;

          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }
      }
    );
  }

  onInitTable(){
    this.table = $('#dataTables-example').DataTable({
      retrieve: true,
      paging: false,
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

  ready(isCreado:any){
    if(isCreado) {
      this.ngOnInit();
    }
  }

  onChangedTipoRecaudo(e){
    if (e) {
      let token = this._LoginService.getToken()

      switch (e) {
        case 'TRAMITES':
          this._TramiteService.select().subscribe(
            response => {
              this.tramites = response;
            }, 
            error => { 
              this.errorMessage = <any>error;
      
              if(this.errorMessage != null){
                console.log(this.errorMessage);
                alert("Error en la petición");
              }
            }
          );
          break;

        case 'INFRACCIONES':
          this._InfraccionService.select().subscribe(
            response => {
              this.infracciones = response;
            }, 
            error => { 
              this.errorMessage = <any>error;
      
              if(this.errorMessage != null){
                console.log(this.errorMessage);
                alert("Error en la petición");
              }
            }
          );
          break;
      
        case null:
          break;
      }
    }
  }
}