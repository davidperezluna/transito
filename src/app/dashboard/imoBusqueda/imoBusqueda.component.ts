import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ImoLote } from "../imoLote/imoLote.modelo";
import { CfgOrganismoTransitoService } from '../../services/cfgOrganismoTransito.service';
import { ImoInsumoService } from '../../services/imoInsumo.service';
import { ImoLoteService } from '../../services/imoLote.service';
import { LoginService } from '../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './imoBusqueda.component.html'
})

export class ImoBusquedaComponent implements OnInit {
  public errorMessage;

	public formNew = false;
  public formShow = false;
  public table:any; 

  public tipoInsumoSelected:any;
  public organismosTransito:any;

  public tiposInsumos:any = [
    { 'value': 'SUSTRATO', 'label':'SUSTRATO'}
    // { 'value': 'INSUMO', 'label':'INSUMO'},
  ];

  public datos = {
    'idOrganismoTransito': null,
    'tipo': null,
  }
  public loteInsumos:any;
  public loteInsumo: ImoLote;
  public insumos:any;

  constructor(
		private _ImoInsumoService: ImoInsumoService,
    private _OrganismoTransitoService: CfgOrganismoTransitoService,
    private _ImoLoteService: ImoLoteService,
		private _LoginService: LoginService,
    ){}
    
  ngOnInit() {
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

    this._ImoLoteService.show(this.datos, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.loteInsumos = response.data;

          let timeoutId = setTimeout(() => {  
            this.onInitTable();
          }, 100);
          
          swal.close();
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
        if(response.status == 'success'){
          this.insumos = response.data;
          this.formShow = false;
          let timeoutId = setTimeout(() => {
            this.formShow = true;
          }, 100);
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