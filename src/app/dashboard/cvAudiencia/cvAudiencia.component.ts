import { Component, OnInit } from '@angular/core';
import { CvAudienciaService } from '../../services/cvAudiencia.service';
import { LoginService } from '../../services/login.service';
import { CvAudiencia } from './cvAudiencia.modelo';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './cvAudiencia.component.html'
})
export class CvAudienciaComponent implements OnInit {
  public errorMessage;
	public id;

	public audiencias;
	public formNew = false;
	public formEdit = false;
  public formIndex = false;
  public formShow = false;
  public formSearch = true;
  public table:any = null; 
  public audiencia: CvAudiencia;

  public search: any = {
    'tipoFiltro': null,
    'filtro': null,
  }

  public tiposFiltro = [
    { 'value': '1', 'label': 'Identificación' },
    { 'value': '2', 'label': 'No. de comparendo' },
    { 'value': '3', 'label': 'Fecha' },
  ];

  constructor(
    private _AudienciaService: CvAudienciaService,
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

    this._AudienciaService.searchByFiltros(this.search, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.audiencias = response.data;
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
          this.audiencias = null;
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


  iniciarTabla(){
    if (this.table) {
      this.table.destroy();
    }

    $('#dataTables-example').DataTable({
      responsive: true,
      pageLength: 8,
      sPaginationType: 'full_numbers',
      oLanguage: {
        oPaginate: {
          sFirst: '<i class="fa fa-step-forward"></i>',
          sPrevious: '<i class="fa fa-chevron-left"></i>',
          sNext: '<i class="fa fa-chevron-right"></i>',
          sLast: '<i class="fa fa-step-backward"></i>'
        }
      }
   });
   this.table = $('#dataTables-example').DataTable();
  }
  
  onNew(){
    this.formNew = true;
    this.formEdit = false;
    this.formShow = false;
    this.formIndex = false;
  }

  ready(isCreado:any){
    if(isCreado) {
      this.formNew = false;
      this.formEdit = false;
      this.formShow = false;
      this.formIndex = true;
      this.ngOnInit();
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
    this.formEdit = false;
    this.formShow = true;
    this.formNew = false;
    this.formIndex = false;
  }

  onEdit(audiencia:any){
    this.audiencia = audiencia;
    this.formEdit = true;
    this.formIndex = false;
    this.formShow = false;
    this.formNew = false;
  }
}