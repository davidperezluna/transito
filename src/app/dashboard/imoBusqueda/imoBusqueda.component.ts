import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ImoInsumoService } from '../../services/imoInsumo.service';
import { CfgOrganismoTransitoService } from '../../services/cfgOrganismoTransito.service';
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
	public id;
	public respuesta;
	public colors;
	public formNew = false;
  public formShow = false;
  public table:any; 
  public color:any; 
  public organismoTransitoSelected:any;
  public tipoInsumoSelected:any;
  public organismosTransito:any;
  public tiposInsumos:any = [
    {'value': 'SUSTRATO','label':'Sustrato'},
    {'value': 'INSUMO','label':'Insumo'},
  ];
  public loteInsumos:any;
  public loteInsumo:any;
  public insumos:any;

  constructor(
		private _ImoInsumoService: ImoInsumoService,
		private _loginService: LoginService,
    private _OrganismoTransitoService: CfgOrganismoTransitoService,
    private _ImoLoteService: ImoLoteService,
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
    swal({
      title: 'Cargando Tabla!',
      text: 'Solo tardara unos segundos por favor espere.',
      timer: 1500,
      onOpen: () => {
        swal.showLoading()
      }
    }).then((result) => {
      if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.timer
      ) {
      }
    })
	
  }
  iniciarTabla(){
    $('#dataTables-example').DataTable({
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
   this.table = $('#dataTables-example').DataTable();
  }

  onChangedSede(e){
    if (e) {
      let datos={
        'idOrganismoTransito':this.organismoTransitoSelected,
        'tipo':this.tipoInsumoSelected,
      } 
      let token = this._loginService.getToken();
      this._ImoLoteService.show(datos,token).subscribe(
        response => {
          if (response.status == 'success') {
            this.loteInsumos = response.data;
            console.log(response.data);
            let timeoutId = setTimeout(() => {  
              this.iniciarTabla();
            }, 100);
          }else{
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

      });
    } 
  }
  showLoteInsumoSustrato(e){
    this.loteInsumo = e;
    let token = this._loginService.getToken();
    this._ImoInsumoService.showLote(this.loteInsumo.id,token).subscribe(
			response => {
        this.respuesta = response;
        if(this.respuesta.status == 'success'){
          this.insumos = this.respuesta.datos;
          this.formShow = true;
          // console.log(this.insumos);    
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

}