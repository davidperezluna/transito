import { Component, OnInit, Output, EventEmitter , AfterViewInit} from '@angular/core';
import { VhloRegistroRemolque } from './vhloRnrsPreregistro.modelo';
import { VhloRemolqueService } from '../../../../services/vhloRemolque.service';
import { LoginService } from '../../../../services/login.service';

declare var $: any;
import swal from 'sweetalert2';

@Component({
  selector: 'app-index',
  templateUrl: './vhloRnrsPreregistro.component.html'
})

export class VhloRnrsPreregistroComponent implements OnInit, AfterViewInit {
  public errorMessage;

  public formSearch: any;
  public formIndex: any;
  public formNew: any;
  public formEdit: any;

  public table:any;
  
  public remolqueEncontrado:any;
  
  public remolque: VhloRegistroRemolque;
  
  public filtro:any;

  constructor(
    private _RemolqueService: VhloRemolqueService,
		private _LoginService: LoginService,
  ){}

  ngOnInit() {
    this.onInitForms();
    this.formSearch = true;
  }

  ngAfterViewInit() {
    swal.close();
  }

  onInitForms() {
    this.formSearch = false;
    this.formIndex = false;
    this.formNew = false;
    this.formEdit = false;
  }
   
  onInitTable(){
    if(this.table) {
      this.table.destroy();
    }

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

  onSearch() {
    let token = this._LoginService.getToken();

    this.onInitForms();

    swal({
      title: 'Buscando registros!',
      text: 'Solo tardara unos segundos por favor espere.',
      type: 'info',
      showConfirmButton: false,
      onOpen: () => {
        swal.showLoading()
      }
    });

    this._RemolqueService.searhByFilter({ 'filtro': this.filtro }, token).subscribe(
      response => {
        if (response.code == 200) {
          this.remolqueEncontrado = response.data;

          swal({
            title: response.title,
            text: response.message,
            type: response.status,
            confirmButtonText: 'Aceptar'
          });

          this.onInitForms();
          this.formSearch = true;
          this.formIndex = true;

          let timeoutId = setTimeout(() => {
            this.onInitTable();
          }, 200);
        } else {
          this.formSearch = true;

          swal({
            title: response.title,
            text: response.message,
            type: response.status,
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

  onNew() {
    this.onInitForms();

    this.formSearch = true;
    this.formNew = true;
  }
  
  onEdit(remolque: any) {
    this.onInitForms();
    this.remolque = remolque;
    this.formSearch = true;
    this.formEdit = true;
  }
  
  ready(isCreado:any){
    if(isCreado) {
      this.ngOnInit();
      this.formSearch = true;
      this.formIndex = true;
      /* this.onSearch(); */
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
        this._RemolqueService.delete(token,id).subscribe(
            response => {
                swal({
                      title: 'Eliminado!',
                      text:'Registro eliminado correctamente.',
                      type:'success',
                      confirmButtonColor: '#15d4be',
                    })

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

}