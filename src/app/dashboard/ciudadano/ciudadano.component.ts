import { Component, OnInit } from '@angular/core';
import { CiudadanoService } from '../../services/ciudadano.service';
import { LoginService } from '../../services/login.service';
import { Ciudadano } from './ciudadano.modelo';
import { NewCiudadanoComponent } from './new/new.component';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './ciudadano.component.html',
  providers: [NewCiudadanoComponent],
})
export class CiudadanoComponent implements OnInit {
  public errorMessage;
	public id;
	public ciudadanos: any = null;
	public formNew = false;
	public formEdit = false;
	public formIndex = false;
	public formSearch = true;
  public table:any = null; 
  public ciudadano: Ciudadano;

  public search: any = {
    'tipoFiltro': null,
    'filtro': null,
  }

  public tiposFiltro = [
    { 'value': '1', 'label': 'Identificación' },
    { 'value': '2', 'label': 'Nombres y/o apellidos' },
  ];

  constructor(
		private _CiudadanoService: CiudadanoService,
		private _LoginService: LoginService,
    ){}
    
  ngOnInit() { }

  onSearch() {
    swal({
      title: 'Buscando registros!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    this._CiudadanoService.searchByFiltros(this.search, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.ciudadanos = response.data;
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
        }else{
          this.ciudadanos =null;
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
      this.table.destroy();
    }

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
  }

  ready(isCreado:any){
      if(isCreado) {
        this.formNew = false;
        this.formEdit = false;
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
        this._CiudadanoService.deleteCiudadano(token,id).subscribe(
            response => {
                swal({
                  title: 'Eliminado!',
                  text:'Registro eliminado correctamente.',
                  type:'success',
                  confirmButtonColor: '#15d4be',
                });

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

  onEdit(ciudadano:any){
    this.ciudadano = ciudadano;
    this.formEdit = true;
    this.formIndex = false;
  }

}