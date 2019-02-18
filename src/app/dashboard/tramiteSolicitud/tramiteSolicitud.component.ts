import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { TramiteSolicitudService } from '../../services/tramiteSolicitud.service';
import { LoginService } from '../../services/login.service';
import { TramiteSolicitud } from './tramiteSolicitud.modelo';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './tramiteSolicitud.component.html'
})
export class TramiteSolicitudComponent implements OnInit {
  public tipo: any;
  public errorMessage;
	public id;
	public tramitesSolicitud;
	public formNew = false;
	public formEdit = false;
  public formIndex = false;
  public formSearch = true;
  public table: any = null;
  public tramiteSolicitud: TramiteSolicitud;
  public moduloId = 2;

  public search: any = {
    'tipoFiltro': null,
    'filtro': null,
    'idModulo': 2
  }

  public tiposFiltro = [
    { 'value': '1', 'label': 'No. de Placa' },
    { 'value': '2', 'label': 'No. de factura' },
    { 'value': '3', 'label': 'Fecha' },
  ];

  constructor(
    private _TramiteSolicitudService: TramiteSolicitudService,
    private _route: ActivatedRoute,
		private _LoginService: LoginService,
    ){}
    
  ngOnInit() {
    this._route.params.subscribe(params =>{
      this.tipo = +params["tipo"];
    });
  }

  onSearch() {
    this.tramitesSolicitud = null;
    
    swal({
      title: 'Buscando registros!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    this._TramiteSolicitudService.searchByModuloAndFilter(this.search, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.tramitesSolicitud = response.data;
          this.formIndex = true;

          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });

          let timeoutId = setTimeout(() => {
            this.iniciarTabla();
          }, 100);
        } else {
          this.formIndex = false;

          swal({
            title: 'Atención!',
            text: response.message,
            type: 'warning',
            confirmButtonText: 'Aceptar'
          });
        }
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

  iniciarTabla() {
    if (this.table) {
      this.table.empty();
      this.table.destroy();
    }

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

  onNew(){
    this.formNew = true;
    this.formIndex = false;
  }

  ready(isCreado: any){
    if(isCreado) {
      this.formNew = false;
      this.formEdit = false;
      this.formIndex = false;
      this.ngOnInit();
    }
  }

  onDelete(id: any){
    swal({
      title: '¿Estás seguro?',
      text: "¡Se eliminara este registro!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#15d4be',
      cancelButtonColor: '#ff6262',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        let token = this._LoginService.getToken();
        this._TramiteSolicitudService.deleteTramiteSolicitud(token,id).subscribe(
            response => {
                swal({
                      title: 'Eliminado!',
                      text:'Registro eliminado correctamente.',
                      type:'success',
                      confirmButtonColor: '#15d4be',
                    })
                  this.table.destroy();
                  this.ngOnInit();
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
    })
  }

  onEdit(tramiteSolicitud: any){
    this.tramiteSolicitud = tramiteSolicitud;
    this.formEdit = true;
    this.formIndex = false;
  }
  
}