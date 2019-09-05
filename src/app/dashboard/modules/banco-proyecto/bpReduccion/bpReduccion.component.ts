import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { BpReduccionService } from './bpReduccion.service';
import { LoginService } from '../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index-reduccion',
  templateUrl: './bpReduccion.component.html'
})

export class BpReduccionComponent implements OnInit {
  public errorMessage;
	public id;

  public reducciones;
  
	public formNew: any;
	public formEdit: any;
  public formIndex: any;
  public formSearch: any;
  public formShow: any;

  public table:any;

  public tiposReduccion = [
    { 'value': 1, 'label': 'CDP' },
    { 'value': 2, 'label': 'Registro compromiso' },
  ];

  public tiposFiltro = [
    { 'value': 1, 'label': 'Número' },
    { 'value': 2, 'label': 'Fecha' },
  ];

  public search: any = {
    'tipoReduccion': null,
    'tipoFiltro': null,
    'filtro': null
  }

  constructor(
    private _ReduccionService: BpReduccionService,
		private _LoginService: LoginService,
    ){}
    
  ngOnInit() {
    this.onInitForms();

    this.formSearch = true;

    swal.close();
  }

  onInitForms() {
    this.formNew = false;
    this.formEdit = false;
    this.formShow = false;
    this.formIndex = false;
    this.formSearch = false;
  }

  onSearch() {
    swal({
      title: 'Buscando registros!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    this._ReduccionService.searchByFilter(this.search, token).subscribe(
      response => {
        if (response.code == 200) {
          this.reducciones = response.data;
          this.formIndex = true;

          let timeoutId = setTimeout(() => {
            this.onInitTable();
          }, 100);
          swal.close();
        } else {
          this.reducciones = null;

          swal({
            title: 'Error!',
            text: response.message,
            type: 'error',
            confirmButtonText: 'Aceptar',
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
  
  onNew(){
    this.onInitForms();
    
    this.formNew = true;
  }

  ready(isCreado:any){
    if(isCreado) {
      this.formNew = false;
      this.formEdit = false;
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
        
        this._ReduccionService.delete({'id':id}, token).subscribe(
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
}