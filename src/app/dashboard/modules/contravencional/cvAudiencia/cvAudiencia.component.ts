import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CvAudiencia } from './cvAudiencia.modelo';
import { CvAudienciaService } from '../../../../services/cvAudiencia.service';
import { CvCdoComparendoService } from 'app/services/cvCdoComparendo.service';
import { LoginService } from '../../../../services/login.service';
import { environment } from 'environments/environment'
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './cvAudiencia.component.html'
})
export class CvAudienciaComponent implements OnInit, AfterViewInit {
  public errorMessage;
  
  public apiUrl = environment.apiUrl;

  public audiencias;
  public comparendos;
  
	public formNew: any;
	public formEdit: any;
  public formIndex: any;
  public formShow: any;
  public formSearch: any;
  public formComparendos: any;

  public table:any = null; 
  public audiencia: CvAudiencia;
  public comparendo:any = null; 

  public search: any = {
    'tipoFiltro': null,
    'filtro': null,
  }

  public tiposFiltro = [
    { 'value': '1', 'label': 'Identificación' },
    { 'value': '4', 'label': 'No. de comparendo' },
    { 'value': '3', 'label': 'Fecha' },
  ];

  constructor(
    private _AudienciaService: CvAudienciaService,
    private _ComparendoService: CvCdoComparendoService,
		private _LoginService: LoginService,
    ){}
    
  ngOnInit() { 
    this.onInitForms();

    this.formSearch = true;
  }

  ngAfterViewInit(){
    swal.close();
  }

  onInitForms(){
    this.formNew = false;
    this.formEdit = false;
    this.formIndex = false;
    this.formShow = false;
    this.formSearch = false;
    this.formComparendos = false;
  }

  onCancel(){
    this.ngOnInit();
  }

  onSearch() {
    swal({
      title: 'Buscando registros!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    this.onInitForms();

    let token = this._LoginService.getToken();

    this._ComparendoService.searchByFiltros(this.search, token).subscribe(
      response => {
        if (response.code == 200) {
          this.comparendos = response.data;

          this.onInitForms();
          this.formComparendos = true;
          this.formSearch = true;

          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });

          let timeoutId = setTimeout(() => {
            this.onInitTable();
          }, 100);
        } else {
          this.audiencias = null;
          this.onInitForms();
          this.formIndex = false;
          this.formSearch = true;

          swal({
            title: 'Alerta!',
            text: response.message,
            type: 'warning',
            confirmButtonText: 'Aceptar'
          })
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

  onShowAudiencias(comparendo: any) {
    swal({
      title: 'Buscando registros!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    this.onInitForms();

    let token = this._LoginService.getToken();
    this.comparendo = comparendo;

    this._AudienciaService.searchByComparendo({'idComparendo': comparendo.id}, token).subscribe(
      response => {
        if (response.code == 200) {
          this.audiencias = response.data;

          this.onInitForms();
          this.formIndex = true;
          this.formSearch = true;

          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });

          let timeoutId = setTimeout(() => {
            this.onInitTable();
          }, 100);
        } else {
          this.audiencias = null;
          this.onInitForms();
          this.formIndex = false;
          this.formSearch = true;

          swal({
            title: 'Alerta!',
            text: response.message,
            type: 'warning',
            confirmButtonText: 'Aceptar'
          })
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
      responsive: true,
      retrieve: true,
      paging: false,
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
  
  onNew(comparendo: any) {
    this.comparendo = comparendo;
    this.onInitForms();
    this.formSearch = true;
    this.formNew = true;
  }

  ready(isCreado:any){
    if(isCreado) {
      this.ngOnInit();
    }else{
      this.onSearch();
    }
  }

  onDelete(id:any){
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
        
        this._AudienciaService.delete({'id':id}, token).subscribe(
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

  onShow(audiencia: any) {
    this.audiencia = audiencia;
    this.onInitForms();
    this.formShow = true;
  }

  onEdit(audiencia:any){
    this.audiencia = audiencia;
    this.onInitForms();
    this.formEdit = true;
  }
}