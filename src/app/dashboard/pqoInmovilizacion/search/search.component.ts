import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PqoInmovilizacionService } from '../../../services/pqoInmovilizacion.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})

export class SearchComponent implements OnInit {
    public errorMessage;

    public inmovilizaciones;
    public formIndex: any;
    public formNew: any;
    public formEdit: any;
    public formExit: any;
    public formSearch: any;

    public table:any = null;

    public search: any = {
    'tipoFiltro': null,
    'filtro': null,
    }

    public tiposFiltro = [
    { 'value': '1', 'label': 'Placa' },
    ];
  
  constructor(
    private _InmovilizacionService: PqoInmovilizacionService,
	private _LoginService: LoginService,
  ){}
    
  ngOnInit() {
    this.onInitForms();

    this.formSearch = true;
  }

  onInitForms(){
    this.formNew = false;
    this.formEdit = false;
    this.formExit = false;
    this.formIndex = false;
  }

  onSearch(){
    swal({
      title: 'Buscando registros!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    this._InmovilizacionService.searchByFilter(this.search, token).subscribe(
		response => {
            if (response.code == 200) {
            this.inmovilizaciones = response.data;

            let timeoutId = setTimeout(() => {
                this.onInitTable();
            }, 100);
            } else {
            this.inmovilizaciones = null;

            swal({
                title: 'Alerta!',
                text: response.message,
                type: 'warning',
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
        }
    );
  }

  onInitTable(){
    this.table = $('#dataTables-example').DataTable({
      destroy: true,
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
        let token = this._LoginService.getToken();
        this._InmovilizacionService.delete(token,id).subscribe(
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
    });
  }

  onExit(inmovilizacion:any){
    let token = this._LoginService.getToken();

    this._InmovilizacionService.exit({ 'id':inmovilizacion.id }, token).subscribe(
      response => {
        if (response.code == 200) {
          swal({
            title: 'Perfecto!',
            text: response.message,
            type:'success',
            confirmButtonText: 'Aceptar'
          });

          this.table.destroy();
          this.ngOnInit();
        }else{
          swal({
            title: 'Error!',
            text: response.message,
            type:'error',
            confirmButtonText: 'Aceptar'
          });
        }
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
}