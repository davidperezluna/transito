import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MgdDocumentoService } from '../../services/mgdDocumento.service';
import {LoginService} from '../../services/login.service';
import { MgdDocumento } from './mgdDocumento.modelo';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './mgdDocumento.component.html'
})
export class MgdDocumentoComponent implements OnInit {
  public errorMessage;
	public id;
	public respuesta;
	public documentos;
	public formNew = false;
	public formEdit = false;
  public formPrint = false;
  public formShow = false;
  public formIndex = true;
  public table:any; 
  public documento: MgdDocumento;

  constructor(
    private _DocumentoService: MgdDocumentoService,
		private _loginService: LoginService,
    ){}
    
  ngOnInit() {
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
    this._DocumentoService.getDocumento().subscribe(
				response => {
          this.documentos = response.data;
          let timeoutId = setTimeout(() => {  
            this.iniciarTabla();
          }, 100);
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
    this.formIndex = false;
    this.table.destroy();
  }

  onShow(documento: any){
    this.documento = documento;
    this.formShow = true;
    this.formPrint = false;
    this.formIndex = false;
    this.table.destroy();
  }

  ready(isCreado:any){
    console.log('cumento');
    if(isCreado) {
      this.formNew = false;
      this.formEdit = false;
      this.formShow = false;
      this.formPrint = false;
      this.formIndex = true;
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

  readyPrint(documento:any){
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
        this._DocumentoService.deleteDocumento(token,id).subscribe(
            response => {
                swal({
                      title: 'Eliminado!',
                      text:'Registro eliminado correctamente.',
                      type:'success',
                      confirmButtonColor: '#15d4be',
                    })
                  this.table.destroy();
                  this.respuesta= response;
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

  edit(documento:any){
    this.documento = documento;
    this.formEdit = true;
    this.formIndex = false;
  }
}