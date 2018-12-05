import { Component, OnInit } from '@angular/core';
import { GdDocumentoService } from '../../../services/gdDocumento.service';
import { LoginService } from '../../../services/login.service';
import { GdDocumento } from './../gdDocumento.modelo';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})

export class SearchComponent implements OnInit {
  public errorMessage;
  public documentos: any = null;
  public documentosPendientes: any = null;
  
  public formIndex = false;
  public formPrint = false;
  public formShow = false;
  public formSearch = true;
  
  public table: any = null; 
  public documento: GdDocumento;

  public filtro: any= null;

  public search: any = {
    'tipoFiltro': null,
    'filtro': null,
  }

  public tiposFiltro = [
    { 'value': '1', 'label': 'Nombres o Apellidos' },
    { 'value': '2', 'label': 'Identificación' },
    { 'value': '3', 'label': 'Entidad' },
    { 'value': '4', 'label': 'No. de radicado' },
  ];

  constructor(
    private _DocumentoService: GdDocumentoService,
		private _loginService: LoginService,
    ){}
    
  ngOnInit() {    
    if (this.table) {
      this.table.destroy();
    }

    this.formIndex = false;
    this.formShow = false;
    this.formPrint = false;
  }

  iniciarTabla(){
    $('#dataTables-example').DataTable({
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
   this.table = $('#dataTables-example').DataTable();
  }

  onShow(documento: any){
    this.documento = documento;
    this.formIndex = false;
    this.formPrint = false;
    this.formShow = true;
  }

  onPrint(documento: any) {
    this.documento = documento;
    if (this.documento) {
      this.formIndex = false;
      this.formShow = false;
      this.formPrint = true;
    }
  }

  onSearch() {
    swal({
      title: 'Buscando registros!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._loginService.getToken();
    
    this._DocumentoService.search(this.search, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.formIndex = true;
          this.documentos = response.data;

          if (this.table) {
            this.table.destroy();
          }

          let timeoutId = setTimeout(() => {
            this.iniciarTabla();
          }, 100);

          swal.close();
        } else {
          swal({
            title: 'Alerta',
            type: 'warning',
            text: response.message,
            showCloseButton: true,
          });

          this.documentos = null;
        }
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    });
  }

  delete(id: any) {
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
        let token = this._loginService.getToken();
        this._DocumentoService.delete(token, id).subscribe(
          response => {
            swal({
              title: 'Eliminado!',
              text: 'Registro eliminado correctamente.',
              type: 'success',
              confirmButtonColor: '#15d4be',
            });
            this.table.destroy();
            this.ngOnInit();
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
    })
  }
}