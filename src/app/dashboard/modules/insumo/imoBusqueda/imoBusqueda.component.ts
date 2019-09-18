import { Component, OnInit, AfterViewInit, EventEmitter } from '@angular/core';
import { ImoLote } from "../imoLote/imoLote.modelo";
import { CfgOrganismoTransitoService } from '../../../../services/cfgOrganismoTransito.service';
import { CfgModuloService } from '../../../../services/cfgModulo.service';
import { ImoInsumoService } from '../../../../services/imoInsumo.service';
import { ImoLoteService } from '../../../../services/imoLote.service';
import { LoginService } from '../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './imoBusqueda.component.html'
})

export class ImoBusquedaComponent implements OnInit, AfterViewInit {
  public errorMessage;

	public formIndex: any;
	public formNew: any;
  public formShow: any;
  public table:any; 

  public tipoInsumoSelected:any;
  public organismosTransito:any;
  public modulos: any;

  public tiposInsumos:any = [
    { 'value': 'SUSTRATO', 'label':'SUSTRATO'}
    // { 'value': 'INSUMO', 'label':'INSUMO'},
  ];

  public datos = {
    'tipo': null,
    'idOrganismoTransito': null,
    'idModulo': null,
  }
  public loteInsumos:any;
  public loteInsumo: ImoLote;
  public insumos:any;

  constructor(
    private _OrganismoTransitoService: CfgOrganismoTransitoService,
    private _ModuloService: CfgModuloService,
		private _ImoInsumoService: ImoInsumoService,
    private _ImoLoteService: ImoLoteService,
		private _LoginService: LoginService,
    ){}
    
  ngOnInit() {
    swal({
      title: 'Cargando formulario!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    this.onInitForms();

    this._OrganismoTransitoService.selectSedes().subscribe(
      response => {
        this.organismosTransito = response;
      }, 
      error => {
        this.errorMessage = <any>error;
        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._ModuloService.select().subscribe(
      response => {
        this.modulos = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );
  }

  ngAfterViewInit(){
    swal.close();
  }

  onInitForms(){
    this.formIndex = false;
    this.formNew = false;
    this.formShow = false;
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

  onSearch(){
    swal({
      title: 'Buscando registros!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    this._ImoLoteService.searchByOrganismoTransitoAndModulo(this.datos, token).subscribe(
      response => {
        if (response.code == 200) {
          this.loteInsumos = response.data;

          let timeoutId = setTimeout(() => {  
            this.onInitTable();
            this.onInitForms();
            this.formIndex = true;
            swal.close();
          }, 100);
          
        }else{
          swal({
            title: 'Error!',
            text: response.message,
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

  onShow(loteInsumo: any){
    let token = this._LoginService.getToken();
    
    this.loteInsumo = loteInsumo;

    this._ImoInsumoService.showLote(loteInsumo.id, token).subscribe(
			response => {
        if(response.code == 200){
          this.insumos = response.data;
          
          this.onInitForms();
          this.formShow = true;
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