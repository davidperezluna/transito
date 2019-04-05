import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { BpProyectoService } from '../../services/bpProyecto.service';
import { LoginService } from '../../services/login.service';
import { BpProyecto } from './bpProyecto.modelo';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './bpProyecto.component.html'
})
export class BpProyectoComponent implements OnInit {
  public errorMessage;
	public id;
	public proyectos: any = null;
	public formNew = false;
	public formEdit = false;
	public formShow = false;
  public formIndex = false;
	public formSearch = true;
  public table:any; 
  public proyecto : BpProyecto;

  public search: any = {
    'tipoFiltro': null,
    'filtro': null
  }

  public tiposFiltro = [
    { 'value': 1, 'label': 'Número' },
    { 'value': 2, 'label': 'Fecha' },
  ];

  constructor(
    private _BpProyectoService: BpProyectoService,
		private _loginService: LoginService,
    ){}
    
  ngOnInit() { 
    this.formNew = false;
    this.formEdit = false;
    this.formShow = false;
    this.formIndex = false;
    this.formSearch = true;
  }

  onSearch() {
    this.formIndex = false;
    this.formNew = false;
    this.formEdit = false;
    
    swal({
      title: 'Buscando registros!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._loginService.getToken();

    this._BpProyectoService.searchByFilter(this.search, token).subscribe(
      response => {
        if (response.code == 200) {
          this.proyectos = response.data;
          this.formIndex = true;
          
          let timeoutId = setTimeout(() => {  
            this.onInitTable();
          }, 100);
          swal.close();
        }else{
          this.proyectos = null;

          swal({
            title: 'Error!',
            text: response.message,
            type:'error',
            confirmButtonText: 'Aceptar',
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
  
  onInitTable(){ 
    this.table = $('#dataTables-example').DataTable({
      clear: true,
      retrieve: true,
      responsive: true,
      pageLength: 10,
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
    this.formNew = true;
    this.formIndex = false;
    this.formSearch = false;
  }

  ready(isCreado:any){
    if(isCreado) {
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
        let token = this._loginService.getToken();
        
        this._BpProyectoService.delete({ 'id': id }, token).subscribe(
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

  onEdit(proyecto :any){
    this.proyecto  = proyecto;
    this.formEdit = true;
    this.formIndex = false;
    this.formNew = false;
    this.formShow = false;
  }

  onShow(proyecto: any) {
    this.proyecto = proyecto;
    this.formShow = true;
    this.formSearch = false;
    this.formIndex = false;
    this.formNew = false;
    this.formEdit = false;
  }
}