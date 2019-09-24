import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { VhloRegistroRemolque } from './vhloRnrsPreregistro.modelo';
import { VhloRemolqueService } from '../../../../services/vhloRemolque.service';
import { LoginService } from '../../../../services/login.service';

declare var $: any;
import swal from 'sweetalert2';

@Component({
  selector: 'app-index',
  templateUrl: './vhloRnrsPreregistro.component.html'
})

export class VhloRnrsPreregistroComponent implements OnInit {
  public errorMessage;

  public remolques;

  public formSearch: any;
  public formIndex: any;
  public formNew: any;
  public formEdit: any;

  public table:any;

  public remolque: VhloRegistroRemolque;

  public search = {
    'filtro': null,
    'idModulo': 4,
  }

  constructor(
    private _RemolqueService: VhloRemolqueService,
		private _LoginService: LoginService,
  ){}

  ngOnInit() {
    this.onInitForms();
    this.formSearch = true;
  }

  onInitForms() {
    this.formSearch = false;
    this.formIndex = false;
    this.formNew = false;
    this.formEdit = false;
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

  onSearch() {
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

    this._RemolqueService.index().subscribe(
      response => {
        this.remolques = response.data;

        let timeoutId = setTimeout(() => {
          this.onInitTable();
          this.formIndex = true;
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

  onNew() {
    this.onInitForms();

    this.formNew = true;
  }

  onEdit(remolque: any) {
    this.onInitForms();
    this.remolque = remolque;
    this.formEdit = true;
  }
  
  ready(isCreado:any){
      if(isCreado) {
        this.formNew = false;
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