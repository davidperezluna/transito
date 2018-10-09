import { Component, OnInit } from '@angular/core';
import { GdDocumentoService } from '../../services/gdDocumento.service';
import { LoginService } from '../../services/login.service';
import { GdDocumento } from './gdDocumento.modelo';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './gdDocumento.component.html'
})

export class GdDocumentoComponent implements OnInit {
  public errorMessage;
  public documentos: any = null;
  
	public formNew = false;
	public formEdit = false;
  public formPrint = false;
  public formShow = false;
  public formSearch = true;
  
  public table:any; 
  public documento: GdDocumento;

  public peticionario: any = {
    'idTipoPeticionario': null,
    'identificacion': null,
    'entidadNombre': null,
    'numeroOficio': null
  }


  constructor(
    private _DocumentoService: GdDocumentoService,
		private _loginService: LoginService,
    ){}
    
  ngOnInit() {
    swal({
      title: 'Cargando Tabla!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    this._DocumentoService.index().subscribe(
      response => {
        this.documentos = response.data;
        let timeoutId = setTimeout(() => {
          this.iniciarTabla();
          swal.close();
        }, 100);
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

  onNew(){
    this.formNew = true;
    this.table.destroy();
  }

  onShow(documento: any){
    this.documento = documento;
    this.formShow = true;
    this.formPrint = false;
    this.table.destroy();
  }

  ready(isCreado:any){
    console.log('cumento');
    if(isCreado) {
      this.formNew = false;
      this.formEdit = false;
      this.formShow = false;
      this.formPrint = false;
      this.ngOnInit();
    }
  }

  readyDocument(documento:any){
    this.documento = documento;
    if(this.documento) {
      this.formNew = true;
      this.formPrint = false;
      this.formEdit = false;
      this.formShow = false;
      this.ngOnInit();
    }
  }

  onPrint(documento:any){
    this.documento = documento;
    if(this.documento) {
      this.formPrint = true;
      this.formNew = false;
      this.formEdit = false;
      this.formShow = false;
      this.ngOnInit();
    }
  }

  delete(id:any){
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

  edit(documento:any){
    this.documento = documento;
    this.formEdit = true;
  }

  onSearch() {
    let token = this._loginService.getToken();
    this._DocumentoService.search(this.peticionario, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.formNew = false;
          this.formSearch = true;
          this.documentos = response.data;

          this.iniciarTabla();

          swal({
            title: 'Perfecto',
            text: "¡Documentos encontrados!",
            type: 'info',
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText:
              '<i class="fa fa-thumbs-up"></i> OK!',
            confirmButtonAriaLabel: 'Thumbs up, great!',
            cancelButtonText:
              '<i class="fa fa-thumbs-down"></i>',
            cancelButtonAriaLabel: 'Thumbs down',
          });
        } else {
          swal({
            title: 'Alerta',
            text: "¡No existe el documento!",
            type: 'warning',
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText:
              '<i class="fa fa-thumbs-up"></i> OK!',
            confirmButtonAriaLabel: 'Thumbs up, great!',
            cancelButtonText:
              '<i class="fa fa-thumbs-down"></i>',
            cancelButtonAriaLabel: 'Thumbs down',
          });
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
}